import { getSortedPostsData, getPostData, getAllPostSlugs } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import { Metadata } from 'next';
import { getGradientClass } from '@/lib/utils';

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path) => path.params);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return {
        title: `${postData.title} | 現場AIレシピ`,
        description: postData.description,
        openGraph: {
            title: `${postData.title} | 現場AIレシピ`,
            description: postData.description,
            type: 'article',
            images: [
                {
                    url: '/logo.png', // デフォルト画像。記事ごとの画像があれば postData.image などに変更
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                },
            ],
        },
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);
    const allPosts = getSortedPostsData();
    const currentIndex = allPosts.findIndex(post => post.slug === slug);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    // 構造化データ (JSON-LD)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: postData.title,
        description: postData.description,
        datePublished: postData.date, // 必要に応じてISO形式に変換推奨
        author: {
            '@type': 'Person',
            name: '現場AIレシピ編集部', // または postData.author
        },
        image: '/logo.png', // 記事画像があればそれを設定
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <nav className="max-w-3xl mx-auto mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <Link href="/" className="hover:text-blue-600 transition-colors">TOP</Link>
                        <span className="mx-2">/</span>
                    </li>
                    {postData.occupation && (
                        <li className="flex items-center">
                            <Link
                                href={`/?tag=${encodeURIComponent(postData.occupation)}`}
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {postData.occupation}
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                    )}
                    <li className="flex items-center">
                        <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-md" aria-current="page">
                            {postData.title}
                        </span>
                    </li>
                </ol>
            </nav>

            <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <header className={`text-white p-8 md:p-12 ${postData.occupation ? getGradientClass(postData.occupation) : 'bg-blue-900'}`}>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {postData.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                        {postData.title}
                    </h1>
                    <div className="flex items-center gap-2 text-blue-200">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={postData.date}>{postData.date}</time>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 md:p-12 prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-pre:bg-gray-900 prose-pre:p-0 prose-pre:rounded-xl prose-img:rounded-xl">
                    <ReactMarkdown
                        components={{
                            pre: ({ children, ...props }) => {
                                // Extract code text from the code element (children)
                                // children is typically a <code> element with the text as its child
                                const codeElement = children as React.ReactElement;
                                const codeText = (codeElement?.props as any)?.children || '';

                                return (
                                    <div className="relative group my-6 not-prose">
                                        <div className="absolute right-4 top-4 z-10">
                                            <CopyButton text={String(codeText).replace(/\n$/, '')} />
                                        </div>
                                        <pre {...props} className="p-6 pt-16 bg-gray-900 rounded-xl overflow-x-auto text-gray-100">
                                            {children}
                                        </pre>
                                    </div>
                                );
                            },
                            code({ node, inline, className, children, ...props }: any) {
                                if (inline) {
                                    return (
                                        <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono before:content-[''] after:content-['']" {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {postData.content}
                    </ReactMarkdown>
                </div>
            </article>

            {/* Navigation */}
            <nav className="max-w-3xl mx-auto mt-12 flex flex-col md:flex-row justify-between gap-4">
                {prevPost ? (
                    <Link href={`/recipe/${prevPost.slug}`} className="flex-1 group">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full">
                            <span className="text-sm text-gray-400 mb-2 block flex items-center gap-1">
                                <ArrowLeft className="w-4 h-4" /> 前の記事
                            </span>
                            <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {prevPost.title}
                            </div>
                        </div>
                    </Link>
                ) : <div className="flex-1" />}

                {nextPost ? (
                    <Link href={`/recipe/${nextPost.slug}`} className="flex-1 group text-right">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full">
                            <span className="text-sm text-gray-400 mb-2 block flex items-center justify-end gap-1">
                                次の記事 <ArrowRight className="w-4 h-4" />
                            </span>
                            <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {nextPost.title}
                            </div>
                        </div>
                    </Link>
                ) : <div className="flex-1" />}
            </nav>

            <div className="text-center mt-12">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    トップページに戻る
                </Link>
            </div>
        </main>
    );
}
