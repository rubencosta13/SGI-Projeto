export default function Footer() {
  return (
    <footer
      id="footer"
      role="contentinfo"
      className="bg-[#f7f7f7] mt-12 text-gray-800"
    >
      {/* ================= NEWSLETTER ================= */}
      <section className="border-gray-200 border-b">
        <div className="items-center gap-8 grid md:grid-cols-2 mx-auto px-4 py-10 max-w-7xl">
          <div className="font-semibold text-xl">
            Oferta de <span className="text-red-600">10€</span> na sua compra!
          </div>

          <form className="space-y-3">
            <label htmlFor="newsletter_field" className="font-medium text-sm">
              Indique o seu e-mail
            </label>

            <div className="flex">
              <input
                id="newsletter_field"
                type="email"
                placeholder="example@email.com"
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black text-sm"
              />
              <button
                type="submit"
                className="bg-black px-4 font-semibold text-white text-sm"
              >
                OK
              </button>
            </div>

            <p className="text-gray-600 text-xs">
              *Subscreva a nossa newsletter e receba uma redução de 10€ a cada
              100€ de compras
            </p>
          </form>
        </div>
      </section>

      {/* ================= REINSURANCE ================= */}
      <section className="border-gray-200 border-b">
        <ul className="gap-6 grid grid-cols-2 md:grid-cols-4 mx-auto px-4 py-8 max-w-7xl text-center">
          {[
            { label: "Entrega", icon: "🚚" },
            { label: "Trocas & Devoluções", icon: "↩️" },
            { label: "Pagamento Seguro", icon: "💳" },
            { label: "Apoio ao Cliente", icon: "🎧" },
          ].map((item) => (
            <li key={item.label}>
              <div className="mb-2 text-3xl">{item.icon}</div>
              <h3 className="font-semibold text-sm uppercase">{item.label}</h3>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= LINK COLUMNS ================= */}
      <section className="border-gray-200 border-b">
        <div className="gap-8 grid sm:grid-cols-2 md:grid-cols-4 mx-auto px-4 py-12 max-w-7xl">
          <FooterColumn
            title="LA REDOUTE"
            links={[
              "Quem somos",
              "Contactos",
              "Sustentabilidade e responsabilidade social",
            ]}
          />
          <FooterColumn
            title="SERVIÇOS"
            links={[
              "Ajuda",
              "Trocas e Devoluções",
              "Remover inscrição de Newsletter",
              "Montagem de mobiliário",
              "Compra e Poupa",
            ]}
          />
          <FooterColumn
            title="MARCAS EXCLUSIVAS"
            links={["La Redoute Collections", "La Redoute Intérieurs", "AM.PM"]}
          />
          <FooterColumn
            title="UNIVERSO LA REDOUTE"
            links={["Inspiração", "Vídeos", "Profissionais", "APP La Redoute"]}
          />
        </div>
      </section>

      {/* ================= BOTTOM LINKS ================= */}
      <section>
        <div className="mx-auto px-4 py-6 max-w-7xl text-gray-600 text-xs">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {[
              "Condições gerais de venda",
              "*Condições das ofertas em vigor",
              "Política de privacidade e cookies",
              "Gerir cookies",
              "Livro de reclamações eletrónico",
              "Resolução de Litígios Online",
              "Recrutamento La Redoute",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-medium">Portugal</div>
        </div>
      </section>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-sm uppercase">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="hover:underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
