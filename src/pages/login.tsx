import TextField from "@/components/FormField/TextField";
import PasswordField from "@/components/FormField/PasswordField";
import React from "react";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";
import { handleResource } from "@/utils/APIRequester";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
  const { formData, handleChange, loading, setLoading } = useForm({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await handleResource({
        method: "post",
        endpoint: "/auth/login/",
        isMultipart: true,
        data: {
          email: String(formData.email || "").trim(),
          password: String(formData.password || "").trim(),
        },
      });

      if (response?.access) {
        // Set cookie expiry based on "Remember Me" checkbox
        const cookieOptions = rememberMe
          ? { expires: 30 } // 30 days if remember me is checked
          : { expires: 1 }; // 1 day if not checked

        Cookies.set(
          `${process.env.NEXT_PUBLIC_TOKEN_NAME}`,
          response.access,
          cookieOptions
        );
        toast.success("Login successful!");
        router.push("/");
      }
    } catch {
      // Error handled by handleResource
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex">
        {/* Left side - Image/Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-hover items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-xl">Manage your todos efficiently</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-secondary">
          <div className="max-w-md w-full">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-primary">
                Login to your account
              </h2>
              <p className="text-gray-600 mb-8">
                Start managing your tasks efficiently
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                placeholder="Enter your email"
                title="Email"
                type="email"
                required={true}
                value={String(formData.email || "")}
                onChange={(value) => handleChange("email", value)}
              />

              <PasswordField
                name="password"
                placeholder="Enter your password"
                title="Password"
                required={true}
                value={String(formData.password || "")}
                onChange={(value) => handleChange("password", value)}
              />

              <div className="flex justify-between items-center gap-5 mb-5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-black cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    href="/reset-password"
                    className="text-blue-500 text-sm hover:text-blue-600 mt-2 inline-block"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-500 font-semibold hover:text-blue-600"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
