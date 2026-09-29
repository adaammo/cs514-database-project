"use client"

import { CoursesResponse } from "@/src/lib/types";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";

export default function LandingPage({courses}: {courses: CoursesResponse}) {
    const [coursePrefix, setCoursePrefix] = useState<string | null>(null);
    const [courseUUID, setCourseUUID] = useState<UUID | null>(null);
    const router = useRouter();
    const allCoursePrefix = useMemo(() => {
        const temp : string[] = []
        for(const [key, value] of Object.entries(courses)){
            temp.push(key)
        }
        return temp
    }, [courses])
    const allCourseNames = useMemo(() => {
        if(!coursePrefix){
            return;
        }
        return courses[coursePrefix];
    }, [coursePrefix, courses])
    return (
        <div className="flex relative w-full h-screen items-center justify-center bg-(--bg-primary)">
            {/** the background glow on the main screen */}
            <div className="pointer-events-none absolute  w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(166,25,46,0.3),transparent_70%)] animate-[pulse_6s_ease-in-out_infinite] transition-all ease-in-out" />

            {/** main header part */}
            <div className="flex flex-col items-center w-full max-w-2xl justify-center gap-5 z-2">

                <h2 className=" sm:text-3xl lg:text-5xl tracking-tight font-semibold text-white">
                    Know before you {' '}
                    <span className="text-(--accent)">
                        enroll
                    </span>
                </h2>
                <h3 className="max-w-lg text-center text-sm font-light text-(--text-secondary) lg:text-lg">
                    Read responses from your peers to understand a class before you add it to your schedule
                </h3>

                {/** Class code dropdown */}
                <div className="flex flex-col w-full border border-(--border-strong) p-4 bg-(--bg-secondary) rounded-md gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="font-light">
                            Class code
                        </p>
                        {/** TEMP DATA!!! 
             * only to showcase the UI when data exists
             */}

                        <select 
                        value = {coursePrefix ?? ""}
                        onChange={(e) => {
                          setCoursePrefix(e.target.value);
                        }}
                        className="h-12 w-full rounded-lg border border-(--border-strong) bg-(--bg-tertiary) px-3 text-sm text-(--text-secondary) outline-none">
                            <option value="" disabled>
                                Select a class code
                            </option>
                            {allCoursePrefix.map((i) => (
                                <option
                                    key={i}
                                    className="w-full p-4 last:border-0 border-(--border)">
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/** Course number dropdown */}
                    <div 
                    className="flex flex-col gap-2">
                        <p className="font-light">
                            Course number
                        </p>
                        {/** TEMP DATA!!! 
             * only to showcase the UI when data exists
             * this one is more confusing to show in temp but itll be in response to what class prefix is chosen meaning its null 
             */}
                    
                        <select 
                        onChange={(e) => {
                            setCourseUUID(e.target.value as UUID);
                          }}
                        disabled = {coursePrefix === null}
                        className={`h-12 text-(--text-secondary) w-full rounded-lg border border-(--border-strong) bg-(--bg-tertiary) px-3 text-sm outline-none ${!courseUUID && "cursor-not-allowed"}`}>
                            <option value="" disabled>
                                Select a course number
                            </option>
                            <option value = "">
                            </option>
                            {allCourseNames && allCourseNames.map((c) => (
                                <option
                                    value = {c.id}
                                    key={c.id}
                                    className="w-full p-4 last:border-0 border-(--border)">
                                    {c.full_code} : {c.course_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button 
                    onClick={() => {
                        if(!coursePrefix){
                            return
                        }
                        if(coursePrefix && courseUUID){
                            return router.push(`/courses/${courseUUID}`)
                        }
                        if(!courseUUID){
                            return router.push(`/courses?course_prefix=${coursePrefix}`)
                        }
                    }}
                    className="w-full bg-(--accent) text-center font-bold hover:bg-(--accent-hover) p-3 rounded-md cursor-pointer">
                        View class
                    </button>

                </div>
            </div>
        </div>
    )
}