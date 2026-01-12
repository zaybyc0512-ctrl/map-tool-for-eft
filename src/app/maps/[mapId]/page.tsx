import { Suspense } from 'react';
import { AVAILABLE_MAPS, WIKI_CONTENT } from '@/lib/mapData';
import WikiArticlePanel from '@/components/panels/WikiArticlePanel';
import ResizableSplitter from '@/components/ui/ResizableSplitter';
import FloatingSearchBar from '@/components/ui/FloatingSearchBar';
import ToolPanel from '@/components/panels/ToolPanel';
import GameMapWrapper from '@/components/map/GameMapWrapper';
import SidebarControlPanel from '@/components/panels/SidebarControlPanel';
import SharedMapLoader from '@/components/map/SharedMapLoader';

import { Metadata } from 'next';

export async function generateStaticParams() {
    return AVAILABLE_MAPS.map((map) => ({
        mapId: map.id,
    }));
}

// Next.js 15+: params is a Promise
export async function generateMetadata({ params }: { params: Promise<{ mapId: string }> }): Promise<Metadata> {
    const { mapId } = await params;
    const mapData = AVAILABLE_MAPS.find(m => m.id === mapId);
    return {
        title: mapData ? `${mapData.name} Map - Map Tool for EFT` : 'Custom Map - Map Tool for EFT',
        description: `Interactive map and guide for ${mapData?.name || 'Custom Map'}.`,
    };
}

export default async function MapPage({
    params
}: {
    params: Promise<{ mapId: string }>
}) {
    const { mapId } = await params;

    const wiki = WIKI_CONTENT[mapId] || { title: 'Custom Map / No Data', content: '<p>No specific guide available for this map.</p>' };

    const MapArea = (
        <div className="relative w-full h-full">
            <FloatingSearchBar currentMapId={mapId} />
            <ToolPanel />
            <GameMapWrapper mapId={mapId} />
            <Suspense fallback={null}>
                <SharedMapLoader />
            </Suspense>
        </div>
    );

    const WikiArea = (
        <div className="w-full h-full overflow-y-auto bg-white">
            <WikiArticlePanel title={wiki.title} content={wiki.content} />
        </div>
    );

    // Right Side: Map (Top) + Wiki (Bottom)
    const RightContent = (
        <ResizableSplitter
            direction="vertical"
            panel1={MapArea}
            panel2={WikiArea}
            initialSplit={70}
        />
    );

    // Main Layout: Sidebar (Left) + RightContent
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden relative">
                <ResizableSplitter
                    direction="horizontal"
                    panel1={<SidebarControlPanel />}
                    panel2={RightContent}
                    initialSplit={20} // 20% Sidebar, 80% Map/Wiki
                />
            </div>
        </div>
    );
}
