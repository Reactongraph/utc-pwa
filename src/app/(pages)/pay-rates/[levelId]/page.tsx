import { PAY_RATES } from "@/constants/payRates";
import { Header, PayRatesTable } from "@/components";

interface Props {
  params: Promise<{ levelId: string }>;
}

async function getPayRates(
  categoryId: string | undefined,
  typeId: string | undefined
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payrates?category_id=${categoryId}&type_id=${typeId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.status ? data.results : [];
  } catch (error) {
    console.error("Error fetching pay rates:", error);
    return [];
  }
}

export default async function PayRatesLevel({ params }: Props) {
  const { levelId } = await params;
  const level = PAY_RATES.find((level) => level.id === levelId);
  const payRates = await getPayRates(level?.categoryId, level?.typeId);

  return (
    <>
      <Header title={"PAY RATES"} />
      <PayRatesTable
        payRates={payRates}
        category={level?.category}
        label={level?.label}
        note={level?.note}
      />
    </>
  );
}
