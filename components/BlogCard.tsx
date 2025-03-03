import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  image: string
  category: string
  title: string
  author: {
    name: string
    avatar: string
  }
  date: string
  slug: string
}

export function   BlogCard({ image, category, title, author, date, slug }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <Badge variant="secondary" className="bg-primary/10 text-accent hover:bg-primary/20">
          {category}
        </Badge>

        <h3 className="text-xl font-semibold text-secondary line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          {/* <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={author.avatar || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
          </div> */}
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>{author.name}</span>
            <span>·</span>
            <time dateTime={date}>{date}</time>
          </div>
        </div>
      </div>
    </Link>
  )
}

