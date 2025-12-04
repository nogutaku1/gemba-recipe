"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { getGradientClass } from "@/lib/utils";
import { PostData } from "@/lib/posts";

interface RecipeTabsProps {
    posts: Omit<PostData, "content">[];
}

const categories = [
    {
        name: "躯体・外装・内装",
        tags: ["大工", "大工・一人親方", "鳶職", "足場鳶", "塗装職人", "左官屋", "板金屋", "建築板金", "防水工", "防水・シーリング", "内装工", "内装屋（クロス職人）", "サッシ屋", "サッシ・建具屋", "サッシ・ガラス", "タイル職人", "断熱工", "ハウスクリーニング・美装"]
    },
    {
        name: "設備・電気",
        tags: ["電気工事士", "電気通信工", "太陽光・電気", "水道設備", "水道設備屋", "配管工", "空調設備", "空調設備工", "空調設備屋", "消防設備士", "防災設備屋", "溶接工", "鍛冶・溶接"]
    },
    {
        name: "土木・重機・警備",
        tags: ["土木作業員", "重機オペレーター", "ダンプ運転手", "コンクリート圧送", "解体業者", "警備員・誘導員", "交通誘導警備", "造園・植木屋", "外構・エクステリア", "測量士・土地家屋調査士", "看板・サイン"]
    },
    {
        name: "管理・事務・その他",
        tags: ["現場監督", "現場代理人", "安全管理", "機材管理", "採用・人事", "共通", "共通（事務・経理）"]
    }
];

export default function RecipeTabs({ posts }: RecipeTabsProps) {
    const searchParams = useSearchParams();
    const initialTag = searchParams.get('tag');
    const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

    useEffect(() => {
        setSelectedTag(initialTag);
    }, [initialTag]);

    // Filter posts based on selected tag
    const filteredPosts = useMemo(() => {
        if (!selectedTag) return posts;
        return posts.filter(post => post.occupation === selectedTag);
    }, [posts, selectedTag]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue="躯体・外装・内装" className="w-full mb-8">
                <TabsList className="h-auto flex flex-wrap justify-center gap-2 bg-transparent mb-6">
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category.name}
                            value={category.name}
                            className="px-4 py-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=active]:border-primary hover:bg-muted transition-colors rounded-full"
                        >
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((category) => (
                    <TabsContent key={category.name} value={category.name} className="space-y-6 animate-in fade-in-50 duration-300">
                        <div className="flex flex-wrap justify-center gap-2">
                            {category.tags.map(tag => (
                                <Button
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "secondary"}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className="rounded-full text-sm h-9 px-4 transition-all hover:scale-105"
                                    size="sm"
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(({ slug, title, description, occupation, tool }) => (
                    <article key={slug} className="group h-full flex flex-col">
                        <Link href={`/recipe/${slug}`} className="block h-full">
                            <Card className="h-full overflow-hidden border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                                <div className={`h-32 w-full ${getGradientClass(occupation || '')} relative flex items-center justify-center`}>
                                    <span className="text-white font-bold text-lg drop-shadow-md">
                                        {occupation}
                                    </span>
                                </div>
                                <CardHeader>
                                    <div className="text-sm text-primary font-semibold mb-2">
                                        {tool}
                                    </div>
                                    <h2 className="text-xl leading-snug font-semibold group-hover:text-primary transition-colors">
                                        {title}
                                    </h2>
                                </CardHeader>
                                <CardContent className="flex-grow">
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
                    </article>
                ))}
            </div>
        </div>
    );
}
