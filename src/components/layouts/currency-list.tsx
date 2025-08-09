"use client";

import { fetchData } from "@/lib/api";
import { Input, Select, SelectItem } from "@heroui/react";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CurrencyItem from "../ui/currency-item";

interface Currency {
  id: string;
  symbol: string;
  code: string;
}

interface Balance {
  id: string;
  currency_id: number;
  amount: string;
}

interface MappedCurrency extends Balance {
  symbol: string;
  code: string;
}

const SORTBY_OPTIONS = [
  { key: "id", label: "Sort by ID" },
  { key: "amount", label: "Sort by Amount" },
  { key: "symbol", label: "Sort by Symbol" },
  { key: "code", label: "Sort by Code" },
];

const SORTORDER_OPTIONS = [
  { key: "asc", label: "Ascending" },
  { key: "desc", label: "Descending" },
];

type SortBy = "id" | "amount" | "symbol" | "code";
type SortOrder = "asc" | "desc";

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [balances, setBalances] = useState<MappedCurrency[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllCurrencies = useCallback(async () => {
    try {
      const data = await fetchData<Currency[]>("/currencies");
      setCurrencies(data);
    } catch (error) {
      console.error("Failed to fetch currency data", error);
    }
  }, []);

  useEffect(() => {
    fetchAllCurrencies();
  }, [fetchAllCurrencies]);

  const fetchBalances = useCallback(
    async (page: number) => {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10", // Fetch 10 items per page for infinite scroll
          sortBy: sortBy,
          order: sortOrder,
        });
        const data = await fetchData<Balance[]>(
          `/balances?${params.toString()}`
        );

        // Map currency_id to symbol and code
        const mappedData: MappedCurrency[] = data.map((balance) => {
          const currency = currencies.find(
            (c) => c.id === balance.currency_id.toString()
          );
          return {
            ...balance,
            symbol: currency?.symbol || "N/A",
            code: currency?.code || "N/A",
          };
        });

        const hasMoreData = data.length === 10;

        setBalances((prev) =>
          page === 1 ? mappedData : [...prev, ...mappedData]
        );
        return hasMoreData;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    [currencies, sortBy, sortOrder]
  );

  useEffect(() => {
    if (currencies.length > 0) {
      // Only reset if currencies are loaded to avoid premature fetches
      fetchBalances(1); // Fetch the first page with new parameters
    }
  }, [sortBy, sortOrder, currencies, fetchBalances]);

  return (
    <>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search"
          aria-labelledby="Search"
          value={searchTerm}
          startContent={<Search />}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs flex-grow"
        />
        <Select
          className="max-w-xs flex-grow"
          placeholder="Sort by"
          aria-labelledby="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
        >
          {SORTBY_OPTIONS.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          className="max-w-xs flex-grow"
          placeholder="Sort order"
          aria-labelledby="Sort order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          {SORTORDER_OPTIONS.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {balances.map((balance) => (
          <CurrencyItem
            key={balance.id}
            code={balance.code}
            symbol={balance.symbol}
            amount={balance.amount}
          />
        ))}
      </div>
    </>
  );
}
