"use client";

import { useMapEvents, Polyline, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import { useMapStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';

export default function DrawingLayer() {
    const {
        drawTool,
        selectedColor,
        currentMapId,
        addDrawing,
        addPin,
        maps,
        setDrawTool
    } = useMapStore();

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

    // Reset temporary states when tool changes
    useEffect(() => {
        setCurrentLinePoints([]);
        isDrawingLine.current = false;
        setInputState(prev => ({ ...prev, visible: false, value: "" }));
        setImagePlacement(null);
    }, [drawTool]);

    // Focus input when visible
    useEffect(() => {
        if (inputState.visible && inputRef.current) {
            inputRef.current.focus();
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
            // Text Tool
            if (drawTool === 'text') {
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
                setImagePlacement({ lat: e.latlng.lat, lng: e.latlng.lng });
                fileInputRef.current?.click();
                L.DomEvent.stopPropagation(e.originalEvent);
            }
        }
    });

    const handleInputSubmit = () => {
        if (inputState.value.trim()) {
            if (inputState.type === 'text') {
                addDrawing(currentMapId, {
                    id: uuidv4(),
                    type: 'text',
                    coordinates: [inputState.lat, inputState.lng],
                    properties: {
                        color: selectedColor,
                        text: inputState.value,
                        fontSize: 16
                    }
                });
            } else if (inputState.type === 'marker') {
                addPin(currentMapId, {
                    id: uuidv4(),
                    lat: inputState.lat,
                    lng: inputState.lng,
                    color: selectedColor,
                    iconType: 'other',
                    category: inputState.category,
                    title: inputState.value,
                    description: '',
                });
            }
        }
        setInputState(prev => ({ ...prev, visible: false, value: "" }));
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
                        html: `<div style="color: ${drawing.properties.color}; font-size: ${drawing.properties.fontSize}px; white-space: nowrap; font-weight: bold; text-shadow: 1px 1px 0 #fff;">${drawing.properties.text}</div>`,
                        className: 'text-label-icon',
                        iconSize: [100, 20]
                    });

                    return (
                        <Marker
                            key={drawing.id}
                            position={position}
                            icon={icon}
                            interactive={false}
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
                    position={[inputState.lat, inputState.lng]}
                    icon={L.divIcon({ className: 'bg-transparent border-none', html: '', iconSize: [0, 0] })}
                    interactive={false}
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
                                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none bg-white text-gray-700"
                                    value={inputState.category}
                                    onChange={(e) => setInputState({ ...inputState, category: e.target.value as any })}
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
                                className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 text-black w-full"
                                placeholder={inputState.type === 'marker' ? "Pin Title..." : "Enter Text..."}
                            />
                            <div className="flex justify-end gap-2 mt-1">
                                <button
                                    onClick={() => setInputState({ ...inputState, visible: false })}
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
                    </Popup>
                </Marker>
            )}
        </>
    );
}
