"use client";

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from '@/types/mapData';
import { Box, Typography, CardMedia, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DiamondIcon from '@mui/icons-material/Diamond';
import WarningIcon from '@mui/icons-material/Warning';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarsIcon from '@mui/icons-material/Stars';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { renderToStaticMarkup } from 'react-dom/server';

interface MapMarkerProps {
    pin: MapPin;
    onDelete?: (id: string) => void;
    onEdit?: (pin: MapPin) => void; // Added onEdit prop
    readOnly?: boolean;
}

const getIconComponent = (type: string, category: string | undefined, color: string) => {
    const style = { color: color, fontSize: 40, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))' };

    // Static types override category
    switch (type) {
        case 'extract': return <LogoutIcon style={style} />;
        case 'transit': return <DirectionsRunIcon style={style} />;
        case 'task': return <AssignmentIcon style={style} />; // Legacy task type?
        case 'loot': return <DiamondIcon style={style} />;
    }

    // For generic user markers ('other'), check category
    switch (category) {
        case 'item': return <StarsIcon style={style} />;
        case 'danger': return <WarningIcon style={style} />;
        case 'task': return <CheckCircleIcon style={style} />;
        case 'memo':
        default: return <LocationOnIcon style={style} />;
    }
};

const createCustomIcon = (color: string, type: string, category?: string) => {
    const iconHtml = renderToStaticMarkup(getIconComponent(type, category, color));

    return L.divIcon({
        html: iconHtml,
        className: 'custom-map-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

export default function MapMarker({ pin, onDelete, onEdit, readOnly }: MapMarkerProps) {
    return (
        <Marker
            position={[pin.lat, pin.lng]}
            icon={createCustomIcon(pin.color, pin.iconType, pin.category)}
            opacity={readOnly ? 0.8 : 1}
            eventHandlers={{
                click: (e) => {
                    if (onEdit && !readOnly) {
                        L.DomEvent.stopPropagation(e.originalEvent);
                        onEdit(pin);
                    }
                }
            }}
        >
            <Popup>
                <Box sx={{ minWidth: 200, maxWidth: 300 }}>
                    <Typography variant="h6" component="div">
                        {pin.title}
                    </Typography>
                    {pin.description && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {pin.description}
                        </Typography>
                    )}

                    {pin.imageUrl && (
                        <CardMedia
                            component="img"
                            height="140"
                            image={pin.imageUrl}
                            alt={pin.title}
                            sx={{ borderRadius: 1, mb: 1 }}
                        />
                    )}

                    {pin.videoUrl && (
                        <video
                            src={pin.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', borderRadius: 4, marginBottom: 8 }}
                        />
                    )}

                    {/* Delete Button */}
                    {!readOnly && onDelete && (
                        <div
                            style={{ color: 'red', cursor: 'pointer', textAlign: 'right', fontSize: '12px', marginTop: '8px' }}
                            onClick={() => onDelete(pin.id)}
                        >
                            Delete
                        </div>
                    )}
                    {readOnly && (
                        <div style={{ color: 'gray', textAlign: 'right', fontSize: '10px', fontStyle: 'italic', marginTop: '4px' }}>
                            Shared (Read Only)
                        </div>
                    )}
                </Box>
            </Popup>
        </Marker>
    );
}
