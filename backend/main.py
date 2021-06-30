import uvicorn
from typing import List
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from data import schemas, crud, models
from data.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Local Note",
    description="Note in Local Network",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"]
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/notes", response_model=schemas.Note, tags=["notes"])
def create_tag(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    note = crud.create_note(db, note=note)
    return note


@app.get("/notes", response_model=List[schemas.Note], tags=["notes"])
def read_tags(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    notes = crud.get_notes(db, skip, limit)
    return notes


@app.delete("/notes/{note_id}", status_code=200, tags=["notes"])
def delete_note(note_id: int, db: Session = Depends(get_db)):
    crud.delete_note(db, note_id)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, log_level="info")
