"use client";

import React from "react";
import { Card, Tab, Tabs, CardBody } from "@heroui/react";
import FormComponent from "@/components/auth/form";

export default function AuthPage() {
  const [selected, setSelected] = React.useState("member");

  return (
    <>
      <Tabs
        className="mx-auto w-fit flex"
        aria-label="Tabs form"
        selectedKey={selected}
        size="lg"
        radius="full"
        color="primary"
        onSelectionChange={(key) => setSelected(String(key))}
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
          <FormComponent />
        </CardBody>
      </Card>
    </>
  );
}
