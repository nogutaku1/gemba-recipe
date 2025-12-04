import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Calendar, ArrowRight } from 'lucide-react';
import { getGradientClass } from '@/lib/utils';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ゲンバ・レシピ
            <span className="block text-lg md:text-xl font-normal mt-2 text-blue-200">Gemba Recipe</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            建設現場の『困った』をAIで即解決。<br />
            コピペで使える時短レシピ集
          </p>
        </div>
      </section>

      {/* Recipe List Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4">
          新着レシピ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData.map(({ slug, title, date, description, tags, occupation }) => (
            <Link href={`/ recipe / ${slug} `} key={slug} className="group">
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col relative">
                {occupation && (
                  <div className={`absolute top - 0 left - 0 w - full h - 1 ${getGradientClass(occupation)} `} />
                )}
                <div className="p-6 flex-1 pt-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={date}>{date}</time>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {occupation && (
                      <span className={`px - 2 py - 1 text - white text - xs rounded - full ${getGradientClass(occupation)} `}>
                        {occupation}
                      </span>
                    )}
                    {tags.filter(t => t !== occupation).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-blue-600 text-sm font-medium">
                  レシピを見る
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
