// types/mapData.ts

// Pin information definition
export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  color: string; // Google Material colors (e.g., #EA4335, #4285F4)
  iconType: 'task' | 'extract' | 'loot' | 'danger' | 'other' | 'transit';
  category?: 'memo' | 'item' | 'danger' | 'task'; // New optional category
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string; // Video URL for auto-loop playback
}

// Drawing/Handwriting data definition
export interface MapDrawing {
  id: string;
  type: 'line' | 'text' | 'polygon' | 'measure' | 'image'; // Added 'image'
  coordinates: [number, number][] | [number, number]; // Array for line/poly, Single point for text/image (top-left)
  properties: {
    color: string;
    width?: number; // Line width
    // Image properties
    imageUrl?: string;
    opacity?: number;
    bounds?: [[number, number], [number, number]]; // [southWest, northEast] or [topLeft, bottomRight] depending on coord system

    text?: string;  // Content for text objects
    fontSize?: number;
  };
}

// Map Extraction point definition
export interface ExtractionPoint {
  id: string;
  mapId: string;
  title: string;
  description: string;
  conditions: string[]; // e.g., ["Needs Key", "Green Smoke"]
  coordinates: [number, number];
  type: 'All' | 'PMC' | 'Scav';
}

export interface TransitPoint {
  id: string;
  mapId: string;
  destinationMapId: string;
  gridRef?: string; // e.g. "B3"
  description: string;
  coordinates: [number, number];
}

// State per map
export interface MapState {
  mapId: string;
  isCustomMap: boolean; // Is user uploaded custom map
  customMapDataUrl?: string; // Custom map image (Base64 or Blob URL)
  userPins: MapPin[];
  userDrawings: MapDrawing[]; // User drawings
  activeExtracts: string[];   // IDs of displayed extracts
  manualMarkers?: Record<string, { id: string, x: number, y: number, isVisible: boolean }>;
}

// Data shape for URL sharing (minimal)
export interface SharedMapData {
  mapId: string;
  pins: MapPin[];
  drawings: MapDrawing[];
  // We exclude manualMarkers and custom images from URL sharing to keep it light
}

// App-wide data store structure (legacy/export format)
export interface AppData {
  version: string;
  lastModified: string;
  maps: Record<string, MapState>; // Keyed by mapId
}
