import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const login = useAuthStore((s) => s.login);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded shadow w-96"
      >
        <h2 className="mb-4 text-xl font-semibold">Login</h2>

        {error && (
          <div className="p-2 mb-3 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-sm">
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
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="block mb-1 text-sm">
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
            className="w-full p-2 border rounded"
            placeholder="Password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mt-2 text-white bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
