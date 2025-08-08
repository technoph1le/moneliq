"use client";

import { useAuthStore } from "@/stores/AuthStore";
import { Button, Form, Input, InputOtp } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const { accountType } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);

  interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const onSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form className="w-full max-w-md mx-auto space-y-4 pt-4">
      <h2 className="text-3xl font-bold self-center">Login</h2>
      <Input
        isRequired
        label="Email"
        autoComplete="off"
        errorMessage="Please enter a valid email"
        type="email"
        variant="bordered"
      />
      <Input
        isRequired
        autoComplete="off"
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

      <InputOtp
        isRequired
        label="OTP"
        length={6}
        name="otp"
        placeholder="Enter OTP code"
      />

      <Button color="primary" fullWidth>
        Continue
      </Button>
    </Form>
  );
}
