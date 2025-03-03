
import { blogPosts } from "@/lib/data"
import { FeaturedPost } from "./_components/FeaturedPost"
import { PostCard } from "./_components/PostCard"
import { Testimonials } from "./_components/Testimonials"

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen ">
      <div className="container-section py-8">
        <div className="content-section">
          {/* Featured Post */}
          {featuredPost && <FeaturedPost post={featuredPost} />}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 pb-12">
            {regularPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </main>
  )
}

