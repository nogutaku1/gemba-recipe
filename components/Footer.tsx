export default function Footer() {
    return (
        <footer className="py-6 text-center text-sm text-gray-500 border-t bg-white">
            <div className="flex justify-center items-center gap-4 mb-2">
                <a
                    href="https://x.com/nogutaku1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                    aria-label="X (Twitter)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} 現場AIレシピ All rights reserved.</p>
        </footer>
    );
}
