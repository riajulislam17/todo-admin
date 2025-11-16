import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import AdminLayout from "@/components/layouts/AdminLayout";
import { UserProvider } from "@/contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const [isChecking, setIsChecking] = useState(true);

  // Routes that don't require authentication and don't use AdminLayout
  const publicRoutes = ["/login", "/signup", "/reset-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);

      // Redirect to login if no token and trying to access protected route
      if (!token && !isPublicRoute) {
        router.replace("/login");
        return;
      }

      // Redirect to dashboard if token exists and trying to access public route
      if (token && isPublicRoute) {
        router.replace("/");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, isPublicRoute, router]);

  // Show loader while checking authentication
  if (isChecking && !isPublicRoute) {
    return (
      <>
        <Toaster position="bottom-right" />
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  // Render public routes without layout
  if (isPublicRoute) {
    return (
      <>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />
      </>
    );
  }

  // Render protected routes with AdminLayout
  return (
    <>
      <Toaster position="bottom-right" />
      <UserProvider>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </UserProvider>
    </>
  );
}
