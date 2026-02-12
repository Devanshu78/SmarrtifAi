import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

const Profile = () => {
  const { userDetails } = useAuthStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userDetails().then((userDetails) => setUser(userDetails));
  }, []);

  if (!user) return <h2>Please login</h2>;

  return (
    <div className="w-full mx-auto p-8 space-y-8">
      <h1 className="text-base font-semibold">👤 User Profile</h1>

      <div className="bg-blue-50 p-6 rounded-lg flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {user.name.charAt(0)}
        </div>

        <div className="text-lg space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">My Enrolled Courses</h2>
        {user?.coursesEnrolled?.length === 0 ? (
          <p className="text-gray-600">
            You have not enrolled in any courses yet.
          </p>
        ) : (
          user?.coursesEnrolled?.map((course) => (
            <CourseCard key={course?._id} course={course} />
          ))
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

        <div className="space-y-3">
          <button className="block text-blue-600">🔒 Change Password</button>

          <button
            className="block text-blue-600"
            tooltip="Notification Preferences"
          >
            🔔 Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-gray-600">{course?.progress || "0"}%</p>
    </div>
  );
};

export default Profile;
