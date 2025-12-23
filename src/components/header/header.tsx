"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import Link from "next/link";
import NavLinks from "../common/nav-link";
import SearchInput from "../inputs/search-input";
import IconButton from "../common/icon-button";
import { User, Heart, ShoppingBag, MenuIcon } from "lucide-react";

const HeaderRow1 = () => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden shrink-0">
          <Logo width={48} height={48} />
        </Link>

        {/* Desktop nav */}
        <NavLinks
          className="flex items-center"
          links={[
            { href: "/", label: "Casa" },
            { href: "/moda", label: "Moda" },
          ]}
        />
      </div>

      {/* CENTER (desktop only) */}
      <div className="hidden lg:flex flex-1 justify-center px-6">
        <SearchInput />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <IconButton
          icon={User}
          width={32}
          height={32}
          label="Entrar / Registar"
        />
        <IconButton icon={ShoppingBag} />
        <div className="hidden lg:block">
          <IconButton icon={Heart} />
        </div>
      </div>
    </div>
  );
};

const HeaderRow2 = () => {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* Menu button */}
      <IconButton className="lg:hidden" icon={MenuIcon} />

      <IconButton className="hidden lg:flex" icon={MenuIcon} label="MENU" />

      {/* Desktop categories */}
      <NavLinks
        className="hidden lg:flex flex-1 gap-4 ml-4"
        linksClassName="text-base px-4 py-2 rounded-full hover:bg-gray-200 transition"
        links={[
          { href: "/", label: "Novidades" },
          { href: "/moda", label: "Les Irresistibles" },
          { href: "/sala", label: "Sala de Estar" },
          { href: "/topvendas", label: "Top Vendas" },
          { href: "/b2b", label: "Profissionais", right: true },
        ]}
      />

      {/* Mobile search */}
      <SearchInput className="lg:hidden flex-1" />
    </div>
  );
};

/* ---------------- HEADER ---------------- */

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NORMAL HEADER */}
      <header className="z-40 relative w-full">
        <div className="flex items-center gap-4 px-4 py-2">
          {/* Desktop logo */}
          <Link href="/" className="hidden lg:block shrink-0">
            <Logo />
          </Link>

          <div className="flex flex-col gap-2 w-full">
            <HeaderRow1 />
            <HeaderRow2 />
          </div>
        </div>
      </header>

      {/* SCROLLED HEADER */}
      {scrolled && (
        <div className="top-0 left-0 z-50 fixed bg-white shadow-md w-full">
          <div className="flex items-center gap-4 px-4 py-2">
            {/* Desktop logo */}
            <div className="hidden lg:block shrink-0">
              <Logo width={40} height={40} />
            </div>

            {/* Mobile menu */}
            <IconButton
              className="lg:hidden"
              icon={MenuIcon}
              width={24}
              height={24}
            />

            {/* Desktop menu */}
            <IconButton
              className="hidden lg:flex bg-[#12151b] text-white"
              icon={MenuIcon}
              iconClassName="text-white"
              label="MENU"
              labelClassName="text-white"
            />

            {/* Search */}
            <div className="flex-1 px-4">
              <SearchInput iconWidth={24} iconHeight={24} />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <IconButton icon={User} width={24} height={24} />
              <div className="hidden lg:block">
                <IconButton icon={Heart} width={24} height={24} />
              </div>
              <IconButton icon={ShoppingBag} width={24} height={24} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
