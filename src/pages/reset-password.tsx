import TextField from "@/components/FormField/TextField";
import React from "react";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";
import { handleResource } from "@/utils/APIRequester";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { formData, handleChange, loading, setLoading } = useForm({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await handleResource({
        method: "post",
        endpoint: "/auth/reset-password/",
        data: {
          email: formData.email,
        },
        popupMessage: true,
        popupText: "Password reset link sent to your email!",
      });

      if (response) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
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
        <title>Reset</title>
      </Head>
      <div className="min-h-screen flex">
        {/* Left side - Image/Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-hover items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
            <p className="text-xl">We&apos;ll help you get back in</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-secondary">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Forgot Password?
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>

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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:text-hover"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
