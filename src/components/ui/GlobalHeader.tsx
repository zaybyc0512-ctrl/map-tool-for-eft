"use client";

export default function GlobalHeader() {
    return (
        <header className="h-8 bg-gray-100 border-b border-gray-200 flex items-center justify-end px-4 gap-4 z-[2000]">
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-600 hover:underline"
            >
                X (Twitter)
            </a>
            <a
                href="https://note.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-600 hover:underline"
            >
                Note
            </a>
        </header>
    );
}
