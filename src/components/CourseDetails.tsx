"use client"
import { useState } from "react";
import { APICourseResponse } from "../lib/types";
import { departmentNames } from "../lib/constants";
import { ChartNoAxesColumn, ChevronRight, MessageSquare, Pencil, Star } from "lucide-react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import ReviewForm from "../ui/ReviewForm";

export default function CourseDetails({ info }: { info: APICourseResponse }) {
    const { course, reviews, review_count, average_rating, average_difficulty, } = info;
    const department = departmentNames[course.prefix];
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    return (
        <div className="mx-auto flex min-h-screen w-full flex-col gap-6 px-6 py-5">
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
                        onClick={() => setReviewModalOpen(true)}
                        className="bg-(--btn-primary) shadow-black shadow-md rounded-md px-4 py-3 flex gap-1 items-center justify-center cursor-pointer hover:bg-(--btn-primary-hover) duration-200">
                        <Pencil size={12} />
                        Write a review
                    </button>
                </div>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-3 min-h-45 max-h-45 gap-3">
                <div className="flex flex-col justify-between min-h-45 rounded-md border border-(--border) p-6  duration-200 hover:border-(--border-strong)">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-(--text-secondary)">
                            Overall Rating
                        </p>
                        <Star size={19} className="text-(--accent)" />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-bold tracking-tight">
                                {average_rating?.toFixed(1) ?? "—"}
                            </h2>
                            <span className="text-(--text-muted)">/ 5</span>
                        </div>

                        <p className="mt-2 text-xs text-(--text-muted)">
                            Average student rating
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between min-h-45 rounded-md border border-(--border) p-6 transition-all duration-200 hover:border-(--border-strong) hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-(--text-secondary)">
                            Average Difficulty
                        </p>
                        <ChartNoAxesColumn
                            size={19}
                            className="text-(--accent)"
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-5xl font-bold tracking-tight">
                                {average_difficulty?.toFixed(1) ?? "—"}
                            </h2>
                            <span className="text-(--text-muted)">/ 10</span>
                        </div>

                        <div className="mt-3 h-1.5 w-full rounded-full bg-(--bg-tertiary) overflow-hidden">
                            <div
                                className="h-full bg-(--accent) rounded-full"
                                style={{
                                    width: `${Math.max(0, Math.min(100, (average_difficulty ?? 0) * 10))}%`
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between min-h-45 rounded-md border border-(--border) p-6 transition-all duration-200 hover:border-(--border-strong) hover:-translate-y-1">

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-(--text-secondary)">
                            Student Reviews
                        </p>
                        <MessageSquare
                            size={19}
                            className="text-(--accent)"
                        />
                    </div>

                    <div>
                        <h2 className="text-5xl font-bold tracking-tight">
                            {review_count}
                        </h2>

                        <p className="mt-2 text-xs text-(--text-muted)">
                            Experiences shared by students
                        </p>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-[1fr_400px] flex-1 gap-3">
                <div className="flex flex-col gap-2 rounded-md">
                    <h3 className="font-bold text-xl">
                        Student Reviews & Ratings
                    </h3>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex w-full flex-col gap-4 rounded-xl border border-(--border) bg-(--bg-secondary) p-5 transition-all duration-200 hover:border-(--border-strong) md:p-6"
                        >
                            <span className="italic font-light text-xs">
                                Anonymous User said
                            </span>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <Star
                                                key={`value-${value}`}
                                                size={30}
                                                className={
                                                    value <= review.rating
                                                        ? "text-(--accent)"
                                                        : "text-(--text-muted)"
                                                }
                                                fill={
                                                    value <= review.rating
                                                        ? "var(--accent)"
                                                        : "var(--text-muted)"
                                                }
                                            />
                                        ))}
                                    </div>

                                    <span className="text-xs font-medium text-(--text-secondary)">
                                        {review.rating}/5
                                    </span>
                                </div>

                                <span className="text-xs text-(--text-muted)">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-semibold tracking-tight text-(--text-primary)">
                                    {review.title}
                                </h3>

                                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-(--text-secondary)">
                                    {review.body}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 border-t border-(--border) pt-4">
                                {review.professor && (
                                    <span className="text-(--text-muted) text-sm ">
                                        Professor:{" "}
                                        <span className="font-extrabold text-(--text-primary)">
                                            {review.professor}
                                        </span>
                                    </span>
                                )}
                                <span className="rounded-md text-sm font-medium">
                                    <span className="text-(--text-muted)">
                                        Difficulty:
                                    </span>
                                    {' '}
                                    {review.difficulty}/10
                                </span>

                                {review.grade && (
                                    <span className="rounded-md text-sm text-(--text-secondary)">
                                        Grade: {review.grade}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="mb-5 flex justify-between">
                        <h3 className="text-xl font-semibold">
                            Professor Stats
                        </h3>
                        <p className="text-(--text-muted) text-xs self-end tracking-wide">
                            Sorted by rating
                        </p>
                    </div>

                    <div className="flex flex-col h-full justify-between gap-3">
                        {[
                            {
                                professor: "Hau Nguyen",
                                average_rating: 5.0,
                                average_difficulty: 5.0,
                                review_count: 8,
                            },
                            {
                                professor: "Jane Smith",
                                average_rating: 4.6,
                                average_difficulty: 6.2,
                                review_count: 12,
                            },
                            {
                                professor: "Michael Chen",
                                average_rating: 4.3,
                                average_difficulty: 4.8,
                                review_count: 8,
                            },
                            {
                                professor: "Sarah Kim",
                                average_rating: 4.1,
                                average_difficulty: 7.3,
                                review_count: 6,
                            },
                            {
                                professor: "David Lee",
                                average_rating: 3.8,
                                average_difficulty: 6.9,
                                review_count: 4,
                            },
                        ].map((professor) => (
                            <div
                                key={professor.professor}
                                className="flex flex-col gap-3 rounded-xl border border-(--border) bg-(--bg-secondary) p-4 transition-all duration-200 hover:border-(--border-strong)"
                            >
                                {/* Top row */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-semibold text-(--text-primary)">
                                                {professor.professor}
                                            </p>

                                            <p className="text-xs text-(--text-muted)">
                                                {professor.review_count}{" "}
                                                {professor.review_count === 1 ? "review" : "reviews"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Star
                                            size={17}
                                            fill="currentColor"
                                            className="text-(--accent)"
                                        />

                                        <span className="font-bold">
                                            {professor.average_rating.toFixed(1)}
                                        </span>

                                        <span className="text-xs text-(--text-muted)">
                                            /5
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-lg bg-(--bg-tertiary) p-3">
                                        <p className="text-xs text-(--text-muted)">
                                            Difficulty
                                        </p>

                                        <div className="mt-1 flex items-baseline gap-1">
                                            <span className="text-lg font-semibold">
                                                {professor.average_difficulty.toFixed(1)}
                                            </span>
                                            <span className="text-xs text-(--text-muted)">
                                                /10
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-(--bg-tertiary) p-3">
                                        <p className="text-xs text-(--text-muted)">
                                            Rating
                                        </p>

                                        <div className="mt-1 flex items-baseline gap-1">
                                            <span className="text-lg font-semibold">
                                                {professor.average_rating.toFixed(1)}
                                            </span>

                                            <span className="text-xs text-(--text-muted)">
                                                /5
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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