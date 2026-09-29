from fastapi import APIRouter, Depends
from api.services.courses_service import CourseService
from schemas.courses_schemas import CourseBase
from dep.supabase import get_supabase_public
router = APIRouter()

# Most likley not nessesary for first MVP
# File will hold review CRUD