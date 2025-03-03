"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { BlogCard } from "./BlogCard"
 

const posts = [
  {
    image: "/blog1.jpg",
    category: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    author: {
      name: "Tracey Wilson",
      avatar: "/avatars/tracey.jpg",
    },
    date: "August 20, 2022",
    slug: "impact-of-technology-1",
  },
  {
    image: "/blog2.jpg",
    category: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    author: {
      name: "Jason Francisco",
      avatar: "/avatars/jason.jpg",
    },
    date: "August 20, 2022",
    slug: "impact-of-technology-2",
  },
  {
    image: "/blog3.jpg",
    category: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    author: {
      name: "Elizabeth Slavin",
      avatar: "/avatars/elizabeth.jpg",
    },
    date: "August 20, 2022",
    slug: "impact-of-technology-3",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-100 ">
      <div className="container-section">
        <div className="content-section">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <h2 className="  text-secondary">BLOG Y NOTICIAS</h2>
            <a
              href="/blog"
              className="text-primary hover:text-primary/90 transition-colors flex items-center gap-2 group"
            >
              Ver todos los post
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

