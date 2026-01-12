import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MapPin, MapDrawing, MapState, SharedMapData } from '@/types/mapData';

// New interface for manual markers
export interface ManualMarkerState {
    id: string; // Matches the extract/transit ID
    x?: number;
    y?: number;
    isVisible: boolean;
}

interface MapStoreState {
    // Current View State
    currentMapId: string;
    zoom: number;
    center: [number, number];

    // Data for all maps
    maps: Record<string, MapState & { manualMarkers?: Record<string, ManualMarkerState> }>;

    // Shared State (Temporary, from URL)
    sharedMapData: Record<string, SharedMapData | null>;

    // UI State
    drawTool: 'pan' | 'line' | 'text' | 'marker' | 'measure' | 'image';
    selectedColor: string;
    showExtracts: boolean; // Kept for backward compat or global toggle if needed

    // Placement Mode
    placementMode: {
        active: boolean;
        itemId: string | null;
        itemType: 'extract' | 'transit' | null;
    };

    // Actions
    setCurrentMap: (mapId: string) => void;
    setViewport: (zoom: number, center: [number, number]) => void;
    setDrawTool: (tool: 'pan' | 'line' | 'text' | 'marker' | 'measure' | 'image') => void;
    setSelectedColor: (color: string) => void;
    toggleExtracts: (show: boolean) => void;

    // Placement Actions
    startPlacement: (itemId: string, type: 'extract' | 'transit') => void;
    cancelPlacement: () => void;

    // Manual Marker Actions
    updateManualMarkerPosition: (mapId: string, markerId: string, x: number, y: number) => void;
    toggleManualMarkerVisibility: (mapId: string, markerId: string, isVisible: boolean) => void;

    // Data Actions
    addPin: (mapId: string, pin: MapPin) => void;
    removePin: (mapId: string, pinId: string) => void;
    addDrawing: (mapId: string, drawing: MapDrawing) => void;
    removeDrawing: (mapId: string, drawingId: string) => void;

    // Actions
    setMapImage: (mapId: string, dataUrl: string) => void;
    undoLastDrawing: (mapId: string) => void;

    // Shared Map Actions
    loadSharedMap: (data: SharedMapData) => void;
    saveSharedMapToLocal: (mapId: string) => void;
    clearSharedMap: (mapId: string) => void;

    // Custom Map - Legacy support or separate mode? 
    // We'll keep this but rely on setMapImage for the requested feature
    setCustomMap: (mapId: string, dataUrl: string) => void;
}

export const useMapStore = create<MapStoreState>()(
    persist(
        (set, get) => ({
            currentMapId: 'customs',
            zoom: 1,
            center: [500, 500],
            maps: {},
            sharedMapData: {},

            drawTool: 'pan',
            selectedColor: '#EA4335',
            showExtracts: true,

            placementMode: { active: false, itemId: null, itemType: null },

            setCurrentMap: (mapId) => set({ currentMapId: mapId }),
            setViewport: (zoom, center) => set({ zoom, center }),
            setDrawTool: (tool) => set({ drawTool: tool }),
            setSelectedColor: (color) => set({ selectedColor: color }),
            toggleExtracts: (show) => set({ showExtracts: show }),

            startPlacement: (itemId, type) => set({
                placementMode: { active: true, itemId, itemType: type },
                drawTool: 'pan'
            }),

            cancelPlacement: () => set({
                placementMode: { active: false, itemId: null, itemType: null }
            }),

            updateManualMarkerPosition: (mapId, markerId, x, y) => set((state) => {
                const mapState = state.maps[mapId] || {
                    mapId, isCustomMap: false, userPins: [], userDrawings: [], activeExtracts: [], manualMarkers: {}
                };
                const currentMarkers = mapState.manualMarkers || {};

                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            manualMarkers: {
                                ...currentMarkers,
                                [markerId]: {
                                    id: markerId,
                                    x,
                                    y,
                                    isVisible: true
                                }
                            }
                        }
                    },
                    placementMode: { active: false, itemId: null, itemType: null }
                };
            }),

            toggleManualMarkerVisibility: (mapId, markerId, isVisible) => set((state) => {
                const mapState = state.maps[mapId];
                if (!mapState) return state;

                const currentMarkers = mapState.manualMarkers || {};
                const marker = currentMarkers[markerId];

                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            manualMarkers: {
                                ...currentMarkers,
                                [markerId]: {
                                    id: markerId,
                                    x: marker?.x,
                                    y: marker?.y,
                                    isVisible
                                }
                            }
                        }
                    }
                };
            }),

            addPin: (mapId, pin) => set((state) => {
                const mapState = state.maps[mapId] || {
                    mapId, isCustomMap: false, userPins: [], userDrawings: [], activeExtracts: [], manualMarkers: {}
                };
                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            userPins: [...mapState.userPins, pin]
                        }
                    }
                };
            }),

            removePin: (mapId, pinId) => set((state) => {
                const mapState = state.maps[mapId];
                if (!mapState) return state;
                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            userPins: mapState.userPins.filter(p => p.id !== pinId)
                        }
                    }
                };
            }),

            addDrawing: (mapId, drawing) => set((state) => {
                const mapState = state.maps[mapId] || {
                    mapId, isCustomMap: false, userPins: [], userDrawings: [], activeExtracts: [], manualMarkers: {}
                };
                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            userDrawings: [...mapState.userDrawings, drawing]
                        }
                    }
                };
            }),

            removeDrawing: (mapId, drawingId) => set((state) => {
                const mapState = state.maps[mapId];
                if (!mapState) return state;
                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            userDrawings: mapState.userDrawings.filter(d => d.id !== drawingId)
                        }
                    }
                };
            }),

            undoLastDrawing: (mapId) => set((state) => {
                const mapState = state.maps[mapId];
                if (!mapState || !mapState.userDrawings.length) return state;
                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            userDrawings: mapState.userDrawings.slice(0, -1)
                        }
                    }
                };
            }),

            setMapImage: (mapId, dataUrl) => set((state) => {
                const mapState = state.maps[mapId] || {
                    mapId, isCustomMap: false, userPins: [], userDrawings: [], activeExtracts: [], manualMarkers: {}
                };
                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...mapState,
                            isCustomMap: true, // Mark as having custom data
                            customMapDataUrl: dataUrl
                        }
                    }
                };
            }),

            setCustomMap: (mapId, dataUrl) => set((state) => ({
                maps: {
                    ...state.maps,
                    [mapId]: {
                        ...state.maps[mapId],
                        mapId,
                        isCustomMap: true,
                        customMapDataUrl: dataUrl,
                        userPins: [],
                        userDrawings: [],
                        activeExtracts: [],
                        manualMarkers: {}
                    }
                }
            })),

            // Shared Map Actions
            loadSharedMap: (data) => set((state) => ({
                sharedMapData: {
                    ...state.sharedMapData,
                    [data.mapId]: data
                },
                currentMapId: data.mapId // Auto switch to shared map
            })),

            saveSharedMapToLocal: (mapId) => set((state) => {
                const sharedData = state.sharedMapData[mapId];
                if (!sharedData) return state;

                const currentLocal = state.maps[mapId] || {
                    mapId, isCustomMap: false, userPins: [], userDrawings: [], activeExtracts: [], manualMarkers: {}
                };

                return {
                    maps: {
                        ...state.maps,
                        [mapId]: {
                            ...currentLocal,
                            userPins: sharedData.pins, // Overwrite with shared data
                            userDrawings: sharedData.drawings
                        }
                    },
                    sharedMapData: {
                        ...state.sharedMapData,
                        [mapId]: null // Clear shared data after saving
                    }
                };
            }),

            clearSharedMap: (mapId) => set((state) => ({
                sharedMapData: {
                    ...state.sharedMapData,
                    [mapId]: null
                }
            })),
        }),
        {
            name: 'eft-map-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                ...state,
                sharedMapData: {} // Exclude sharedMapData from local storage persistence
            }),
        }
    )
);
