import datetime
from typing import List

from pydantic import BaseModel


class NoteBase(BaseModel):
    title: str
    content: str
    tags: List[str]


class NoteCreate(NoteBase):
    pass


class Note(NoteBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        orm_mode = True
