import { Suspense } from 'react';
import { getSortedPostsData } from "@/lib/posts";
import { Hammer } from "lucide-react";
import RecipeList from "@/components/RecipeList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "現場AIレシピ | 建設現場の事務作業をAIで自動化・DX推進",
  description: "建設業・工務店向け。日報作成、見積もり、工程表などをChatGPTやAIで自動化するプロンプト集（レシピ）を無料公開。コピペですぐに使えます。",
  keywords: ["建設業", "AI", "ChatGPT", "DX", "業務効率化", "日報"],
};

export default function Home() {
  const allPostsData = getSortedPostsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allPostsData.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://genba-recipe.com/recipe/${post.slug}`,
      "name": post.title,
      "description": post.description
    }))
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-white border-b py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xl text-primary font-bold mb-4">
            コピペで生産性爆上げ！
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            建設現場の『事務作業』を<br className="hidden md:inline" />AIでゼロにする
            <Hammer className="inline-block ml-3 h-10 w-10 text-primary mb-2" />
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ChatGPTやGeminiでお試しください。
          </p>
        </div>
      </section>

      {/* Recipe List with Filter */}
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <RecipeList posts={allPostsData} />
      </Suspense>
    </main>
  );
}
