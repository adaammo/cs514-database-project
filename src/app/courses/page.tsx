import Link from "next/link";
import { CallCourseCatalogAPI } from "@/src/lib/fastapiClient";

export default async function CoursesListedPage({
    searchParams
}: {
    searchParams: Promise<{ course_prefix?: string }>
}) {
    const { course_prefix } = await searchParams;

    if (!course_prefix) {
        return (
            <main className="min-h-screen bg-[#0f0f0f] px-6 py-10 text-white">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold">Course Catalog</h1>

                    <p className="mt-3 text-zinc-400">
                        Select a course prefix to view available courses.
                    </p>
                </div>
            </main>
        );
    }

    const response = await CallCourseCatalogAPI(course_prefix);
    const prefix = course_prefix.toUpperCase();

    if (!response.ok) {
        return (
            <main className="min-h-screen bg-[#0f0f0f] px-6 py-10 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-6">
                        <h1 className="text-2xl font-bold">
                            Unable to load courses
                        </h1>

                        <p className="mt-3 text-zinc-400">
                            {response.detail}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f0f0f] px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    <span>San Diego State University</span>
                    <span>›</span>
                    <span>Computer Science</span>
                    <span>›</span>
                    <span className="text-zinc-300">{prefix} Courses</span>
                </div>

                <div className="mb-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">
                                {prefix} Courses
                            </h1>

                            <p className="mt-3 max-w-2xl text-zinc-400">
                                Browse available courses and see student review
                                statistics before choosing a class.
                            </p>
                        </div>

                        <div className="text-sm text-zinc-500">
                            {response.courses.length} courses found
                        </div>
                    </div>

                    <div className="mt-6 h-1 w-24 rounded-full bg-red-600" />
                </div>

                {response.courses.length === 0 ? (
                    <div className="rounded-xl border border-zinc-800 bg-[#151515] p-8">
                        <h2 className="text-xl font-semibold">
                            No courses found
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            No courses were found for {prefix}.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2">
                        {response.courses.map((course) => {
                            const hasReviews = course.review_count > 0;

                            return (
                                <Link
                                    key={course.id.toString()}
                                    href={`/courses/${course.id}`}
                                    className="group rounded-xl border border-zinc-800 bg-[#151515] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-red-600/70 hover:bg-[#181818] hover:shadow-lg"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold tracking-tight">
                                                {course.full_code}
                                            </h2>

                                            <p className="mt-2 text-zinc-300">
                                                {course.course_name}
                                            </p>
                                        </div>

                                        <span className="text-xl text-red-500 opacity-0 transition group-hover:opacity-100">
                                            →
                                        </span>
                                    </div>

                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        <div className="rounded-lg bg-[#202020] p-3">
                                            <p className="text-xs text-zinc-500">
                                                Rating
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {hasReviews
                                                    ? `${course.average_rating?.toFixed(1)} / 5`
                                                    : "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#202020] p-3">
                                            <p className="text-xs text-zinc-500">
                                                Difficulty
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {hasReviews
                                                    ? `${course.average_difficulty?.toFixed(1)} / 10`
                                                    : "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#202020] p-3">
                                            <p className="text-xs text-zinc-500">
                                                Reviews
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {course.review_count}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
                                        <span className="text-sm text-zinc-500">
                                            {hasReviews
                                                ? `${course.review_count} student ${
                                                      course.review_count === 1
                                                          ? "review"
                                                          : "reviews"
                                                  }`
                                                : "No student reviews yet"}
                                        </span>

                                        <span className="text-sm font-medium text-red-500 transition group-hover:text-red-400">
                                            View course →
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}