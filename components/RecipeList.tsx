"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { getGradientClass } from "@/lib/utils";
import { PostData } from "@/lib/posts";

interface RecipeListProps {
    posts: Omit<PostData, "content">[];
}

export default function RecipeList({ posts }: RecipeListProps) {
    const searchParams = useSearchParams();
    const initialTag = searchParams.get('tag');
    const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

    useEffect(() => {
        setSelectedTag(initialTag);
    }, [initialTag]);

    // Extract unique tags (occupations)
    const tags = useMemo(() => {
        const allTags = posts.map(post => post.occupation).filter(Boolean) as string[];
        return Array.from(new Set(allTags));
    }, [posts]);

    // Filter posts based on selected tag
    const filteredPosts = useMemo(() => {
        if (!selectedTag) return posts;
        return posts.filter(post => post.occupation === selectedTag);
    }, [posts, selectedTag]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Tag Filter Buttons */}
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
                <Button
                    variant={selectedTag === null ? "default" : "outline"}
                    onClick={() => setSelectedTag(null)}
                    className="rounded-full"
                >
                    すべて
                </Button>
                {tags.map(tag => (
                    <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        onClick={() => setSelectedTag(tag)}
                        className="rounded-full"
                    >
                        {tag}
                    </Button>
                ))}
            </div>

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
