"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
 
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 bg-gradient-to-br from-white via-white to-midnight/[0.02] border-t border-silver/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-midnight rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-steel-highlight to-silver rounded-xl flex items-center justify-center shadow-md">
                <span className="text-obsidian font-display font-black text-sm">JS</span>
              </div>
              <div>
                <div className="text-xl font-display font-bold text-obsidian">johnnightsteel</div>
                <div className="text-sm text-gunmetal font-medium">Digital Architect</div>
              </div>
            </motion.div>

            <motion.p
              className="text-gunmetal leading-relaxed mb-6 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Crafting premium digital experiences for leaders and brands that refuse to blend in.
            </motion.p>

            {/* Social icons */}
            <motion.div
              className="flex space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </motion.div>

            {/* Newsletter */}
            <motion.form
              className="flex space-x-2 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full"
                />
              </div>
              <Button type="submit" className="rounded-full">
                Subscribe
              </Button>
            </motion.form>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <motion.h3
              className="text-lg font-display font-semibold text-obsidian mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Services
            </motion.h3>
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <li>
                <a className="text-gunmetal hover:text-midnight transition-colors duration-300 text-sm" href="#services">
                  Premium Websites
                </a>
              </li>
              <li>
                <a className="text-gunmetal hover:text-midnight transition-colors duration-300 text-sm" href="#services">
                  Interactive Portfolios
                </a>
              </li>
              <li>
                <a className="text-gunmetal hover:text-midnight transition-colors duration-300 text-sm" href="#services">
                  SEO & Growth Architecture
                </a>
              </li>
              <li>
                <a className="text-gunmetal hover:text-midnight transition-colors duration-300 text-sm" href="#contact">
                  Strategy Consultation
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <motion.h3
              className="text-lg font-display font-semibold text-obsidian mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's Connect
            </motion.h3>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-gunmetal text-sm leading-relaxed">
                Ready to build something exceptional? Let's discuss your vision.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-midnight hover:text-obsidian transition-colors duration-300 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span>Start a Project</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-silver/30 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-sm text-gunmetal">
            © {currentYear} johnnightsteel. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm text-gunmetal">
            <span>Crafted with precision</span>
            <span className="w-1 h-1 bg-silver rounded-full" />
            <span>Built for impact</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
