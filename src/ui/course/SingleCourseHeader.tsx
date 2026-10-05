import { ChevronRight, Pencil } from "lucide-react";
import { CourseDatabase } from "../../lib/types";
import { SetStateAction } from "react";

export default function SingleCourseHeader({department, course, onOpen}:
     {department: string, course: CourseDatabase, onOpen: React.Dispatch<SetStateAction<boolean>>}) {
    return (
        <header className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 p-1  text-xs text-(--text-muted) font-bold">
                <span>
                    San Diego State University
                </span>
                <ChevronRight size={13} />

                <span>
                    {department}
                </span>

                <ChevronRight size={13} />

                <span className="text-(--text-primary)">
                    {course.full_code}
                </span>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col justify-start">
                    <div className="flex items-end justify-center gap-3">
                        <h1 className="text-4xl font-semibold tracking-wide">
                            {course.full_code}
                        </h1>
                        <p className="text-(--text-secondary) font-light">
                            {course.course_name}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onOpen(true)}
                    className="bg-(--btn-primary) shadow-black shadow-md rounded-md px-4 py-3 flex gap-1 items-center justify-center cursor-pointer hover:bg-(--btn-primary-hover) duration-200">
                    <Pencil size={12} />
                    Write a review
                </button>
            </div>
        </header>
    )
}