from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class ReviewBase(BaseModel):
    title: str = Field(max_length=100)
    body: str
    rating: int = Field(ge=1, le=5)


class ReviewCreate(ReviewBase):
    course_id: int
    user_id: UUID | None = None


class ReviewResponse(ReviewBase):
    id: UUID
    course_id: int
    user_id: UUID | None = None
    created_at: datetime