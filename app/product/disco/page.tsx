"use client";

import GLTFViewer from "@/src/components/gltf-viewer/gltf-viewer";
import Breadcrumbs from "@/src/components/common/breadcrumbs";
import { HorizontalTabs } from "@/src/components/common/tabs";
import { ProductHeader } from "@/src/components/products/product-header";
import { PBRConfigurator } from "@/src/components/pbrs/pbr-configurator";
import { UserReview } from "@/src/components/products/reviews";
import { useState } from "react";
import { ImageGallery } from "@/src/components/image/image-display";
import ProductCard from "@/src/components/products/product-card";

const ProductPage = () => {
  const tabs = [
    // ... (your existing tabs remain unchanged)
    {
      id: "details",
      label: "Detalhes",
      content: (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-amber-900 text-xl">
            Especificações técnicas
          </h2>

          <dl className="gap-x-8 gap-y-3 grid grid-cols-1 sm:grid-cols-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Velocidades:</dt>
              <dd className="font-medium text-gray-900">33 ⅓, 45 e 78 RPM</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Transmissão:</dt>
              <dd className="font-medium text-gray-900 text-right">
                Belt-drive
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Agulha: </dt>
              <dd className="font-medium text-gray-900 text-right">
                Diamante de alta precisão
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Conectividade: </dt>
              <dd className="font-medium text-gray-900 text-right">
                Bluetooth 5.0, RCA, Aux, USB
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Alto-falantes:</dt>
              <dd className="font-medium text-gray-900">
                Estéreo 2x 5W integrados
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Materiais:</dt>
              <dd className="font-medium text-gray-900 text-right">
                Madeira nobre com acabamento vintage
              </dd>
            </div>

            <div className="flex justify-between sm:col-span-2 mt-2 pt-3 border-t">
              <dt className="text-gray-600">Dimensões / Peso:</dt>
              <dd className="font-medium text-gray-900">
                42 × 35 × 15 cm | 5,5 kg
              </dd>
            </div>
          </dl>
        </div>
      ),
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
          />
        </div>
      ),
    },
    {
      id: "shipping",
      label: "Envio",
      content: (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-amber-900 text-xl">
            Informações de envio
          </h2>

          <dl className="gap-x-8 gap-y-3 grid grid-cols-1 sm:grid-cols-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Prazo de processamento:</dt>
              <dd className="font-medium text-gray-900">1–3 dias úteis</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Envio padrão (Continente):</dt>
              <dd className="font-medium text-gray-900 text-right">
                2–4 dias úteis
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Envio para Madeira/Açores: </dt>
              <dd className="font-medium text-gray-900 text-right">
                5–8 dias úteis
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Portes grátis: </dt>
              <dd className="font-medium text-gray-900">
                Em compras acima de 99 €
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Transportadora: </dt>
              <dd className="font-medium text-gray-900">CTT Expresso ou GLS</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Tracking: </dt>
              <dd className="font-medium text-gray-900 text-right">
                Incluído em todos os envios
              </dd>
            </div>

            <div className="flex justify-between sm:col-span-2 mt-2 pt-3 border-t">
              <dt className="text-gray-600">Envio para Europa: </dt>
              <dd className="font-medium text-gray-900">Sob orçamento</dd>
            </div>
          </dl>
        </div>
      ),
    },
  ];

  const [sceneLoaded, setSceneLoaded] = useState(false);

  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    name: `Produto Relacionado ${i + 1}`,
    price: (299 + i * 50).toString(),
    image: "",
  }));

  return (
    <div className="mx-auto px-4 py-8 container">
      {/* Main grid: gallery + sidebar */}
      <div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2 mb-12">
        {/* Image Gallery */}
        <div className="relative md:h-[70vh] aspect-square md:aspect-auto">
          <ImageGallery
            items={[
              { type: "image", src: "/renders/render2.png" },
              { type: "image", src: "/renders/render1.png" },
              { type: "image", src: "/renders/render3.png" },
              { type: "image", src: "/renders/render4.png" },
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

        {/* Sidebar - sticky on desktop */}
        <aside className="md:top-20 md:sticky flex flex-col gap-6 md:h-fit">
          <Breadcrumbs
            items={[
              { href: "/", label: "Início" },
              { href: "/products", label: "Toca-Discos" },
              { label: "Toca-Disco Vinyl Clássico" },
            ]}
          />

          <ProductHeader
            title="Toca-Disco Vinyl Clássico"
            description="Design retro com tecnologia moderna para uma experiência autêntica em vinil."
            rating={4.6}
            reviewCount={128}
          />

          {sceneLoaded && <PBRConfigurator />}

          <div className="mt-6">
            <div className="mb-6">
              <span className="font-bold text-gray-900 text-3xl">149,90 €</span>
            </div>

            <button
              onClick={() => {
                // Does nothing (as requested)
              }}
              className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-md w-full font-medium text-white transition duration-200"
            >
              Adicionar ao carrinho
            </button>

            <p className="mt-3 text-gray-600 text-sm text-center">
              Portes grátis em compras acima de 99 €
            </p>
          </div>

          <div className="mt-6">
            <HorizontalTabs tabs={tabs} />
          </div>
        </aside>
      </div>

      {/* Related Products */}
      <section className="mt-12 pt-12 border-t">
        <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
          Também pode gostar
        </h2>

        <div className="flex justify-center">
          <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-[1400px]">
            {relatedProducts.slice(0, 5).map((product, index) => (
              <div className="w-full" key={index}>
                <ProductCard
                  key={index}
                  product={{
                    description: product.name,
                    title: product.name,
                    price: product.price,
                    image: `https://picsum.photos/400/500?random=${index}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
