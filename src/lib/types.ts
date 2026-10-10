import { UUID } from "crypto";
import { SetStateAction } from "react";

export type CourseDatabase = {
    id: UUID;
    prefix: string;
    code: string;
    full_code: string;
    course_name: string;
  };

export type CourseCatalogResponse = CourseDatabase & {
    review_count: number;
    average_rating: number | null;
    average_difficulty: number | null;
};

export type ReviewBase = {
    id: string; 
    course_id: string;
    user_id: string | null;
    title: string;
    body: string;
    rating: number;
    difficulty: number;
    grade: string | null
    professor: string | null
    created_at: string; 
};

export type CoursesResponse = Record<string, CourseDatabase[]>;

export type APIErrorResponse = {
  status: number,
  detail: string
}

export type APICourseResponse = {
    course: CourseDatabase;
    reviews: ReviewBase[];
    review_count: number;
    average_rating: number;
    average_difficulty: number;
};

// Enough for MVP
export type ReviewInserts = {
  rating: number;
  difficulty: number;
  professor: string | null;
  title: string;
  body: string;
  grade: string | null;
};

export type ReviewFormProps = {
  course_id: string
  coursePrefix: string
  courseCode: string;
  courseName: string;
  onClose: React.Dispatch<SetStateAction<boolean>>
};
export type ProfessorStatsResponse = {
  professor: string,
  average_rating: number,
  average_difficulty: number,
  review_count: number
}