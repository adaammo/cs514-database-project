import { UUID } from "crypto";

type CourseDatabase = {
    id: UUID;
    prefix: string;
    code: string;
    full_code: string;
    course_name: string;
  };
export type CoursesResponse = Record<string, CourseDatabase[]>;
export type APIErrorResponse = {
  status: number,
  detail: string
}