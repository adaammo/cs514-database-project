import { ReviewBase } from "@/src/lib/types";
import { Star } from "lucide-react";

export default function SingleCourseReviews({reviews} : {reviews: ReviewBase[]}){
    return (
        <section className="grid grid-cols-[1fr_400px] flex-1 gap-3">
        <div className="flex flex-col gap-2 rounded-md">
            <h3 className="font-bold text-xl">
                Student Reviews & Ratings
            </h3>
            {reviews.map((review) => (
                <div
                    key={review.id + review.course_id}
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

    )
}