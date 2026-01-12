export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="bg-black/70 rounded-xl p-8 backdrop-blur-sm text-gray-200">
                <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">プライバシーポリシー (Privacy Policy)</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-sm">広告の配信について</h2>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しており、Cookieを使用してユーザーの興味に応じた広告を配信しています。
                    </p>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        ユーザーは、広告設定でパーソナライズ広告を無効にすることができます。無効にする方法については、
                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Google 広告設定</a>
                        をご覧ください。また、<a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">www.aboutads.info</a>
                        にアクセスすれば、第三者配信事業者がパーソナライズド広告の掲載で使用する Cookie を無効にすることができます。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-sm">アクセス解析ツールについて</h2>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                        このGoogleアナリティクスは、データ収集のためにCookieを利用しています。
                        このデータは匿名で収集されており、個人を特定するものではありません。
                    </p>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                        Googleアナリティクスの規約に関しての詳細は
                        <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Googleアナリティクス利用規約</a>
                        や
                        <a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Googleポリシーと規約</a>
                        をご覧ください。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-sm">免責事項</h2>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
                    </p>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        また当サイトのコンテンツ・情報について、できる限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
                    </p>
                    <p className="mb-4 leading-relaxed text-white font-medium drop-shadow-sm">
                        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                    </p>
                </section>
            </div>
        </main>
    );
}
