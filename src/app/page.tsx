import { CallCoursesAPI } from "../lib/fastapiClient";
import LandingPage from "../components/LandingPage";

export default async function Home() {
  const data = await CallCoursesAPI()
  if(!data.ok){
    console.log(data.detail)
    return (
      <div className = "flex flex-col h-screen w-screen items-center justify-center">
        <progress className = "progress w-56 bg-red-500"></progress>
        <p>
          Something went wrong... please reload and try again
        </p>
      </div>
    )
  }
  return (
   <LandingPage courses = {data.courses}/>
  );
}
