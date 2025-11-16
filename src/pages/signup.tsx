import TextField from "@/components/FormField/TextField";
import PasswordField from "@/components/FormField/PasswordField";
import React from "react";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";
import { handleResource } from "@/utils/APIRequester";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";

const Signup: React.FC = () => {
  const router = useRouter();
  const { formData, handleChange, loading, setLoading } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (String(formData.password || "").length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await handleResource({
        method: "post",
        endpoint: "/users/signup/",
        isMultipart: true,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      });

      if (response) {
        toast.success("Account created successfully!");
        router.push("/login");
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
        <title>Signup</title>
      </Head>
      <div className="min-h-screen flex">
        {/* Left side - Image/Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-hover items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Join Us Today!</h1>
            <p className="text-xl">Create your account and start organizing</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-secondary">
          <div className="max-w-md w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary">
                Create your account
              </h2>
              <p className="text-gray-600 mb-8">
                Start managing your tasks efficiently
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center gap-4 ">
                <TextField
                  name="name"
                  placeholder="Enter your first name"
                  title="First Name"
                  type="text"
                  required={true}
                  value={String(formData.firstName || "")}
                  onChange={(value) => handleChange("firstName", value)}
                />

                <TextField
                  name="name"
                  placeholder="Enter your last name"
                  title="Last Name"
                  type="text"
                  required={true}
                  value={String(formData.lastName || "")}
                  onChange={(value) => handleChange("lastName", value)}
                />
              </div>

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

              <PasswordField
                name="confirmPassword"
                placeholder="Confirm your password"
                title="Confirm Password"
                required={true}
                value={String(formData.confirmPassword || "")}
                onChange={(value) => handleChange("confirmPassword", value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 font-semibold hover:text-blue-600"
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

export default Signup;
