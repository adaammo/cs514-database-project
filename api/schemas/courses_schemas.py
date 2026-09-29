from pydantic import BaseModel, Field
from uuid import UUID



class CourseBase(BaseModel):
    id: UUID
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