import { Card, CardBody, CardHeader } from "@heroui/react";

interface CurrencyItemProps {
  symbol: string;
  code: string;
  amount: string;
}

export default function CurrencyItem({
  code,
  symbol,
  amount,
}: CurrencyItemProps) {
  return (
    <Card className="p-4 col-span-12 sm:col-span-4">
      <CardHeader className="py-2 px-4 rounded-full bg-neutral-800 w-fit font-bold text-sm">
        {code}
      </CardHeader>
      <CardBody className="flex justify-between gap-4 items-end flex-row">
        <p>{symbol}</p>
        <p className="text-3xl font-semibold">{amount}</p>
      </CardBody>
    </Card>
  );
}
