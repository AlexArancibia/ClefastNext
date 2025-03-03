import Image from "next/image"
import Link from "next/link"
 
import { recentPosts } from "@/lib/blog-content"
import { SearchBox } from "./SearchBox"

export function Sidebar() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <SearchBox />
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Artículos Recientes</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="flex gap-3 group">
              <Image
                src={post.image }
                alt={post.title}
                width={80}
                height={60}
                className="rounded object-cover w-24 h-20"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Categorías</h3>
        <div className="space-y-2">
          {["Innovación", "Sostenibilidad", "Tecnología", "Mejores Prácticas"].map((category) => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase()}`}
              className="block text-muted-foreground hover:text-primary transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

