# main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from typing import Optional
import cv2
import numpy as np
import easyocr
from gemini_engine import get_recommendation

app = FastAPI(title="Smart Recommendation API 🚀")

# Initialize OCR once
ocr_reader = easyocr.Reader(['en'])


@app.get("/")
def root():
    return {"message": "Recommendation API Running 🚀"}


@app.post("/recommend")
async def recommend(
    category: str = Form(...),
    preferences: Optional[str] = Form(None),
    budget: Optional[str] = Form(None),           # changed to str
    movie_mode: Optional[str] = Form(None),
    travel_vibe: Optional[str] = Form(None),
    travel_distance: Optional[str] = Form(None), # changed to str
    menu_file: Optional[UploadFile] = File(None)
):
    
    # ✅ Convert numeric fields safely (fixes 422 issue)
    budget = float(budget) if budget else None
    travel_distance = float(travel_distance) if travel_distance else None

    prompt = ""

    # -----------------
    # FOOD
    # -----------------
    if category.lower() == "food":

        menu_text = ""

        if menu_file:
            image_bytes = await menu_file.read()
            image = cv2.imdecode(
                np.frombuffer(image_bytes, np.uint8),
                cv2.IMREAD_COLOR
            )

            results = ocr_reader.readtext(image)
            menu_text = " ".join([text for _, text, _ in results])

        prompt = f"""
        Category: Food
        Menu Items: {menu_text}
        User Preferences: {preferences}
        Budget: {budget}
        """

    # -----------------
    # MOVIE
    # -----------------
    elif category.lower() == "movie":

        if movie_mode not in ["wishlist", "random"]:
            return {"error": "movie_mode must be 'wishlist' or 'random'"}

        prompt = f"""
        Category: Movie
        Mode: {movie_mode}
        User Preferences: {preferences}
        """

    # -----------------
    # TRAVEL
    # -----------------
    elif category.lower() == "travel":

        prompt = f"""
        Category: Travel
        Vibe: {travel_vibe}
        Max Distance: {travel_distance} km
        """

    else:
        return {"error": "Invalid category. Choose food, movie, or travel."}

    # Call Gemini
    recommendation = get_recommendation(category, prompt)

    return JSONResponse(recommendation)
