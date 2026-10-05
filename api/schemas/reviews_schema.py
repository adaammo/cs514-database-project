from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class ReviewBase(BaseModel):
    course_id: str
    title: str = Field(max_length=100)
    body: str
    rating: int = Field(ge=1, le=5)
    difficulty: int = Field(ge=1, le=10)
    grade: str = Field(eq=1)
    professor: str | None
    created_at: str


class ReviewCreate(BaseModel):
    rating: int = Field(ge=1, le=5)
    difficulty: int = Field(ge=1, le=10)
    professor: str | None = Field(default=None, max_length=100)
    title: str = Field(min_length=1, max_length=100)
    body: str = Field(min_length=1, max_length=1500)
    grade: str | None = Field(default=None, max_length=3)

class ReviewResponse(ReviewBase):
    id: UUID
    course_id: int
    user_id: UUID | None = None
    created_at: datetime

class ProfessorStatsResponse(BaseModel):
    professor: str = Field(min_length=1)
    average_rating: float = Field(ge=1, le=5)
    average_difficulty: float = Field(ge=1, le=10)
    review_count: int = Field(ge=1)
