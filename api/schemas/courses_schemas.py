from pydantic import BaseModel, Field
from uuid import UUID

from schemas.reviews_schema import ReviewBase



class CourseBase(BaseModel):
    id: str
    prefix: str = Field(max_length=10)
    code: str = Field(max_length=10)
    full_code: str = Field(max_length=25)
    course_name: str = Field(max_length=255)

# if courses are ever created
class CourseCreate(BaseModel):
    prefix: str = Field(max_length=10)
    code: str = Field(max_length=10)
    full_code: str = Field(max_length=25)
    course_name: str = Field(max_length=255)

class CourseDetailResponse(BaseModel):
    course: CourseBase
    reviews: list[ReviewBase]
    review_count: int
    average_rating: float
    average_difficulty: float
class CourseReview(BaseModel):
    id: str
    rating: int