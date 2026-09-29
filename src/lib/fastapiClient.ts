import axios, { isAxiosError } from "axios"
import { APIErrorResponse, CoursesResponse } from "./types"
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
        if (isAxiosError<APIErrorResponse>(error)) {
            const status = error.response?.data.status
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