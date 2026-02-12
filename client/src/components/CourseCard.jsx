import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className="w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
    >
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {course.title}
        </h3>
        <section className="flex justify-between items-center">
          <p className="text-green-600 font-bold">₹{course.price.discounted}</p>
          <p className="text-sm text-gray-600">
            ⭐ {course.rating} ({course.reviews} reviews)
          </p>
        </section>

        <p className="text-sm text-gray-500 line-clamp-2">
          {course.description}
        </p>

        <Button variant="secondary" className="w-full">
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
