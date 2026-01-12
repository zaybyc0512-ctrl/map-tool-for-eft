"use client";

import { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, useMapEvents, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapStore } from '@/lib/store';
import { AVAILABLE_MAPS, STATIC_EXTRACTS, TRANSIT_POINTS } from '@/lib/mapData';
import DrawingLayer from './DrawingLayer';
import MapMarker from './MapMarker';
import { v4 as uuidv4 } from 'uuid';

// Map interactions handler
function MapInteraction() {
    const {
        drawTool, currentMapId, setViewport,
        placementMode, updateManualMarkerPosition
    } = useMapStore();

    // const [measureStart, setMeasureStart] = useState<L.LatLng | null>(null); // Unused for now

    const map = useMapEvents({
        click(e) {
            // Priority 1: Placement Mode
            if (placementMode.active && placementMode.itemId) {
                updateManualMarkerPosition(currentMapId, placementMode.itemId, e.latlng.lat, e.latlng.lng);
                return; // Stop other interactions
            }
            // Other interactions handled by DrawingLayer
        },
        moveend() {
            setViewport(map.getZoom(), [map.getCenter().lat, map.getCenter().lng]);
        }
    });

    // Handle Dragging State
    useEffect(() => {
        if (!map) return;

        if (drawTool === 'pan') {
            map.dragging.enable();
            // Reset cursor
            map.getContainer().style.cursor = '';
        } else {
            map.dragging.disable();
            // Set cursor for drawing tools
            map.getContainer().style.cursor = 'crosshair';
        }
    }, [drawTool, map]);

    // Simple cursor style for placement
    useEffect(() => {
        if (placementMode.active) {
            L.DomUtil.addClass(map.getContainer(), 'cursor-crosshair');
        } else {
            L.DomUtil.removeClass(map.getContainer(), 'cursor-crosshair');
        }
    }, [placementMode.active, map]);

    return (
        <>
        </>
    );
}


interface GameMapProps {
    mapId: string;
}

export default function GameMap({ mapId }: GameMapProps) {
    const { maps, currentMapId, setCurrentMap, removePin, placementMode, sharedMapData } = useMapStore();

    // Sync prop mapId to store
    useEffect(() => {
        if (mapId && mapId !== currentMapId) {
            setCurrentMap(mapId);
        }
    }, [mapId, currentMapId, setCurrentMap]);

    const mapData = AVAILABLE_MAPS.find(m => m.id === mapId);
    const storeMapState = maps[mapId];

    // Shared Data
    const sharedData = sharedMapData[mapId];

    // Determine Map Image URL
    // Determine Map Image URL with Fallback
    const defaultImageUrl = mapData?.imagePath || '';
    const customImageUrl = (storeMapState?.isCustomMap && storeMapState.customMapDataUrl) ? storeMapState.customMapDataUrl : null;

    // We can verify the custom image by trying to load it (optional but good for robustness)
    // For now, simple priority. If "invalid", the user probably implies broken links.
    // Since we persist local blobs (which expire) or base64 (which persists),
    // simple assignment is:
    let displayImageUrl = customImageUrl || defaultImageUrl;

    // Bounds for CRS.Simple
    const bounds: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];

    if (!displayImageUrl) {
        return <div className="flex items-center justify-center h-full text-gray-500">Map not found or loading...</div>;
    }

    const userPins = storeMapState?.userPins || [];
    const manualMarkers = storeMapState?.manualMarkers || {};

    // Get Static Data definitions to enrich manual markers
    const staticExtracts = STATIC_EXTRACTS[mapId] || [];
    const staticTransits = TRANSIT_POINTS[mapId] || [];

    return (
        <div className="w-full h-full relative bg-gray-100 overflow-hidden">
            <MapContainer
                key={mapId}
                center={[500, 500]}
                zoom={1}
                style={{ height: '100%', width: '100%' }}
                crs={L.CRS.Simple}
                minZoom={-2}
                maxZoom={4}
                zoomSnap={0.1}
                zoomDelta={0.1}
                wheelPxPerZoomLevel={120}
            >
                <ImageOverlay
                    url={displayImageUrl}
                    bounds={bounds}
                    interactive={false}
                />

                <DrawingLayer />
                <MapInteraction />

                {/* User Pins */}
                {/* User Pins - MOVED TO DrawingLayer for unified editing control */}

                {/* Shared Data Display (Read Only) */}
                {sharedData && (
                    <>
                        {/* Shared Pins - Render with some indication they are shared? 
                            For now just render them. Passing onDelete as null implies read-only? 
                            MapMarker expects onDelete. Let's make onDelete optional in MapMarker or pass no-op.
                        */}
                        {sharedData.pins.map(pin => (
                            <MapMarker
                                key={`shared-${pin.id}`}
                                pin={pin}
                                onDelete={() => { }} // No-op for shared pins
                                readOnly={true} // We might need to add this prop to MapMarker
                            />
                        ))}
                        {/* Shared Drawings - Basic rendering */}
                        {sharedData.drawings.map(drawing => {
                            if (drawing.type === 'line' && Array.isArray(drawing.coordinates) && Array.isArray(drawing.coordinates[0])) {
                                return (
                                    <Polyline
                                        key={`shared-${drawing.id}`}
                                        positions={drawing.coordinates as [number, number][]}
                                        pathOptions={{ color: drawing.properties.color, weight: drawing.properties.width || 4, opacity: 0.6 }}
                                    />
                                );
                            }
                            else if (drawing.type === 'text' && Array.isArray(drawing.coordinates)) {
                                const position = (Array.isArray(drawing.coordinates[0]) ? drawing.coordinates[0] : drawing.coordinates) as [number, number];
                                const icon = L.divIcon({
                                    html: `<div style="color: ${drawing.properties.color}; font-size: ${drawing.properties.fontSize}px; white-space: nowrap; font-weight: bold; text-shadow: 1px 1px 0 #fff; opacity: 0.8;">${drawing.properties.text} (Shared)</div>`,
                                    className: 'text-label-icon',
                                    iconSize: [100, 20]
                                });

                                return (
                                    <Marker
                                        key={`shared-${drawing.id}`}
                                        position={position}
                                        icon={icon}
                                        interactive={false}
                                    />
                                );
                            } else if (drawing.type === 'image' && drawing.properties.imageUrl) {
                                let bounds = drawing.properties.bounds;

                                // Fallback
                                if (!bounds && Array.isArray(drawing.coordinates)) {
                                    const position = (Array.isArray(drawing.coordinates[0]) ? drawing.coordinates[0] : drawing.coordinates) as [number, number];
                                    const h = 50;
                                    const w = 50;
                                    bounds = [
                                        [position[0] - h / 2, position[1] - w / 2],
                                        [position[0] + h / 2, position[1] + w / 2]
                                    ];
                                }

                                if (!bounds) return null;

                                return (
                                    <ImageOverlay
                                        key={`shared-${drawing.id}`}
                                        url={drawing.properties.imageUrl}
                                        bounds={bounds}
                                        opacity={drawing.properties.opacity ?? 1}
                                    />
                                );
                            }
                            return null;
                        })}
                    </>
                )}

                {/* Manual Markers (Extracts) */}
                {Object.values(manualMarkers).map(marker => {
                    // Enrich with static data
                    const extractDef = staticExtracts.find(e => e.id === marker.id);
                    if (extractDef && marker.isVisible && marker.x !== undefined && marker.y !== undefined) {
                        return (
                            <MapMarker
                                key={marker.id}
                                pin={{
                                    id: marker.id,
                                    lat: marker.x, // Note: Leaflet uses lat/lng vs x/y confusingly usually y is lat
                                    lng: marker.y,
                                    color: extractDef.type === 'PMC' ? '#4CAF50' : (extractDef.type === 'Scav' ? '#FF9800' : '#2196F3'),
                                    iconType: 'extract',
                                    title: extractDef.title,
                                    description: `${extractDef.description} (${extractDef.conditions.join(', ')})`,
                                }}
                            />
                        );
                    }

                    // Enrich with transit data
                    const transitDef = staticTransits.find(t => t.id === marker.id);
                    if (transitDef && marker.isVisible && marker.x !== undefined && marker.y !== undefined) {
                        return (
                            <MapMarker
                                key={marker.id}
                                pin={{
                                    id: marker.id,
                                    lat: marker.x,
                                    lng: marker.y,
                                    color: '#9C27B0',
                                    iconType: 'transit',
                                    title: `Transit to ${AVAILABLE_MAPS.find(m => m.id === transitDef.destinationMapId)?.name || transitDef.destinationMapId}`,
                                    description: transitDef.description,
                                }}
                            />
                        );
                    }

                    return null;
                })}

                {/* Placement Mode Overlay Message */}
                {placementMode.active && (
                    <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: 'rgba(0,0,0,0.7)', color: 'white', padding: '5px 15px', borderRadius: '20px' }}>
                        Click on map to place marker
                    </div>
                )}

            </MapContainer>
        </div>
    );
}
