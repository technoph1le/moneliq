"use client";

import { useAuthStore } from "@/stores/AuthStore";
import { Button, Form, Input, InputOtp } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const result = await login(email, password, otp);
    if (result && result.success) {
      router.push("/dashboard");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-4 pt-4"
    >
      <h2 className="text-3xl font-bold self-center">Login</h2>
      <Input
        isRequired
        label="Email"
        autoComplete="off"
        errorMessage="Please enter a valid email"
        type="email"
        variant="bordered"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        isRequired
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-solid outline-transparent"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        label="Password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
      />

      <Input
        isRequired
        label="OTP"
        name="otp"
        autoComplete="off"
        variant="bordered"
        onChange={(e) => setOtp(e.target.value)}
      />

      <Button type="submit" color="primary" fullWidth disabled={isLoading}>
        {isLoading ? "Logging In..." : "Login"}
      </Button>
    </Form>
  );
}
