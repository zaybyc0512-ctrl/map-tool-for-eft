import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="bg-black/70 rounded-xl p-8 backdrop-blur-sm text-gray-200">
                <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">このサイトについて (About)</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-sm">概要</h2>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        Tarkov Map Toolは、Escape from Tarkov（EFT）のマップ攻略・タスク管理を支援するために開発された非公式ツールです。
                        ユーザーはマップ上に自由にメモやピンを追加し、情報を整理することができます。
                    </p>
                    <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-600 mt-4 shadow-lg">
                        <p className="text-sm text-yellow-500 font-bold mb-2">⚠️ Disclaimer</p>
                        <p className="text-sm text-slate-300">
                            This is an unofficial fan site. Escape from Tarkov is a trademark of Battlestate Games Limited.
                            Not affiliated with Battlestate Games.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-sm">運営者</h2>
                    <p className="mb-2 text-white font-medium"><strong>Name:</strong> takoyakiii</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-sm">お問い合わせ</h2>
                    <p className="mb-4 leading-relaxed text-white font-medium">
                        機能の不具合やご要望、その他お問い合わせは、以下のX（旧Twitter）アカウントまでご連絡ください。
                    </p>
                    <p>
                        <a href="https://x.com/Xv2UFh3LZzGJAqH" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">
                            @Xv2UFh3LZzGJAqH
                        </a>
                    </p>
                </section>

                <div className="mt-12 pt-8 border-t border-slate-600">
                    <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
