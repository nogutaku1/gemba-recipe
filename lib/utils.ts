// lib/utils.ts に追記

// 職種ごとのカラー定義（Tailwindのクラス名）
const occupationColors: Record<string, string> = {
    塗装職人: "from-blue-400 to-cyan-300",
    電気工事士: "from-yellow-400 to-orange-300",
    "内装屋（クロス職人）": "from-pink-400 to-rose-300",
    水道設備屋: "from-cyan-400 to-blue-300",
    足場鳶: "from-gray-600 to-gray-400",
    "大工・一人親方": "from-amber-500 to-yellow-400",
    現場監督: "from-green-500 to-emerald-400",
    // 他の職種も必要に応じて追加。デフォルトは紫系にしておく。
};

export function getGradientClass(occupation: string): string {
    // 定義されていればその色を、なければデフォルトの紫グラデーションを返す
    const colors = occupationColors[occupation] || "from-violet-500 to-purple-400";
    return `bg-gradient-to-br ${colors}`;
}
