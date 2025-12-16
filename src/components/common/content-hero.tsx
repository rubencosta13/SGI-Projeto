import React from "react";
import Image from "next/image";

interface ContentHeroProps {
  title?: string;
  imageSources?: {
    mobile: string;
    tablet: string;
    desktop: string;
    largeDesktop?: string;
  };
  videoSrc?: string;
  aspectRatio?: string;
  linkHref?: string;
  buttons: Array<{
    text: string;
    href: string;
  }>;
}

export function ContentHero({
  title,
  imageSources,
  videoSrc,
  aspectRatio = "15/8",
  linkHref,
  buttons,
}: ContentHeroProps) {
  return (
    <div className="relative w-full">
      {/* Image Hero */}
      {imageSources && (
        <picture className="w-full" style={{ aspectRatio }}>
          <source media="(max-width: 480px)" srcSet={imageSources.mobile} />
          <source media="(max-width: 768px)" srcSet={imageSources.tablet} />
          <source media="(max-width: 1200px)" srcSet={imageSources.desktop} />
          {imageSources.largeDesktop && (
            <source
              media="(min-width:1200px)"
              srcSet={imageSources.largeDesktop}
            />
          )}
          <Image
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            src={require(imageSources.desktop)}
            alt={title || "Hero Image"}
            className="w-full h-full object-cover"
          />
          {/* <img
				    src={imageSources.desktop}
				    className='w-full h-full object-cover'
				    alt={title || 'Hero Image'}
				  /> */}
        </picture>
      )}

      {/* Video Hero */}
      {videoSrc && (
        <div className="w-full" style={{ aspectRatio }}>
          <iframe
            src={`${videoSrc}?autoplay=true&loop=true&muted=true`}
            className="border-0 aspect-[15/8]"
            allow="accelerometer; gyroscope; preload; encrypted-media; picture-in-picture; autoplay; loop;"
          />
        </div>
      )}

      {/* Optional link covering the hero */}
      {linkHref && (
        <a href={linkHref} className="z-10 absolute inset-0">
          <span className="sr-only">View</span>
        </a>
      )}

      {/* Hero Text & Buttons */}
      {(title || buttons.length > 0) && (
        <div className="bottom-4 left-4 z-20 absolute flex flex-col gap-2">
          <ul className="flex gap-2">
            {buttons.map((btn, i) => (
              <li key={i}>
                <a
                  href={btn.href}
                  className="bg-white hover:bg-gray-700 px-4 py-2 rounded-full text-black transition"
                >
                  {btn.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
