"use client";

import CurrencyList from "@/components/layouts/currency-list";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  return (
    <section className="py-8">
      <div className="container-sm space-y-4">
        <CurrencyList />
      </div>
    </section>
  );
}
