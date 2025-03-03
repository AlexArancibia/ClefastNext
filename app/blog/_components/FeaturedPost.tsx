"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface FeaturedPostProps {
  post: {
    title: string
    excerpt: string
    image: string
    category: string
  }
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-[400px] rounded-2xl overflow-hidden group"
    >
      <Link href="/blog/post">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <span className="inline-block px-3 py-1 mb-3 text-sm font-medium bg-primary/80 rounded-full">
            {post.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-200">{post.excerpt}</p>
        </div>
      </Link>
    </motion.div>
  )
}

