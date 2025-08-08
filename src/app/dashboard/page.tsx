import CurrencyList from "@/components/layouts/currency-list";

export default function DashboardPage() {
  return (
    <section className="py-8">
      <div className="container-sm ">
        <CurrencyList />
      </div>
    </section>
  );
}
