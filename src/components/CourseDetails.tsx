"use client"
import { useState } from "react";
import { APICourseResponse, ProfessorStatsResponse } from "../lib/types";
import { departmentNames } from "../lib/constants";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import ReviewForm from "../ui/ReviewForm";
import SingleCourseHeader from "../ui/course/SingleCourseHeader";
import SingleCourseItems from "../ui/course/SingleCourseItems";
import SingleCourseReviews from "../ui/course/SingleCourseReviews";

export default function CourseDetails({ info, stats }: { info: APICourseResponse, stats: ProfessorStatsResponse[] }) {
    const { course, reviews, review_count, average_rating, average_difficulty, } = info;
    const department = departmentNames[course.prefix];
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    return (
        <div className="mx-auto flex min-h-screen w-full flex-col gap-6 px-6 py-5">
            <SingleCourseHeader department={department} course={course} onOpen={setReviewModalOpen} />
            <SingleCourseItems rating={average_rating} difficulty={average_difficulty} count={review_count} />
            <SingleCourseReviews reviews={reviews} stats = {stats}/>
            <AnimatePresence>
                {reviewModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-(--bg-primary)/80"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25, ease: easeInOut }}
                            className="w-full max-w-1/2 h-[calc(100dvh-40px)]"
                        >
                            <ReviewForm course_id={course.id} coursePrefix={course.prefix} courseCode={course.code} courseName={course.course_name} onClose={setReviewModalOpen} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}