"use client";

import dynamic from 'next/dynamic';

const GameMap = dynamic(() => import('./GameMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading Map...</div>
});

export default function GameMapWrapper(props: any) {
    return <GameMap {...props} />;
}
