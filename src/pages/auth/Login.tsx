import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
            Login to start your book journey!
          </p>
          <p className="text-base" style={{ color: '#C9A99A' }}>
            Keep all your books in one happy place.
          </p>
        </div>
        </div>

     
         {/*Login Form */}
      <div className="flex items-center justify-center w-full p-6 lg:w-1/2 sm:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 transition-all duration-500 transform bg-white shadow-2xl rounded-2xl hover:shadow-3xl animate-slide-in"
        >
          <h2 className="mb-6 text-3xl font-bold text-center" style={{ color: '#5E2A2B' }}>Login</h2>

        {error && (
          <div className="p-2 mb-3 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

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
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full py-3 mt-4 transition-all duration-300 bg-white border-2 rounded-lg shadow-md hover:shadow-lg font-semibold transform hover:scale-[1.02]"
          style={{ color: '#5E2A2B', borderColor: '#5E2A2B' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F3EF'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
}
