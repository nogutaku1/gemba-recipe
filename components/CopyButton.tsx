'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';

interface CopyButtonProps {
    text: string;
    className?: string;
}

export default function CopyButton({ text, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm",
                copied
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md",
                className
            )}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4" />
                    コピーしました！
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    プロンプトをコピー
                </>
            )}
        </button>
    );
}
