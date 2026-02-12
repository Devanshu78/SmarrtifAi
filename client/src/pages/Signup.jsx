import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";

function Signup() {
  const navigate = useNavigate();
  const { registerUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      const response = await registerUser({ name, email, password });

      if (response?.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.message || "Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-center bg-linear-to-br from-indigo-600 to-purple-600 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">SkillNest</h1>
          <p className="text-lg opacity-90 mb-6 text-center">
            Learn Skills That Fit Your Future
          </p>
          <img
            src="/loginPage_illustartion.png"
            alt="Illustration"
            className="w-80 shadow-md rounded-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Create Your Account ✨
          </h2>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-indigo-600 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>

            {/* Divider */}
            <div className="text-center text-sm text-gray-500">
              Already have an account?
            </div>

            {/* Login Redirect */}
            <Button
              type="button"
              variant="tertiary"
              onClick={() => navigate("/login")}
              className="w-full"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
