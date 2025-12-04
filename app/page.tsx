// app/page.tsx
import Link from "next/link";
// 記事データ取得関数（※ご自身の環境に合わせてパスを調整してください）
import { getSortedPostsData } from "@/lib/posts";
// shadcn/uiのコンポーネントをインポート
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// グラデーション関数をインポート
import { getGradientClass } from "@/lib/utils";
// アイコン（lucide-reactはNext.jsに標準で入っています）
import { Hammer, ChevronRight } from "lucide-react";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* ヒーローセクション */}
      <section className="bg-white border-b py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            コピペで生産性200%増のレシピ集
            <Hammer className="inline-block ml-3 h-10 w-10 text-primary mb-2" />
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            建設現場の「困った」をAIで即解決。<br className="md:hidden" />
            ChatGPTやGeminiでお試しください。
          </p>
        </div>
      </section>

      {/* 記事一覧セクション */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPostsData.map(({ slug, title, description, occupation, tool }) => (
            <Link href={`/recipe/${slug}`} key={slug} className="block group">
              <Card className="h-full overflow-hidden border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                {/* ここが自動生成サムネイル画像エリア */}
                <div className={`h-32 w-full ${getGradientClass(occupation || '')} relative flex items-center justify-center`}>
                  {/* 職種名を白文字で中央に配置 */}
                  <span className="text-white font-bold text-lg drop-shadow-md">
                    {occupation}
                  </span>
                </div>

                <CardHeader>
                  {/* ツール名をバッジのように表示 */}
                  <div className="text-sm text-primary font-semibold mb-2">
                    {tool}
                  </div>
                  <CardTitle className="text-xl leading-snug group-hover:text-primary transition-colors">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary">
                    レシピを見る <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
