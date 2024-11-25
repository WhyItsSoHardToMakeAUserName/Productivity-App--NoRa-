import { useState } from "react";
import { countryByCurrencyCode } from "@/constants/country-by-currency-code";
import { useRouter, useSearchParams } from "next/navigation";

export default function Currencies({ hide }: any) {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  const setCurrencySearchParam = (currency: string) => {
    const newSearchParams = new URLSearchParams(searchParam as any);
    newSearchParams.set("currency", currency);
    router.replace(`?${newSearchParams}`);
  };

  // Filter countries by search query
  const filteredCurrencies = countryByCurrencyCode.filter((c) => {
    const currencyCode = c.currency_code ?? ""; // Fallback to an empty string
    const country = c.country.toLowerCase();
    return (
      country.includes(searchQuery.toLowerCase()) ||
      currencyCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a country or currency..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        {/* Scrollable List of Currencies */}
        <div
          className="h-64 overflow-y-auto border rounded-md" // Set fixed height and make it scrollable
        >
          {filteredCurrencies.map((c) => {
            const currencyCode = c.currency_code ?? "N/A"; // Provide fallback
            return (
              <div className="mb-3" key={c.country}>
                <div
                  onClick={() => {
                    setCurrencySearchParam(currencyCode);
                    hide();
                  }}
                  className="w-[90%] flex px-2 py-2 rounded-full cursor-pointer bg-white hover:bg-l-white-200 active:bg-l-white-300 items-center justify-between"
                >
                  <p>{c.country}</p>
                  <p>{currencyCode}</p>
                </div>
              </div>
            );
          })}

          {/* Show "No results found" if no match */}
          {filteredCurrencies.length === 0 && (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
