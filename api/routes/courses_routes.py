from uuid import UUID
from fastapi import APIRouter, Depends, Query
from typing import Annotated
from schemas.reviews_schema import ReviewCreate
from services.courses_service import CourseService
from schemas.courses_schemas import CourseBase, CourseDetailResponse
from dep.supabase import get_supabase_public
router = APIRouter(prefix="/courses")

@router.get("/", response_model=dict[str, list[CourseBase]])
async def get_all_courses(
    supabase = Depends(get_supabase_public)
):
    service = CourseService(supabase=supabase)
    return await service.read_courses_database()


# NEEDS IMPLEMENTATION
@router.get("/{course_id}", response_model=CourseDetailResponse)
async def get_course_information(
    course_id: str,
    supabase = Depends(get_supabase_public)
):
    service = CourseService(supabase=supabase)
    return await service.read_single_course(course_id)

# Issue #5 on github
@router.get("/{course_id}/reviews")
async def get_course_reviews(
    course_id: UUID,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
    offset: Annotated[int, Query(ge=0)] = 0,
    supabase = Depends(get_supabase_public)
):
    pass

# Needs an implementation where the payload is inserted to the database
@router.post("/{course_id}/reviews/create")
async def create_course_review(
    course_id: UUID,
    review: ReviewCreate,
    supabase = Depends(get_supabase_public),
):
    pass