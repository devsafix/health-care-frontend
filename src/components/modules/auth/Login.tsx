"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import loginUser from "@/utility/login";
import checkAuthStatus from "@/utility/auth";
import { UseUser } from "@/providers/UserProvider";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { setUser } = UseUser();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginUser(data.email, data.password);
      if (res.success) {
        const authStatus = await checkAuthStatus();

        setUser(authStatus.user);

        if (authStatus.isAuthenticated && authStatus.user) {
          const { role } = authStatus.user;
          switch (role) {
            case "ADMIN":
              router.push("/dashboard/admin");
              break;
            case "DOCTOR":
              router.push("/dashboard/doctor");
              break;
            case "PATIENT":
              router.push("/dashboard/patient");
              break;
            default:
              router.push("/");
              break;
          }
        } else {
          setError("Failed to retrieve user information after login.");
        }
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />
      <div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      />

      <Card
        className={`w-full max-w-md relative z-10 border-2 shadow-2xl dark:shadow-blue-900/20 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="text-center space-y-2 pb-8">
              <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-float">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to access your dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm p-4 rounded-xl animate-shake">
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-semibold text-foreground">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        className="h-12 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] group-hover:border-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-sm font-semibold text-foreground">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-12 rounded-xl border-2 pr-12 transition-all duration-300 focus:scale-[1.02] group-hover:border-primary/50"
                          placeholder="********"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-12 text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-2">
              <Button
                className="w-full h-12 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                <span className="transition-all duration-300 group-hover:tracking-wide">
                  {isLoading ? "Signing in..." : "Sign In"}
                </span>
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary font-semibold hover:underline underline-offset-4 transition-all duration-300 hover:text-primary/80"
                >
                  Sign up
                </Link>
              </div>

              <Link
                href="/"
                className="text-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                ← Back to home
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
