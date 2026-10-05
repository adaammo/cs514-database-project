"use client";

import { useState, useTransition, } from "react";
import { Star, X } from "lucide-react";
import { ReviewFormProps, ReviewInserts } from "../lib/types";
import { PostReviewForm } from "../lib/fastapiClient";
import { useRouter } from "next/navigation";
export default function ReviewForm({ course_id, coursePrefix, courseCode, courseName, onClose }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [difficulty, setDifficulty] = useState(5);
    const [professor, setProfessor] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [grade, setGrade] = useState<string | null>(null)
    const router = useRouter();
    return (
        <form
            onSubmit={(e) => {
                startTransition( async () => {
                    e.preventDefault();
                    e.stopPropagation();
                    const review: ReviewInserts = {
                        rating,
                        difficulty,
                        professor,
                        title,
                        body,
                        grade,
                    };
                    const response = await PostReviewForm(review, course_id);
                    if(!response.ok){
                        setError(response.detail + `: ${response.status}`)
                        return;
                    }
                    onClose(false)
                    return router.refresh();
                })
            }}
            className="flex w-full h-full max-h-full overflow-y-auto flex-col gap-5 rounded-xl border border-(--border-strong) bg-(--bg-secondary) p-6 text-(--text-primary)"
        >
            <div className="flex items-start justify-between border-b border-(--border) pb-1 ">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Write a review
                    </h2>
                    <p className="text-xs text-(--text-secondary)">
                        Share your experience with SDSU students to help them learn more about the course.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onClose(false)}>
                    <X
                        size={20}
                        className="text-(--text-muted) hover:text-white"
                    />
                </button>
            </div>
            <div>
                <label className="text-sm font-medium">
                    Overall rating *
                </label>

                <div className="mt-2 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            type="button"
                            key={value}
                            onClick={() => setRating(value)}
                            className="cursor-pointer transition-transform hover:scale-110"
                        >
                            <Star
                                size={30}
                                className={
                                    value <= rating
                                        ? "text-(--accent)"
                                        : "text-(--text-muted)"
                                }
                                fill={
                                    value <= rating
                                        ? "var(--accent)"
                                        : "var(--text-muted)"
                                }
                            />
                        </button>
                    ))}

                    <span className="ml-2 text-xs text-(--text-secondary)">
                        {rating ? `${rating}/5` : "Select a rating"}
                    </span>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-sm">
                    <label>
                        Difficulty
                    </label>
                    <span className="font-semibold text-(--accent)">
                        {difficulty}/10
                    </span>
                </div>

                <input
                    id="difficulty"
                    type="range"
                    min={1}
                    max={10}
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(Number(e.target.value))
                    }
                    className="mt-3 w-full cursor-pointer accent-(--accent)"
                />

                <div className="flex justify-between text-xs text-(--text-muted)">
                    <span>Very easy</span>
                    <span>Very difficult</span>
                </div>
            </div>
            <div className="flex items-center justify-between gap-1">
                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm">
                        Professor
                        <span className="ml-2 text-xs text-(--text-muted)">
                            Optional
                        </span>
                    </label>

                    <input
                        id="professor"
                        value={professor}
                        onChange={(e) => setProfessor(e.target.value)}
                        placeholder="Professor's name"
                        className="rounded-lg border border-(--border-strong) bg-(--bg-tertiary) p-3 text-sm outline-none focus:border-(--accent)"
                    />
                    <p className="text-xs font-extrabold text-(--accent)">
                        Please be accurate when naming your professor.
                    </p>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <label htmlFor="grade" className="text-sm">
                        Grade Received
                        <span className="ml-2 text-xs text-(--text-muted)">
                            Optional
                        </span>
                    </label>

                    <select
                        id="grade"
                        value={grade ?? ""}
                        onChange={(e) => setGrade(e.target.value || null)}
                        className="w-full rounded-lg border border-(--border-strong) bg-(--bg-tertiary) p-3 text-sm outline-none focus:border-(--accent)"
                    >
                        <option value="">Select your grade</option>

                        {[
                            "A", "A-",
                            "B+", "B", "B-",
                            "C+", "C", "C-",
                            "D+", "D", "D-",
                            "F", "P", "NP", "W"
                        ].map((g) => (
                            <option
                                key={g}
                                value={g}>
                                {g}
                            </option>
                        ))}
                    </select>

                    <p className="text-xs text-(--text-muted)">
                        Select the grade you received.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm">
                    Review title *
                </label>

                <input
                    id="review-title"
                    required
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Challenging but worthwhile"
                    className="rounded-lg border border-(--border-strong) bg-(--bg-tertiary) p-3 text-sm outline-none focus:border-(--accent)"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm">
                    Your experience *
                </label>
                <textarea
                    id="review-body"
                    required
                    rows={4}
                    maxLength={1500}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="What should other students know?"
                    className="resize-none rounded-lg border border-(--border-strong) bg-(--bg-tertiary) p-3 text-sm outline-none focus:border-(--accent)"
                />

                <p className="text-right text-xs text-(--text-muted)">
                    {body.length}/1500
                </p>
            </div>

            {error && (
                <p role="alert" className="text-sm text-(--accent)">
                    {error}
                </p>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-(--border) pt-5">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        className="rounded-lg bg-(--btn-secondary) px-4 py-2.5 text-sm hover:bg-(--btn-secondary-hover)"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={
                            isPending ||
                            !rating ||
                            !title.trim() ||
                            !body.trim()
                        }
                        className="rounded-lg bg-(--accent) px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--accent-hover) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isPending ? "Posting..." : "Post review"}
                    </button>
                </div>
            </div>
        </form>
    );
}