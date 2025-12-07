import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const registerUser = useAuthStore((s) => s.registerUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await registerUser(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F5F3EF' }}>

      <div 
        className="relative flex-col items-center justify-center hidden p-12 overflow-hidden lg:flex lg:w-1/2"
        style={{ backgroundColor: '#5E2A2B' }}
      >
        <div className="relative z-10 text-center animate-fade-in">
          <BookOpen 
            className="w-24 h-24 mx-auto mb-6 animate-float" 
            style={{ color: '#F5F3EF' }}
          />
          <h1 className="mb-4 text-4xl font-bold" style={{ color: '#F5F3EF' }}>
            Welcome to the Library Management System
          </h1>
          <p className="mb-2 text-lg" style={{ color: '#C9A99A' }}>
            Join us to manage your book collection efficiently.
          </p>
          <p className="text-base" style={{ color: '#C9A99A' }}>
            Create an account to access powerful library management tools.
          </p>
        </div>

        </div>

      {/* Register Form */}
      <div className="flex items-center justify-center w-full p-6 lg:w-1/2 sm:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 transition-all duration-500 transform bg-white shadow-2xl rounded-2xl hover:shadow-3xl animate-slide-in"
        >
          <h2 className="mb-6 text-3xl font-bold text-center" style={{ color: '#5E2A2B' }}>Register</h2>

        {error && (
          <div className="p-2 mb-3 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <div className="mb-5 transition-all duration-300 transform">
          <label htmlFor="name" className="block mb-2 text-sm font-medium" style={{ color: '#5E2A2B' }}>
            Name
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="w-full p-3 transition-all duration-300 border-2 rounded-lg focus:outline-none"
            style={{ borderColor: '#C9A99A' }}
            onFocus={(e) => {
              e.target.style.borderColor = '#5E2A2B';
              e.target.style.boxShadow = '0 4px 12px rgba(94, 42, 43, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#C9A99A';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 animate-shake">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-5 transition-all duration-300 transform">
          <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: '#5E2A2B' }}>
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full p-3 transition-all duration-300 border-2 rounded-lg focus:outline-none"
            style={{ borderColor: '#C9A99A' }}
            onFocus={(e) => {
              e.target.style.borderColor = '#5E2A2B';
              e.target.style.boxShadow = '0 4px 12px rgba(94, 42, 43, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#C9A99A';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 animate-shake">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-5 transition-all duration-300 transform">
          <label htmlFor="password" className="block mb-2 text-sm font-medium" style={{ color: '#5E2A2B' }}>
            Password
          </label>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            className="w-full p-3 transition-all duration-300 border-2 rounded-lg focus:outline-none"
            style={{ borderColor: '#C9A99A' }}
            onFocus={(e) => {
              e.target.style.borderColor = '#5E2A2B';
              e.target.style.boxShadow = '0 4px 12px rgba(94, 42, 43, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#C9A99A';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 animate-shake">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-6 text-white font-semibold transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-[1.02]"
          style={{ backgroundColor: isLoading ? '#C9A99A' : '#5E2A2B' }}
          onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#4A1F20')}
          onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#5E2A2B')}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-semibold transition-all duration-300 hover:underline"
              style={{ color: '#5E2A2B' }}
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}
