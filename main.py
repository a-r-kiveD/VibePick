# main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import io
import cv2
import numpy as np
import easyocr
from gemini_engine import get_recommendation  # your existing Gemini wrapper

app = FastAPI(title="Smart Recommendation API 🚀")

# Initialize EasyOCR once
ocr_reader = easyocr.Reader(['en'])  # Add other languages if needed

# -----------------------------
# Request Model
# -----------------------------
class RecommendationRequest(BaseModel):
    category: str                 # "food", "movie", "travel"
    preferences: Optional[str] = None
    budget: Optional[float] = None           # for food
    movie_mode: Optional[str] = None         # "wishlist" or "random"
    travel_vibe: Optional[str] = None        # e.g., "adventure"
    travel_distance: Optional[float] = None  # max distance in km

# -----------------------------
# Root endpoint
# -----------------------------
@app.get("/")
def root():
    return {"message": "OCR + Gemini Recommendation API Running 🚀"}

# -----------------------------
# Main Recommendation Endpoint
# -----------------------------
@app.post("/recommend")

async def recommend(
    category: str = Form(...),
    preferences: Optional[str] = Form(None),
    budget: Optional[float] = Form(None),
    movie_mode: Optional[str] = Form(None),
    travel_vibe: Optional[str] = Form(None),
    travel_distance: Optional[float] = Form(None),
    menu_file: Optional[UploadFile] = File(None)
):
    # Build a fake "data" object for easier handling
    data = RecommendationRequest(
        category=category,
        preferences=preferences,
        budget=budget,
        movie_mode=movie_mode,
        travel_vibe=travel_vibe,
        travel_distance=travel_distance
    )

    # ---- rest of your code ----
    prompt = ""

    # -----------------
    # Food Flow
    # -----------------
    if data.category.lower() == "food":
        menu_text = ""
        if menu_file:
            # Read uploaded image
            image_bytes = await menu_file.read()
            image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

            # Perform OCR using your working EasyOCR code
            results = ocr_reader.readtext(image)
            menu_text = " ".join([text for _, text, _ in results])

            # Optional: print for debugging
            for (_, text, prob) in results:
                print(f"Detected text: {text} | Confidence: {prob:.2f}")

        # Build prompt for Gemini
        prompt = f"""
        Category: Food
        Menu: {menu_text}
        User Preferences: {data.preferences}
        Budget: {data.budget}
        """

    # -----------------
    # Movie Flow
    # -----------------
    elif data.category.lower() == "movie":
        if data.movie_mode not in ["wishlist", "random"]:
            return {"error": "movie_mode must be 'wishlist' or 'random'"}
        prompt = f"""
        Category: Movie
        Mode: {data.movie_mode}
        User Preferences: {data.preferences}
        """

    # -----------------
    # Travel Flow
    # -----------------
    elif data.category.lower() == "travel":
        prompt = f"""
        Category: Travel
        Vibe: {data.travel_vibe}
        Max Distance: {data.travel_distance} km
        """

    else:
        return {"error": "Invalid category. Choose 'food', 'movie', or 'travel'."}

    # -----------------
    # Call Gemini API
    # -----------------
    recommendation = get_recommendation(data.category, prompt)

    return JSONResponse(recommendation)