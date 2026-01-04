"use client";

import { useState } from "react";
import ProductCard from "./product-card";

const PRODUCTS_PER_PAGE = 8;

// Your custom product (will appear first)
const customProduct = {
  id: 999, // choose an ID that doesn't conflict with the others
  title: "Toca-Disco Vinyl Clássico",
  description:
    "Design retro com tecnologia moderna para uma experiência autêntica em vinil.",
  image: "/renders/render1.png", // or use your own image URL
  price: "149.90",
  url: "/product/disco",
};

// Generate the 24 placeholder products
const placeholderProducts = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Produto ${i + 1}`,
  description: "Descrição curta do produto com informação essencial.",
  image: "https://picsum.photos/400/500?random=" + i,
  price: (29.9 + i).toFixed(2),
}));

// Combine: custom product first, then all placeholders
const products = [customProduct, ...placeholderProducts];

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
