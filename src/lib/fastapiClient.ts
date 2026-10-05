"use server"
import axios, { isAxiosError } from "axios"
import { APICourseResponse, APIErrorResponse, CoursesResponse, ReviewBase, ReviewInserts } from "./types"
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ""
const headers = {
    "content-type": "application/json",
    "API_KEY": process.env.API_KEY ?? ""
}
export async function CallCoursesAPI(): Promise<{ ok: true, courses: CoursesResponse } | { ok: false, status: number, detail: string }> {
    try {
        const response = await axios.get<CoursesResponse>(`${API_URL}/courses`, {
            headers
        });
        return {
            ok: true,
            courses: response.data
        }
    }
    catch (error) {
        if (isAxiosError<{detail: string}>(error)) {
            const status = error.response?.status
            const detail = error.response?.data.detail
            return {
                ok: false,
                status: status ?? 500,
                detail: detail ?? "Interal service error."
            }
        }
    }
    return {
        ok: false,
        status: 500,
        detail: "Something went wrong with our server. Please try again."
    }
}

export async function CallSingleCourseAPI(course_id: string):
    Promise<{ ok: true, data: APICourseResponse } | { ok: false, status: number, detail: string }> {
    try {
        const response = await axios.get<APICourseResponse>(`${API_URL}/courses/${course_id}`, {
            headers
        })
        const data = response.data
        return {
            ok: true,
            data
        }
    }
    catch (error) {
        if (isAxiosError<{detail: string}>(error)) {
            const status = error.response?.status
            const detail = error.response?.data.detail
            return {
                ok: false,
                status: status ?? 500,
                detail: detail ?? "Interal service error."
            }
        }
    }
    return {
        ok: false,
        status: 500,
        detail: "Something went wrong with our server. Please try again."
    }
}

export async function PostReviewForm(review: ReviewInserts, course_id: string) : Promise<{ok: true} | {ok: false, status: number, detail: string}>{
    try{
        console.log(review);
        await axios.post(`${API_URL}/courses/${course_id}/reviews/create`,review, {
            headers
        })
        return {ok: true};
    }
    catch (error) {
        if (isAxiosError<{detail: string}>(error)) {
            const status = error.response?.status
            const detail = error.response?.data.detail
            return {
                ok: false,
                status: status ?? 500,
                detail: JSON.stringify(detail) ?? "Interal service error."
            }
        }
    }
    return {
        ok: false,
        status: 500,
        detail: "Something went wrong with our server. Please try again."
    }
}