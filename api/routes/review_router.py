from typing import Annotated
from fastapi import APIRouter, Depends
from services.review_service import ReviewService
from schemas.reviews_schema import ProfessorStatsResponse
from services.courses_service import CourseService
from schemas.courses_schemas import CourseBase
from dep.supabase import get_supabase_public
router = APIRouter(prefix="/reviews")

@router.get("/{course_id}/professors", response_model=list[ProfessorStatsResponse])
async def get_course_professors(
    course_id: str,
    supabase = Depends(get_supabase_public)
):
    service = ReviewService(supabase=supabase)
    return await service.add_professor_stats(course_id)