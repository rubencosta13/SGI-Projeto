import React from "react";

type Product = { name: string; price: number };

type Props = {
  products: Product[];
};

export function RelatedProductsGrid({ products }: Props) {
  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
      {products.map((p, i) => (
        <div
          key={i}
          tabIndex={0}
          className="hover:shadow-lg p-2 border rounded focus-visible:ring-2 focus-visible:ring-gray-300 transition-shadow duration-200"
        >
          <div className="bg-gray-100 mb-2 rounded h-40 aspect-square" />
          <div className="text-gray-800 text-sm truncate">{p.name}</div>
          <div className="font-semibold text-gray-900 text-sm">
            €{p.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
