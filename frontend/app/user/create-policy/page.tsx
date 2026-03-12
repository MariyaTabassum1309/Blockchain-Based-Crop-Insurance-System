"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreatePolicy() {
  const router = useRouter();

  const [coverage, setCoverage] = useState(50000);
  const [riskType, setRiskType] = useState("drought");
  const [cropType, setCropType] = useState("");
  const [landArea, setLandArea] = useState("");
// ===== Multipliers =====
const cropRiskMultiplier: Record<string, number> = {
  rice: 1.2,
  cotton: 1.3,
  maize: 1.1,
  wheat: 1.0,
};

const riskTypeMultiplier: Record<string, number> = {
  drought: 1.1,
  flood: 1.3,
  excessRain: 1.2,
};

// ===== Coverage Rule =====
const maxCoveragePerAcre = 50000;
const calculatedMaxCoverage =
  Number(landArea || 0) * maxCoveragePerAcre;

// ===== Premium Calculation =====
// ===== Base Rates =====
const basePremiumPerAcre = 2000; // fixed company charge per acre
const coverageRate = 0.03; // 3% of coverage

const cropMultiplier =
  cropRiskMultiplier[cropType?.toLowerCase() || ""] || 1;
  

const riskMultiplier =
  riskTypeMultiplier[riskType] || 1;

// Prevent division error
const acres = Number(landArea || 1);

// ===== New Premium Formula =====
const premium = Math.round(
  (acres * basePremiumPerAcre) +
  (coverage * coverageRate * cropMultiplier * riskMultiplier)
);
  const [surveyNumber, setSurveyNumber] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [stateName, setStateName] = useState("");
  const [landDocument, setLandDocument] = useState<File | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const duration = 180;

  

  const handleCreatePolicy = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please login first");
        return;
      }

      const user = JSON.parse(storedUser);

      if (
        !cropType ||
        !landArea ||
        !surveyNumber ||
        !village ||
        !district ||
        !stateName ||
        !landDocument
      ) {
        alert("Please fill all details and upload land document");
        return;
      }
if (coverage > calculatedMaxCoverage) {
  alert(
    `Maximum allowed coverage for ${landArea} acres is ₹${calculatedMaxCoverage}`
  );
  return;
}
      if (!window.ethereum) {
        alert("MetaMask not installed!");
        return;
      }

      setIsProcessing(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const conversionRate = 100000;
      const ethAmount = premium / conversionRate;
      const weiValue = BigInt(Math.floor(ethAmount * 1e18)).toString(16);

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: "0x646b9168A2f32DC48efb15FF80e91bCc2Fa5f4fD",
            value: "0x" + weiValue,
          },
        ],
      });

      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("coverage", coverage.toString());
      formData.append("riskType", riskType);
      formData.append("premiumAmount", premium.toString());
      formData.append("duration", duration.toString());
      formData.append("cropType", cropType);
      formData.append("acres", landArea.toString());
      formData.append("surveyNumber", surveyNumber);
      formData.append("village", village);
      formData.append("district", district);
      formData.append("state", stateName);
      formData.append("txHash", txHash);
      formData.append("landDocument", landDocument);

      const response = await fetch("http://localhost:5000/api/policies", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Policy creation failed");
      }

      alert("✅ Policy Submitted for Admin Approval!");
      router.push("/user/dashboard");

    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">

        <h1 className="text-3xl font-bold text-green-700 mb-8">
          🌾 Create Crop Insurance Policy
        </h1>

        {/* Coverage */}
        <input
          type="range"
          min="10000"
          max={calculatedMaxCoverage || 200000}
          step="10000"
          value={coverage}
          onChange={(e) => setCoverage(Number(e.target.value))}
          className="w-full mb-4"
        />

      <p className="mb-2 font-semibold">
  Coverage: ₹{coverage}
</p>

<p className="mb-6 text-sm text-gray-600">
  Max Allowed: ₹{calculatedMaxCoverage || 0}
</p>
<select
  className="w-full mb-4 p-3 border rounded-xl"
  value={riskType}
  onChange={(e) => setRiskType(e.target.value)}
>
  <option value="drought">Drought</option>
  <option value="flood">Flood</option>
  <option value="excessRain">Excess Rain</option>
</select>
        {/* Crop */}
        <input
          type="text"
          placeholder="Crop Type"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setCropType(e.target.value)}
        />

        {/* Land Area */}
        <input
          type="number"
          placeholder="Land Area (Acres)"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setLandArea(e.target.value)}
        />

        {/* Survey & Location */}
        <input
          type="text"
          placeholder="Survey Number"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setSurveyNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Village"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setVillage(e.target.value)}
        />

        <input
          type="text"
          placeholder="District"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setDistrict(e.target.value)}
        />

        <input
          type="text"
          placeholder="State"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setStateName(e.target.value)}
        />

        {/* Land Document */}
        <input
          type="file"
          className="mb-6"
          onChange={(e) =>
            setLandDocument(e.target.files ? e.target.files[0] : null)
          }
        />

        <div className="bg-green-600 text-white p-6 rounded-2xl mb-6">
          <p>Duration: 180 Days</p>
          <p>Premium: ₹{premium}</p>
        </div>

        <button
          onClick={handleCreatePolicy}
          className="w-full bg-green-700 text-white py-3 rounded-xl"
        >
          {isProcessing ? "Processing..." : "Submit Policy"}
        </button>

      </div>
    </div>
  );
}