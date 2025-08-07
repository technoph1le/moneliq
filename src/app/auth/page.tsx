import React from "react";
import { Form, Input, Button } from "@heroui/react";

export default function AuthPage() {
  return (
    <Form className="w-full max-w-md mx-auto space-y-4 p-8 rounded-xl border">
      <Input
        isRequired
        label="Email"
        errorMessage="Please enter a valid email"
        type="email"
      />
      <Input
        isRequired
        label="Password"
        errorMessage="Please enter a password"
        type="password"
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
}
