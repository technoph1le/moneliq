"use client";

import { useEffect, useState } from "react";
import { Card, Tab, Tabs, CardBody, CardFooter, Snippet } from "@heroui/react";
import LoginForm from "@/components/auth/login-form";
import { useAuthStore } from "@/stores/AuthStore";
import {
  MEMBER_DEFAULT_EMAIL,
  MEMBER_DEFAULT_OTP,
  MEMBER_DEFAULT_PASSWORD,
  PARTNER_DEFAULT_EMAIL,
  PARTNER_DEFAULT_OTP,
  PARTNER_DEFAULT_PASSWORD,
} from "@/data/consts";

export default function AuthPage() {
  const [selected, setSelected] = useState<"member" | "partner">("member");
  const { accountType, setAccountType } = useAuthStore();

  useEffect(() => {
    setAccountType(selected);
  }, [selected]);

  return (
    <>
      <Tabs
        className="mx-auto w-fit flex"
        aria-label="Tabs form"
        selectedKey={selected}
        size="lg"
        radius="full"
        color="primary"
        onSelectionChange={(key) => setSelected(key as "member" | "partner")}
      >
        <Tab key="member" title="Member">
          {null}
        </Tab>
        <Tab key="partner" title="Partner">
          {null}
        </Tab>
      </Tabs>
      <Card className="max-w-md mx-auto my-8">
        <CardBody className="overflow-hidden">
          <LoginForm />
        </CardBody>
        <CardFooter className="grid gap-4">
          <div className="flex gap-2 items-center">
            <p>Email: </p>
            <Snippet symbol="" size="sm">
              {accountType === "member"
                ? MEMBER_DEFAULT_EMAIL
                : PARTNER_DEFAULT_EMAIL}
            </Snippet>
          </div>
          <div className="flex gap-2 items-center">
            <p>Password: </p>
            <Snippet symbol="" size="sm">
              {accountType === "member"
                ? MEMBER_DEFAULT_PASSWORD
                : PARTNER_DEFAULT_PASSWORD}
            </Snippet>
          </div>
          <div className="flex gap-2 items-center">
            <p>OTP: </p>
            <Snippet symbol="" size="sm">
              {accountType === "member"
                ? MEMBER_DEFAULT_OTP
                : PARTNER_DEFAULT_OTP}
            </Snippet>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
