"use server"

import CourseDetails from "@/src/components/CourseDetails"
import { CallSingleCourseAPI } from "@/src/lib/fastapiClient"

export default async function CourseSlug({params} : {params: Promise<{slug: string}>}){
    const course_id = (await params).slug
    const data = await CallSingleCourseAPI(course_id)
    if(!data.ok){
        return (
            <div className = "flex flex-col items-center justify-center">
                <p className = "bg-(--btn-primary) border border-(--border) rounded-md px-4 py-2">
                    {data.detail}
                </p>
            </div>
        )
    }
    return (
        <CourseDetails info = {data.data}/>
    )
}