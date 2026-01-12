import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-8 text-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                {/* Links */}
                <div className="flex gap-4">
                    <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
                    <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                </div>

                {/* Disclaimer & Copyright */}
                <div className="flex flex-col gap-2 md:text-right max-w-lg">
                    <p className="text-xs text-slate-500">
                        This is an unofficial fan site. Escape from Tarkov is a trademark of Battlestate Games Limited.
                        Not affiliated with Battlestate Games.
                    </p>
                    <p className="text-xs font-semibold">
                        &copy; 2026 Tarkov Map Tool. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
