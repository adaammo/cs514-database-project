from uuid import UUID
from fastapi import APIRouter, Depends, Query
from typing import Annotated
from services.courses_service import CourseService
from schemas.courses_schemas import CourseBase
from dep.supabase import get_supabase_public, _supabase_client, get_user
router = APIRouter(prefix="/courses")

@router.get("/", response_model=dict[str, list[CourseBase]])
async def get_all_courses(
    course_prefix: str | None = Query(default=None, description="Filter courses by prefix"), 
    supabase = Depends(get_supabase_public)
):
    service = CourseService(supabase=supabase)
    return await service.read_courses_database(course_prefix)

# NEEDS IMPLEMENTATION
@router.get("/{course_id}", response_model=CourseBase)
async def get_course_information(
    course_id: UUID,
    supabase = Depends(get_supabase_public)
):
    pass

@router.get("/{course_id}/reviews")
async def get_course_reviews(
    course_id: UUID,
    supabase = Depends(get_supabase_public)
):
    pass

@router.post("/{course_id}/reviews/create")
async def create_course_review(
    course_id: UUID,
    user = Depends(get_user),
    supabase = Depends(get_supabase_public),
):
    pass