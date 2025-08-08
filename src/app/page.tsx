"use client";

import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  router.push("/auth");
  return null;
}
