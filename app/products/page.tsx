import ProductGrid from "@/src/components/products/product-grid";

export default function ProdutosPage() {
  return (
    <section className="mx-auto px-4 py-10 max-w-7xl">
      <h1 className="mb-8 font-semibold text-2xl">Produtos</h1>

      <ProductGrid />
    </section>
  );
}
