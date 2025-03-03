import Image from "next/image"
import { blogContent } from "@/lib/blog-content"
import { Sidebar } from "./_components/Sidebar"
 

export default function BlogPost() {
  return (
    <main className="min-h-screen py-8 bg-gray-100">
      <div className="container-section">
        <div className="content-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Hero Image */}
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={blogContent.image || "/placeholder.svg"}
                    alt={blogContent.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={blogContent.author.avatar || "/placeholder.svg"}
                      alt={blogContent.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{blogContent.author.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {blogContent.author.role} • {blogContent.date}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{blogContent.title}</h2>

                  {/* Article Content */}
                  <div
                    className="prose prose-gray max-w-none gap-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: blogContent.content }}
                  />
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Sidebar />
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

