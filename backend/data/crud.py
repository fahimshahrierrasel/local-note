import datetime

from sqlalchemy.orm import Session

from . import models, schemas


def separate_tag(note):
    if len(note.tags) > 0:
        note.tags = note.tags.split(', ')
    else:
        note.tags = []
    return note


def create_note(db: Session, note: schemas.NoteCreate):
    db_note = models.Note(title=note.title,
                          content=note.content,
                          tags=', '.join(note.tags),
                          created_at=datetime.datetime.utcnow(),
                          updated_at=datetime.datetime.utcnow())

    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return separate_tag(db_note)


def get_notes(db: Session, tag: str = '', skip: int = 0, limit: int = 10):
    if len(tag) > 0:
        notes_query = db.query(models.Note).filter(models.Note.tags.like(f'%{tag}%'))
    else:
        notes_query = db.query(models.Note)
    notes = notes_query.order_by(models.Note.created_at.desc()).offset(skip).limit(limit).all()
    update_note = list(map(separate_tag, notes))
    return update_note


def delete_note(db: Session, note_id: int):
    db.query(models.Note).filter_by(id=note_id).delete()
    db.commit()
