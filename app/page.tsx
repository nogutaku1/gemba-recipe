import { getSortedPostsData } from "@/lib/posts";
import { Hammer } from "lucide-react";
import RecipeList from "@/components/RecipeList";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            コピペで生産性200%増のレシピ集
            <Hammer className="inline-block ml-3 h-10 w-10 text-primary mb-2" />
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ChatGPTやGeminiでお試しください。
          </p>
        </div>
      </section>

      {/* Recipe List with Filter */}
      <RecipeList posts={allPostsData} />
    </main>
  );
}
