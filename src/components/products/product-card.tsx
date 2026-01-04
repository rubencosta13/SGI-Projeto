import Image from "next/image";

export default function ProductCard({
  product,
}: {
  product: {
    title: string;
    description: string;
    image: string;
    price: string;
    url?: string;
  };
}) {
  return (
    <article className="group bg-white border border-gray-200">
      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="space-y-2 p-3">
        <h2 className="font-medium text-sm leading-snug">{product.title}</h2>

        <p className="text-gray-600 text-xs line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-sm">€{product.price}</span>

          <a
            href={product.url}
            className="hover:bg-black px-3 py-1 border font-semibold hover:text-white text-xs transition"
          >
            Ver mais
          </a>
        </div>
      </div>
    </article>
  );
}
