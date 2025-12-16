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
      <div className="flex flex-1 lg:flex-none items-center gap-3">
        <Link className="lg:hidden block" href="/">
          <Logo width={48} height={48} />
        </Link>

        <NavLinks
          className="flex items-center gap-3 mr-6"
          links={[
            { href: "/", label: "Casa" },
            { href: "/moda", label: "Moda" },
          ]}
        />
      </div>

      <div className="hidden lg:flex flex-1 justify-center mx-4">
        <SearchInput />
      </div>

      <div className="flex items-center gap-4 ml-6">
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
    <div className="flex items-center ml-4">
      <IconButton className="lg:hidden flex" icon={MenuIcon} />

      <IconButton
        className="hidden lg:flex pl-2"
        icon={MenuIcon}
        iconClassName="text-black-500"
        label="MENU"
      />

      <NavLinks
        className="hidden lg:flex gap-4 p-2 w-full"
        linksClassName={
          "text-base px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
        }
        links={[
          { href: "/", label: "Novidades" },
          { href: "/moda", label: "Les Irresistibles" },
          { href: "/sala", label: "Sala de Estar" },
          { href: "/topvendas", label: "Top Vendas" },
          { href: "/b2b", label: "Profissionais", right: true },
        ]}
      />

      <SearchInput className="lg:hidden" />
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex  top-0 left-0 flex-col w-full z-50 transition-all duration-300 ${
        scrolled && "bg-transparent"
      }`}
    >
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <Link className="hidden lg:block" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col w-full">
          <HeaderRow1 />
          <HeaderRow2 />
        </div>
      </div>

      {scrolled && (
        <div className="top-0 left-0 z-50 fixed bg-white shadow-md w-full">
          <div className="flex justify-between items-center px-4 py-2">
            {/* Logo: only visible on lg+ */}
            <div className="hidden lg:block">
              <Logo width={40} height={40} />
            </div>

            {/* Menu Button */}
            <IconButton
              label=""
              className="lg:hidden flex ml-6"
              icon={MenuIcon}
              width={24}
              height={24}
            />

            <IconButton
              className="hidden lg:flex bg-[#12151b] pl-0 text-white"
              icon={MenuIcon}
              iconClassName="text-white"
              label="MENU"
              labelClassName="text-white"
            />

            {/* Search Bar */}
            <div className="flex-1 mx-4">
              <SearchInput iconHeight={24} iconWidth={24} />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <IconButton icon={User} height={24} width={24} />
              {/* Heart: only visible on lg+ */}
              <div className="hidden lg:block">
                <IconButton icon={Heart} height={24} width={24} />
              </div>
              <IconButton icon={ShoppingBag} height={24} width={24} />
            </div>
          </div>
        </div>
      )}
      {/* {scrolled && <div className='h-10' />} */}
    </header>
  );
};

export default Header;
