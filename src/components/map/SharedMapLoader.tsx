"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useMapStore } from '@/lib/store';
import { SharedMapData } from '@/types/mapData';

export default function SharedMapLoader() {
    const searchParams = useSearchParams();
    const encodedState = searchParams.get('state');
    const { loadSharedMap } = useMapStore();
    const loadedRef = useRef(false);

    useEffect(() => {
        if (encodedState && !loadedRef.current) {
            try {
                const jsonString = decodeURIComponent(atob(encodedState));
                const data: SharedMapData = JSON.parse(jsonString);

                // Validate structure briefly? 
                if (data.mapId && Array.isArray(data.pins)) {
                    console.log("Loading shared map data:", data);
                    loadSharedMap(data);
                    loadedRef.current = true;
                }
            } catch (e) {
                console.error("Failed to load shared map state:", e);
                // Optionally show error toast using a store action or local state
            }
        }
    }, [encodedState, loadSharedMap]);

    return null; // Logic only component
}
