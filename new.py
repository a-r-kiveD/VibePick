import easyocr
import cv2
from matplotlib import pyplot as plt

# 1️⃣ Initialize reader
reader = easyocr.Reader(['en'])  # Specify languages here, e.g., 'en' for English

# 2️⃣ Load image
image_path =r"C:\Users\devik\OneDrive\Desktop\Vibe pick\menu.jpg"
image = cv2.imread(image_path)

# 3️⃣ Perform OCR
results = reader.readtext(image)

# 4️⃣ Print results
for (bbox, text, prob) in results:
    print(f"Detected text: {text} | Confidence: {prob:.2f}")