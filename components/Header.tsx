import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logo.png"
                            alt="現場AIレシピ ロゴ"
                            fill
                            className="object-contain"
                        />
                    </div>
                    現場AIレシピ
                </Link>
            </div>
        </header>
    );
}
