from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load trained model
model = load_model("crop_model.h5")

# IMPORTANT: same order as training output
class_names = [
    "Cotton_Diseased",
    "Cotton_Healthy",
    "Maize_Diseased",
    "Maize_Healthy",
    "Sugarcane_Diseased",
    "Sugarcane_Healthy",
    "Wheat_Diseased",
    "Wheat_Healthy"
]

# Make sure uploads folder exists
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files["file"]
    filepath = os.path.join("uploads", file.filename)
    file.save(filepath)

    img = image.load_img(filepath, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
  

    prediction = model.predict(img_array)

    predicted_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    print("PREDICTED:", predicted_class)
    print("CONFIDENCE:", confidence)
    return jsonify({
        "prediction": predicted_class,
        "confidence": confidence
    })


if __name__ == "__main__":
    app.run(port=5001, debug=True)