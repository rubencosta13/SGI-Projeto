"use client";

import { useState } from "react";
import ProductCard from "./product-card";

const PRODUCTS_PER_PAGE = 8;

const products = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Produto ${i + 1}`,
  description: "Descrição curta do produto com informação essencial.",
  image: "https://picsum.photos/400/500?random=" + i,
  price: (29.9 + i).toFixed(2),
}));

export default function ProductGrid() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const visibleProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <>
      {/* GRID */}
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="disabled:opacity-30 px-3 py-1 border text-sm"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 text-sm border ${
              page === i + 1 ? "bg-black text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="disabled:opacity-30 px-3 py-1 border text-sm"
        >
          Seguinte
        </button>
      </div>
    </>
  );
}
