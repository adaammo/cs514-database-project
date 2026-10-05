from uuid import UUID
from supabase import Client
from schemas.courses_schemas import CourseBase, CourseDetailResponse
from schemas.reviews_schema import ReviewBase
from fastapi import HTTPException, status
class CourseService:
    def __init__(self, supabase: Client):
        self.supabase = supabase
        
    async def read_courses_database(self) -> dict[str, list[CourseBase]] : 
        # call the courses table, select all the data and execute the query
        try:
            query = self.supabase.table("courses").select("*")      
            result = query.execute()
            courses_grouped : dict[str, list[CourseBase]] = {}
            for course in result.data:
                # course is a dict. unpack it as what the pydantic model
                course_data = CourseBase(**course)
                courses_grouped.setdefault(course_data.prefix, []).append(course_data)
            return courses_grouped
        except HTTPException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = "Something happened internally."
            )
   
    async def read_single_course(self, course_id: str) -> CourseDetailResponse : 
        # call the courses table, select all the data and execute the query
        try:
            course_result = (
                self.supabase
                .table("courses")
                .select("*")
                .eq("id", str(course_id))
                .limit(1)
                .execute()
            )
            if not course_result.data:
                raise HTTPException(
                    status_code=404,
                    detail="Course not found. Please search for a course that exists."
                )
            course = CourseBase(**course_result.data[0])
            reviews_result = (
                    self.supabase
                    .table("reviews")
                    .select("*")
                    .eq("course_id", str(course_id))
                    .execute()
                )
            reviews = [ReviewBase(**review) for review in reviews_result.data]
            num_of_reviews = len(reviews)
            average_rating = 0.0
            average_difficulty = 0.0
            if num_of_reviews != 0 :
                average_rating = (sum(r.rating for r in reviews)) / num_of_reviews
                average_difficulty = (sum(r.difficulty for r in reviews)) / num_of_reviews
                
            return CourseDetailResponse(
                course=course,
                reviews=reviews,
                review_count = num_of_reviews,
                average_rating=average_rating,
                average_difficulty = average_difficulty
            )
        except Exception:
            raise
        except HTTPException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = "Something happened internally."
            )
   