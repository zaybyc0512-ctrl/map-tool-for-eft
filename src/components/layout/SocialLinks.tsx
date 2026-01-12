import Link from 'next/link';

export default function SocialLinks() {
    return (
        <div className="fixed top-4 right-4 z-[5000] flex gap-4 items-center bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10 shadow-lg">
            {/* X (formerly Twitter) Link */}
            <Link
                href="https://x.com/Xv2UFh3LZzGJAqH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200 p-1"
                aria-label="X (Twitter)"
            >
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-6 h-6 fill-current"
                >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zl-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
            </Link>

            {/* Note Link */}
            <Link
                href="https://note.com/vast_acacia502/n/n72e61bcc343e?sub_rt=share_pb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#41C9B4] transition-colors duration-200 p-1"
                aria-label="Note"
            >
                {/* Simplified Note 'n' logo approximation */}
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-6 h-6 fill-current"
                >
                    <path d="M6 3v18h3.75v-8.25c0-1.875 1.5-3.375 3.375-3.375s3.375 1.5 3.375 3.375V21H20.25V12.75c0-4-3.25-7.125-7.125-7.125C10.5 5.625 8.25 6.75 6.75 8.25V3H6z" />
                </svg>
            </Link>
        </div>
    );
}
