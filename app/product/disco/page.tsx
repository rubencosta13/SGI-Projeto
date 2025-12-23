"use client";

import GLTFViewer from "@/src/components/gltf-viewer/gltf-viewer";
import Breadcrumbs from "@/src/components/common/breadcrumbs";
import { HorizontalTabs } from "@/src/components/common/tabs";
import { ProductHeader } from "@/src/components/products/product-header";
import { PBRConfigurator } from "@/src/components/products/pbr-configurator";
import { ServicesList } from "@/src/components/products/services-list";
import { RelatedProductsGrid } from "@/src/components/products/related-products";
import { UserReview } from "@/src/components/products/reviews";
import { useState } from "react";
import { ImageGallery } from "@/src/components/image/image-display";

const ProductPage = () => {
  const tabs = [
    {
      id: "details",
      label: "Detalhes",
      content: <p>Detalhes do produto...</p>,
    },
    {
      id: "reviews",
      label: "Avaliações",
      content: (
        <div>
          <UserReview
            userName="João Silva"
            avatarUrl="https://i.pravatar.cc/40?img=5"
            rating={4.5}
            date="2025-12-16"
            reviewText="Produto excelente, qualidade de som muito boa e design elegante. Recomendo!"
            onHelpfulClick={() => alert("Marked as helpful")}
          />
        </div>
      ),
    },
    {
      id: "shipping",
      label: "Envio",
      content: <p>Shipping....</p>,
    },
  ];

  // Services
  const services = [
    { label: "Embalagem sustentável" },
    { label: "Garantia de 2 anos" },
  ];
  const [sceneLoaded, setSceneLoaded] = useState(false);

  // Related products
  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    name: `Produto ${i + 1}`,
    price: 10 + i,
  }));

  return (
    <div className="mx-auto px-4 py-6 container">
      <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 md:h-[70vh]">
        <div className="relative w-full md:h-full aspect-square md:aspect-auto">
          <ImageGallery
            items={[
              { type: "image", src: "/renders/render2.png" },
              { type: "image", src: "/renders/render1.png" },
              { type: "image", src: "/renders/render3.png" },
              { type: "image", src: "/renders/bg2.png" },
              {
                type: "canvas",
                render: () => (
                  <GLTFViewer onLoaded={() => setSceneLoaded(true)} />
                ),
              },
            ]}
          />
        </div>

        {/* Product sidebar */}
        <aside className="md:top-20 md:sticky flex flex-col gap-6">
          <Breadcrumbs
            items={[
              { href: "/", label: "Início" },
              { href: "/discos", label: "Discos" },
              { label: "Toca-Discos Vintage" },
            ]}
          />

          <ProductHeader
            title="Toca-Disco Vinyl clássico"
            description="Design retro com tecnologia moderna para uma experiência autêntica em vinil."
            rating={4.6}
            reviewCount={128}
          />

          {/* PBR Configurator */}
          {sceneLoaded && <PBRConfigurator />}

          <div className="mt-6 lg:mt-4">
            <HorizontalTabs tabs={tabs} />
          </div>

          <ServicesList services={services} />
        </aside>
      </div>

      {/* Related products */}
      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-xl">Também pode gostar</h2>
        <RelatedProductsGrid products={relatedProducts} />
      </section>
    </div>
  );
};

export default ProductPage;
