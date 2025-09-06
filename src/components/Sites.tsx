'use client';

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

interface SitesProps {
  items?: GalleryItem[];
}

const defaultItems: GalleryItem[] = [
  {
    id: "1",
    title: "shadcn/ui: Building a Modern Component Library",
    description:
      "Explore how shadcn/ui revolutionized React component libraries with unique distribution and customization.",
    href: "https://ui.shadcn.com",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "2",
    title: "Tailwind CSS: The Utility-First Revolution",
    description:
      "Discover how Tailwind CSS transformed styling with utility-first classes and complete flexibility.",
    href: "https://tailwindcss.com",
    image:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "3",
    title: "React: Pioneering Component-Based UI",
    description:
      "React enables developers to build complex UIs with reusable, maintainable code.",
    href: "https://react.dev",
    image:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export default function Sites({ items = defaultItems }: SitesProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    update();
    carouselApi.on("select", update);
    return () => carouselApi.off("select", update);
  }, [carouselApi]);

  return (
    <section className="py-20">
      <div className="container mx-auto mb-8 flex items-end justify-between">
        <h2 className="text-3xl font-semibold">Our Projects</h2>
        <div className="hidden gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <Carousel setApi={setCarouselApi} opts={{ dragFree: true }}>
        <CarouselContent className="ml-0">
          {items.map((item) => (
            <CarouselItem key={item.id} className="max-w-[320px] pl-4 lg:max-w-[360px]">
              <a href={item.href} className="group rounded-xl">
                <div className="relative h-72 overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-primary" : "bg-primary/20"
            }`}
            onClick={() => carouselApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
