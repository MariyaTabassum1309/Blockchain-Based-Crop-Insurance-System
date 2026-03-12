export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-xl font-semibold mb-4">
          AgriSecure – Blockchain Crop Insurance
        </h2>
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} AgriSecure. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
