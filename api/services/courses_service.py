from supabase import Client
from schemas.courses_schemas import CourseBase
from fastapi import HTTPException, status
class CourseService:
    def __init__(self, supabase: Client):
        self.supabase = supabase
        
    async def read_courses_database(self, course_prefix: str | None) -> dict[str, list[CourseBase]] : 
        # call the courses table, select all the data and execute the query
        try:
            query = self.supabase.table("courses").select("*")
            
            if course_prefix is not None:
                query = query.eq("prefix", course_prefix)
            # since course_prefix may be optional
            
            result = query.execute()
            courses_grouped : dict[str, list[CourseBase]] = {}
            for course in result.data:
                # course is a dict. unpack it as what the pydantic model
                course_data = CourseBase(**course)
                courses_grouped.setdefault(course_data.prefix, []).append(course_data)
            print(courses_grouped)
            return courses_grouped
        except HTTPException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = "Something happened internally."
            )
        