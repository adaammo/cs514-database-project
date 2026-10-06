from typing import Annotated
from fastapi import APIRouter, Depends
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
    response = (
        supabase
        .table("reviews")
        .select("professor, rating, difficulty")
        .eq("course_id", course_id)
        .execute()
    )

    professor_data = defaultdict(
        lambda: {
            "rating_total": 0.0,
            "difficulty_total": 0.0,
            "review_count": 0,
        }
    )

    for review in response.data or []:
        professor_name = review.get("professor")

        if not professor_name:
            continue

        professor = professor_data[professor_name]

        professor["rating_total"] += float(review["rating"])
        professor["difficulty_total"] += float(review["difficulty"])
        professor["review_count"] += 1

    results = []

    for professor_name, stats in professor_data.items():
        count = stats["review_count"]

        results.append(
            {
                "professor": professor_name,
                "average_rating": round(
                    stats["rating_total"] / count,
                    2
                ),
                "average_difficulty": round(
                    stats["difficulty_total"] / count,
                    2
                ),
                "review_count": count,
            }
        )

    results.sort(
        key=lambda professor: professor["review_count"],
        reverse=True
    )

    return results