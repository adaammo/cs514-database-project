from collections import defaultdict
from supabase import Client
from fastapi import HTTPException, status
from schemas.reviews_schema import ProfessorStatsResponse
class ReviewService():
    def __init__(self, supabase: Client):
        self.supabase = supabase
    async def add_professor_stats(self, course_id: str) -> list[ProfessorStatsResponse]:
        try:
            response = (
                self.supabase
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
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = "Oops! This request seems to have had an error. Maybe refresh to try again."
            )