import { Star, ChartNoAxesColumn, MessageSquare } from "lucide-react";

export default function SingleCourseItems({rating, difficulty, count}: {rating: number, difficulty: number, count: number}) {
    return (
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
                            {rating?.toFixed(1) ?? "—"}
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
                            {difficulty?.toFixed(1) ?? "—"}
                        </h2>
                        <span className="text-(--text-muted)">/ 10</span>
                    </div>

                    <div className="mt-3 h-1.5 w-full rounded-full bg-(--bg-tertiary) overflow-hidden">
                        <div
                            className="h-full bg-(--accent) rounded-full"
                            style={{
                                width: `${Math.max(0, Math.min(100, (difficulty ?? 0) * 10))}%`
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
                        {count}
                    </h2>

                    <p className="mt-2 text-xs text-(--text-muted)">
                        Experiences shared by students
                    </p>
                </div>
            </div>
        </section>
    )
}