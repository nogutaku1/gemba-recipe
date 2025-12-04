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
                <nav className="ml-auto flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        トップ
                    </Link>
                    <a href="https://github.com/nogutaku1/gemba-recipe" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        GitHub
                    </a>
                </nav>
            </div>
        </header>
    );
}
