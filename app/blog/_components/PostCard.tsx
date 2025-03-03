"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface PostCardProps {
  post: {
    title: string
    image: string
    author: {
      name: string
      avatar: string
    }
    date: string
  }
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href="/blog/post" className="block">
        <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <div className="flex items-center gap-3">
          <Image
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm text-muted-foreground">{post.author.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{post.date}</span>
        </div>
      </Link>
    </motion.article>
  )
}

