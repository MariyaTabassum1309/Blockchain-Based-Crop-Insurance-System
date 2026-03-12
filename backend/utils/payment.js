// Simulated payment using MetaMask
export const initiatePayment = async (amount: number) => {
  if (!window.ethereum) {
    alert("MetaMask not detected! Please install it.");
    return { success: false };
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const from = accounts[0];

    const txParams = {
      from,
      to: "0x0000000000000000000000000000000000000000", // replace with your recipient
      value: (amount * 1e16).toString(), // convert approximate rupees to wei for testing
    };

    await window.ethereum.request({ method: "eth_sendTransaction", params: [txParams] });
    return { success: true };
  } catch (err) {
    console.error("Transaction failed:", err);
    return { success: false };
  }
};