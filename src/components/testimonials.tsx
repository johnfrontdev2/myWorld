"use client";

import React from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "John built our CRM from scratch and made it so easy for our team to use. The interface is clear and everything just works.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "He delivered our React website quickly and the UX/UI is simple and intuitive. Working with him was smooth from start to finish.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "John is very hands-on and supportive. He helped us set up our system and suggested improvements that made our work easier.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "He integrated our tools perfectly and made our workflow faster and simpler. Everything feels smoother now.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "John doesn’t just code, he makes things work for people. Our team adapted to the new system right away and productivity improved.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Our website and landing pages look better and work better. John really understands what users need.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "The CRM he designed is so intuitive that anyone can use it. He combines React and UX/UI in a practical way.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "John delivered our project faster than expected and with high quality. He knows how to turn ideas into real solutions.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "After John improved our platform, our conversions went up and customers enjoy using it much more.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
         {/* Header section */}
        <header className="text-center mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50 transition-all duration-300 hover:bg-midnight/8">
                Selected Works
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <h2 
              id="sites-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian leading-tight"
            >
              Crafted with intention.<br />Built for long-term impact.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              Each project represents a strategic partnership focused on digital excellence and measurable results.
            </p>
          </ScrollReveal>
        </header>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
