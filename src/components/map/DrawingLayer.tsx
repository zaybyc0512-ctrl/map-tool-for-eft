"use client";

import { useMapEvents, Polyline, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import { useMapStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';
import MapMarker from './MapMarker';

export default function DrawingLayer() {
    const {
        drawTool,
        selectedColor,
        currentMapId,
        addDrawing,
        addPin,
        updateDrawing,
        updatePin,
        removePin, // Needed for MapMarker onDelete
        maps,
        setDrawTool
    } = useMapStore();

    const userPins = maps[currentMapId]?.userPins || [];
    const userDrawings = maps[currentMapId]?.userDrawings || [];

    // State for Line Tool
    const [currentLinePoints, setCurrentLinePoints] = useState<[number, number][]>([]);
    const isDrawingLine = useRef(false);

    // Unified Input State for Text and Marker tools
    const [inputState, setInputState] = useState<{
        lat: number;
        lng: number;
        visible: boolean;
        type: 'text' | 'marker';
        value: string;
        category: 'memo' | 'item' | 'danger' | 'task';
        id?: string; // ID for editing existing items
    }>({
        lat: 0,
        lng: 0,
        visible: false,
        type: 'text',
        value: "",
        category: 'memo'
    });

    const inputRef = useRef<HTMLInputElement>(null);

    // State for Image Tool
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePlacement, setImagePlacement] = useState<{ lat: number, lng: number } | null>(null);
    const [isDraggingMode, setIsDraggingMode] = useState(false);

    // Reset temporary states when tool changes
    useEffect(() => {
        setCurrentLinePoints([]);
        isDrawingLine.current = false;
        setInputState(prev => ({ ...prev, visible: false, value: "" }));
        setImagePlacement(null);
    }, [drawTool]);

    // Focus input when visible AND force popup open
    const popupMarkerRef = useRef<L.Marker>(null);
    useEffect(() => {
        if (inputState.visible) {
            // Force open popup
            if (popupMarkerRef.current) {
                popupMarkerRef.current.openPopup();
            }
            // Focus input
            if (inputRef.current) {
                // Short timeout to ensure render
                setTimeout(() => inputRef.current?.focus(), 50);
            }
        }
    }, [inputState.visible]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && imagePlacement) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target?.result as string;
                // Create an image to get dimensions (optional, or just set default size)
                const img = new Image();
                img.onload = () => {
                    // Default size or user defined? Let's verify aspect ratio
                    // For map objects, let's default to a reasonable size in map units, e.g. 50x(aspect)
                    const aspectRatio = img.width / img.height;
                    const height = 50;
                    const width = height * aspectRatio;

                    // Calculate bounds centered on click
                    const lat = imagePlacement.lat;
                    const lng = imagePlacement.lng;
                    const bounds: [[number, number], [number, number]] = [
                        [lat - height / 2, lng - width / 2],
                        [lat + height / 2, lng + width / 2]
                    ];

                    addDrawing(currentMapId, {
                        id: uuidv4(),
                        type: 'image',
                        coordinates: [lat, lng],
                        properties: {
                            color: '#ffffff', // unused for images basically
                            imageUrl: dataUrl,
                            opacity: 1,
                            bounds: bounds
                        }
                    });
                    // Reset
                    setDrawTool('pan');
                    setImagePlacement(null);
                };
                img.src = dataUrl;
            };
            reader.readAsDataURL(file);
        }
        // clear input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    useMapEvents({
        mousedown(e) {
            if (drawTool === 'line') {
                isDrawingLine.current = true;
                setCurrentLinePoints([[e.latlng.lat, e.latlng.lng]]);
                e.originalEvent.preventDefault();
                e.target.dragging.disable();
            }
        },
        mousemove(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            if (drawTool === 'line' && isDrawingLine.current) {
                setCurrentLinePoints(prev => [...prev, [lat, lng]]);
            }
        },
        mouseup(e) {
            if (drawTool === 'line' && isDrawingLine.current) {
                isDrawingLine.current = false;
                e.target.dragging.enable();

                if (currentLinePoints.length > 1) {
                    addDrawing(currentMapId, {
                        id: uuidv4(),
                        type: 'line',
                        coordinates: currentLinePoints,
                        properties: {
                            color: selectedColor,
                            width: 4
                        }
                    });
                }
                setCurrentLinePoints([]);
            }
        },
        click(e) {
            // console.log('[DrawingLayer] Click detected', { drawTool, latlng: e.latlng });
            // Text Tool
            if (drawTool === 'text') {
                // console.log('[DrawingLayer] Activating Text Tool Input');
                setInputState({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    visible: true,
                    type: 'text',
                    value: "",
                    category: 'memo'
                });
                L.DomEvent.stopPropagation(e.originalEvent);
            }
            // Marker Tool
            else if (drawTool === 'marker') {
                // console.log('[DrawingLayer] Activating Marker Tool Input');
                setInputState({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    visible: true,
                    type: 'marker',
                    value: "",
                    category: 'memo' // Default
                });
                L.DomEvent.stopPropagation(e.originalEvent);
            }
            // Image Tool
            else if (drawTool === 'image') {
                // console.log('[DrawingLayer] Activating Image Tool');
                setImagePlacement({ lat: e.latlng.lat, lng: e.latlng.lng });
                fileInputRef.current?.click();
                L.DomEvent.stopPropagation(e.originalEvent);
            }
        }
    });

    const handleInputSubmit = () => {
        // For Markers, allow empty title (default to "Pin")
        // For Text, require value.
        const effectiveValue = inputState.value.trim() || (inputState.type === 'marker' ? 'Pin' : '');

        if (effectiveValue) {
            if (inputState.type === 'text') {
                if (inputState.id) {
                    // Update existing text
                    updateDrawing(currentMapId, inputState.id, {
                        coordinates: [inputState.lat, inputState.lng],
                        properties: {
                            text: effectiveValue,
                            color: selectedColor
                        }
                    });
                } else {
                    // Create new text
                    addDrawing(currentMapId, {
                        id: uuidv4(),
                        type: 'text',
                        coordinates: [inputState.lat, inputState.lng],
                        properties: {
                            color: selectedColor,
                            text: effectiveValue,
                            fontSize: 16
                        }
                    });
                }
            } else if (inputState.type === 'marker') {
                if (inputState.id) {
                    // Update existing marker
                    updatePin(currentMapId, inputState.id, {
                        lat: inputState.lat,
                        lng: inputState.lng,
                        color: selectedColor,
                        category: inputState.category,
                        title: effectiveValue,
                    });
                } else {
                    // Create new marker
                    addPin(currentMapId, {
                        id: uuidv4(),
                        lat: inputState.lat,
                        lng: inputState.lng,
                        color: selectedColor,
                        iconType: 'other',
                        category: inputState.category,
                        title: effectiveValue,
                        description: '',
                    });
                }
            }
        }
        setInputState(prev => ({ ...prev, visible: false, value: "", id: undefined }));
        setDrawTool('pan');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleInputSubmit();
        } else if (e.key === 'Escape') {
            setInputState(prev => ({ ...prev, visible: false }));
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* User Pins - Rendered in DrawingLayer for unified editing control */}
            {userPins.map(pin => (
                <MapMarker
                    key={pin.id}
                    pin={pin}
                    onDelete={(id) => removePin(currentMapId, id)}
                    onEdit={(pin) => {
                        if (drawTool === 'pan') {
                            L.DomEvent.stopPropagation({} as any); // Mock or just rely on click bubbling? Marker usually stops propagation.
                            // Actually MapMarker onClick handler likely needs to be intercepted or we pass onEdit.
                            // Assuming MapMarker component accepts onEdit. I need to verify MapMarker definition.
                            setInputState({
                                lat: pin.lat,
                                lng: pin.lng,
                                visible: true,
                                type: 'marker',
                                value: pin.title,
                                category: pin.category || 'memo',
                                id: pin.id
                            });
                        }
                    }}
                />
            ))}

            {/* Existing Drawings */}
            {userDrawings.map((drawing) => {
                if (drawing.type === 'line' && Array.isArray(drawing.coordinates) && Array.isArray(drawing.coordinates[0])) {
                    return (
                        <Polyline
                            key={drawing.id}
                            positions={drawing.coordinates as [number, number][]}
                            pathOptions={{ color: drawing.properties.color, weight: drawing.properties.width || 4 }}
                        />
                    );
                } else if (drawing.type === 'text' && Array.isArray(drawing.coordinates)) {
                    // ... text rendering
                    const position = (Array.isArray(drawing.coordinates[0]) ? drawing.coordinates[0] : drawing.coordinates) as [number, number];
                    const icon = L.divIcon({
                        // Added transform for centering and white-space: nowrap
                        html: `<div style="transform: translate(-50%, -50%); color: ${drawing.properties.color}; font-size: ${drawing.properties.fontSize}px; white-space: nowrap; font-weight: bold; text-shadow: 1px 1px 0 #fff;">${drawing.properties.text}</div>`,
                        className: 'text-label-icon',
                        iconSize: [0, 0] // Set to 0,0 so our translate handles centering relative to point
                    });

                    return (
                        <Marker
                            key={drawing.id}
                            position={position}
                            icon={icon}
                            interactive={true} // Enable interaction
                            eventHandlers={{
                                click: (e) => {
                                    if (drawTool === 'pan') { // Only edit when in default mode
                                        L.DomEvent.stopPropagation(e.originalEvent);
                                        setInputState({
                                            lat: position[0],
                                            lng: position[1],
                                            visible: true,
                                            type: 'text',
                                            value: drawing.properties.text,
                                            category: 'memo',
                                            id: drawing.id
                                        });
                                    }
                                }
                            }}
                        />
                    );
                } else if (drawing.type === 'image' && drawing.properties.imageUrl) {
                    // Render user placed images
                    let bounds = drawing.properties.bounds;

                    // Fallback calculation if bounds are missing (backward compatibility)
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
                            key={drawing.id}
                            url={drawing.properties.imageUrl}
                            bounds={bounds}
                            opacity={drawing.properties.opacity ?? 1}
                        />
                    );
                }
                return null;
            })}

            {/* Current Line Preview */}
            {currentLinePoints.length > 0 && (
                <Polyline
                    positions={currentLinePoints}
                    pathOptions={{ color: selectedColor, weight: 4, opacity: 0.7 }}
                />
            )}

            {/* Unified Input Overlay */}
            {inputState.visible && (
                <Marker
                    key={`input-overlay-${inputState.id || 'new'}-${isDraggingMode}`}
                    ref={popupMarkerRef}
                    position={[inputState.lat, inputState.lng]}
                    icon={isDraggingMode ? L.divIcon({
                        className: 'bg-transparent border-none',
                        html: '<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-move"></div>',
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                    }) : L.divIcon({
                        className: 'bg-transparent border-none',
                        html: '',
                        iconSize: [0, 0]
                    })}
                    interactive={isDraggingMode} // Only interactive when moving
                    draggable={isDraggingMode}
                    eventHandlers={{
                        dragend: (e) => {
                            const marker = e.target;
                            const position = marker.getLatLng();
                            setInputState({ ...inputState, lat: position.lat, lng: position.lng, category: inputState.category as 'memo' | 'item' | 'danger' | 'task' });
                        }
                    }}
                >
                    <Popup
                        closeButton={false}
                        autoClose={false}
                        closeOnClick={false}
                        className="input-popup"
                        offset={[0, inputState.type === 'marker' ? -30 : 0]}
                        minWidth={200}
                    >
                        <div className="flex flex-col gap-2 p-1">
                            {inputState.type === 'marker' && (
                                <select
                                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none bg-white text-gray-900 pointer-events-auto shadow-sm"
                                    value={inputState.category}
                                    onChange={(e) => setInputState({ ...inputState, category: e.target.value as 'memo' | 'item' | 'danger' | 'task' })}
                                >
                                    <option value="memo">📝 Memo</option>
                                    <option value="item">🌟 Item</option>
                                    <option value="danger">⚠️ Danger</option>
                                    <option value="task">✅ Task</option>
                                </select>
                            )}
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputState.value}
                                onChange={(e) => setInputState({ ...inputState, value: e.target.value })}
                                onKeyDown={handleKeyDown}
                                className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 bg-white text-gray-900 w-full pointer-events-auto shadow-sm"
                                placeholder={inputState.type === 'marker' ? "Pin Title..." : "Enter Text..."}
                            />
                            <div className="flex justify-between gap-2 mt-1">
                                <button
                                    onClick={() => {
                                        // Toggle Move functionality (simple flag in local state would be better but we can reuse a prop or just use boolean toggle here if we restructure)
                                        // Let's add a local state for 'isMoving' to the component, not inputState to avoid complex types if possible, or just add to inputState.
                                        // Since inputState is state, let's use a ref or separate state? Separate state handles render updates.
                                        // But wait, we need to update 'draggable' prop on Marker. 
                                        // Let's use a new state: isDraggingMode
                                        setIsDraggingMode(!isDraggingMode);
                                    }}
                                    className={`text-xs px-2 py-1 rounded border ${isDraggingMode ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-gray-100 border-gray-300 text-gray-600'} hover:bg-gray-200`}
                                    title="Toggle Move Mode"
                                >
                                    {isDraggingMode ? '✋ Moving...' : '✥ Move'}
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setInputState({ ...inputState, visible: false, id: undefined });
                                            setIsDraggingMode(false);
                                        }}
                                        className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleInputSubmit}
                                        className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 font-bold"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            )}
        </>
    );
}
