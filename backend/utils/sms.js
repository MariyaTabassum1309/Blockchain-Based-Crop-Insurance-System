const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const messages = {
  english: (crop) =>
    `🌾 AgriSecure: Your ${crop} claim has been APPROVED. Amount will be credited soon.`,

  hindi: (crop) =>
    `🌾 एग्रीसिक्योर: आपकी ${crop} फसल का क्लेम स्वीकृत हो गया है। राशि जल्द जमा की जाएगी।`,

  telugu: (crop) =>
    `🌾 అగ్రి సెక్యూర్: మీ ${crop} పంట క్లెయిమ్ ఆమోదించబడింది. మొత్తం త్వరలో జమ చేయబడుతుంది.`,
};

const sendSMS = async (to, language, cropType) => {
  try {
    const message =
      messages[language]?.(cropType) ||
      messages["english"](cropType);

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: `${to}`,
    });

    console.log("SMS Sent Successfully");
  } catch (error) {
    console.error("SMS Error:", error);
  }
};

module.exports = { sendSMS };