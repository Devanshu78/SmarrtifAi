import CourseCard from "./CourseCard";
import { useCourseStore } from "../store/courseStore.js";
import { useEffect, useState } from "react";

function CourseSection() {
  const { fetchCourses } = useCourseStore();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((courses) => setCourses(courses));
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Explore Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CourseSection;
