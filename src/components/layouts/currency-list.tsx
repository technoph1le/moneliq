"use client";

import { fetchData } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";

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

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);

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

  return (
    <div>
      {currencies.map((currency) => (
        <p key={currency.id}>
          {currency.code}, {currency.symbol}
        </p>
      ))}
    </div>
  );
}
