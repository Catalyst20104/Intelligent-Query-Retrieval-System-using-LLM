from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from uuid import uuid4
from pathlib import Path

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

# Endpoint 1: Upload file
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        ext = file.filename.split(".")[-1]
        unique_filename = f"{uuid4()}.{ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        return JSONResponse(status_code=200, content={
            "message": "File uploaded successfully",
            "file_id": unique_filename,
            "original_filename": file.filename,
            "saved_path": file_path,
            "content_type": file.content_type
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")


# Endpoint: List uploaded files (for debugging)
@app.get("/list-files")
def list_files():
    files = os.listdir(UPLOAD_DIR)
    return {"files": files}

# Endpoint 2: Submit prompt with reference to uploaded file
@app.post("/submit-prompt")
async def submit_prompt(prompt: str = Form(...), file_id: str = Form(...)):
    file_path = os.path.join(UPLOAD_DIR, file_id)

    if not os.path.exists(file_path):
        available_files = os.listdir(UPLOAD_DIR)
        raise HTTPException(
            status_code=404,
            detail={
                "error": "File not found",
                "file_id": file_id,
                "available_files": available_files
            }
        )

    # 🔍 Display prompt on the server side
    print(f"\n📥 Received Prompt:\n\"{prompt}\"")
    print(f"📎 Linked File ID: {file_id}\n")

    return JSONResponse(status_code=200, content={
        "message": "Prompt received",
        "file_id": file_id,
        "prompt": prompt,
        "file_path": file_path
    })

