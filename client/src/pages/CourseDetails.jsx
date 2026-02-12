import { useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore.js";
import { useCourseStore } from "../store/courseStore.js";
import { useNavigate } from "react-router-dom";

function CourseDetails() {
  const { user } = useAuthStore();
  const { getCourseById, handleEnrollment: enrollment } = useCourseStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseById(id).then((course) => setCourse(course));
  }, []);

  const handleEnrollment = async () => {
    try {
      if (!user) {
        toast.error("Please login to enroll in the course");
        navigate("/login");
        return;
      }
      await enrollment(id);
      toast.success("Enrolled successfully!");
    } catch (error) {
      toast.error("Enrollment failed. Please try again.");
    }
  };

  if (!course) return <h2 className="p-10">Course Not Found</h2>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <p className="text-gray-500">{course.subtitle}</p>

          <h1 className="text-4xl font-bold mt-2">{course.title}</h1>

          <div className="mt-4 text-gray-700">
            Instructor: {course.instructor.name} • ⭐ {course.rating} (
            {course.reviews} reviews)
            <br />
            Category: {course.category} • Level: {course.level}
            <br />
            Duration: {course.duration} • Mode: {course.mode}
          </div>

          <h2 className="text-2xl font-semibold mt-8">Course Description</h2>
          <p className="mt-3 text-gray-600">{course.description}</p>

          <h2 className="text-2xl font-semibold mt-8">Course Content</h2>
          <ul className="mt-4 space-y-2">
            {course.syllabus.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-8">What You’ll Learn</h2>
          <ul className="mt-4 space-y-2">
            {course.learning.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-md"
          />

          <div className="mt-4">
            <p className="line-through text-gray-400">
              ₹{course.price.original}
            </p>
            <p className="text-3xl font-bold text-green-600">
              ₹{course.price.discounted}
            </p>
          </div>

          <Button
            onClick={handleEnrollment}
            className="mt-4 w-full"
            variant="secondary"
          >
            Enroll Now
          </Button>

          <div className="mt-8">
            <h3 className="font-semibold text-lg">Instructor</h3>
            <div className="mt-3">
              <p className="font-medium">{course.instructor.name}</p>
              <p className="text-gray-600">{course.instructor.role}</p>
              <p className="text-gray-500">{course.instructor.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
