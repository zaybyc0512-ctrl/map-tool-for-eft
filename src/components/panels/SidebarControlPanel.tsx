"use client";

import { useMapStore } from '@/lib/store';
import { STATIC_EXTRACTS, TRANSIT_POINTS, AVAILABLE_MAPS } from '@/lib/mapData';
import {
    List, ListItem, ListItemText, ListItemIcon, Checkbox,
    IconButton, Typography, Paper, Divider, Box, Button, Tooltip, Snackbar, Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LogoutIcon from '@mui/icons-material/Logout';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SharedMapData } from '@/types/mapData';

export default function SidebarControlPanel() {
    const router = useRouter();
    const {
        currentMapId, maps, sharedMapData,
        toggleManualMarkerVisibility, startPlacement, placementMode,
        saveSharedMapToLocal, clearSharedMap
    } = useMapStore();

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'info' | 'error' } | null>(null);

    const mapState = maps[currentMapId];
    const manualMarkers = mapState?.manualMarkers || {};
    const sharedData = sharedMapData[currentMapId];

    const extracts = STATIC_EXTRACTS[currentMapId] || [];
    const transits = TRANSIT_POINTS[currentMapId] || [];

    const handleToggle = (id: string, currentVisible: boolean) => {
        // If marker has coords, toggle visibility
        toggleManualMarkerVisibility(currentMapId, id, !currentVisible);
    };

    const handlePlace = (id: string, type: 'extract' | 'transit') => {
        startPlacement(id, type);
    };

    // Helper to check if marker has coordinates set
    const hasCoordinates = (id: string) => {
        const m = manualMarkers[id];
        return m?.x !== undefined && m?.y !== undefined;
    };

    const isVisible = (id: string) => {
        const m = manualMarkers[id];
        return m?.isVisible ?? false;
    };

    const handleShare = () => {
        const dataToShare: SharedMapData = {
            mapId: currentMapId,
            pins: mapState?.userPins || [],
            drawings: mapState?.userDrawings?.filter(d => d.type !== 'image') || [] // Exclude images to save size
        };

        try {
            const jsonString = JSON.stringify(dataToShare);
            const base64 = btoa(encodeURIComponent(jsonString)); // Simple Base64 encoding handling unicode
            const safeEncoded = encodeURIComponent(base64);
            const url = `${window.location.origin}/maps/${currentMapId}?state=${safeEncoded}`;
            navigator.clipboard.writeText(url);
            setMessage({ text: 'Share URL copied to clipboard!', type: 'success' });
        } catch (e) {
            console.error("Share error", e);
            setMessage({ text: 'Failed to generate share URL.', type: 'error' });
        }
    };

    const handleSaveShared = () => {
        if (window.confirm("現在の表示内容であなたのローカルデータを上書きしますか？")) {
            saveSharedMapToLocal(currentMapId);
            setMessage({ text: 'Shared data saved to your local storage!', type: 'success' });
            // Optionally clear shared state after saving? The user didn't explicitly ask, but it makes sense. 
            // However, keeping it makes it clear what was just saved. Let's keep it.
        }
    };

    const handleClearShared = () => {
        clearSharedMap(currentMapId);
        // Clean URL ref
        router.replace(`/maps/${currentMapId}`);
    };

    return (
        <Paper elevation={0} square className="h-full w-full overflow-y-auto bg-gray-50 border-r border-gray-200">
            <div className="p-4 bg-white sticky top-0 z-10 border-b border-gray-200 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h6" className="font-bold text-gray-800 leading-tight">
                            Map Tool for EFT
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                            {AVAILABLE_MAPS.find(m => m.id === currentMapId)?.name || 'Unknown Map'}
                        </Typography>
                    </div>
                    <Tooltip title="Home">
                        <IconButton onClick={() => router.push('/')} size="small">
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        size="small"
                        fullWidth
                        onClick={handleShare}
                        sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                    >
                        Share Map
                    </Button>
                </div>

                {/* Shared Data Actions Banner */}
                {sharedData && (
                    <div className="bg-blue-50 p-2 rounded border border-blue-200 mt-2 flex flex-col gap-2">
                        <Typography variant="caption" className="text-blue-800 font-bold block">
                            Viewing Shared Data
                        </Typography>
                        <Typography variant="caption" className="text-blue-600 leading-tight block mb-1">
                            This data is temporary. Save to overwrite your local map.
                        </Typography>
                        <div className="flex gap-1">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<SaveAltIcon />}
                                onClick={handleSaveShared}
                                sx={{ fontSize: '0.7rem', padding: '2px 8px' }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="text"
                                color="inherit"
                                size="small"
                                onClick={handleClearShared}
                                sx={{ fontSize: '0.7rem', padding: '2px 8px' }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Extracts Section */}
            <div className="p-2">
                <Typography variant="subtitle2" className="px-2 py-1 text-gray-500 font-bold uppercase text-xs">
                    Extraction Points
                </Typography>
                <List dense>
                    {extracts.map((ext) => {
                        const isSet = hasCoordinates(ext.id);
                        const isPlacing = placementMode.active && placementMode.itemId === ext.id;

                        return (
                            <ListItem
                                key={ext.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="place"
                                        color={isPlacing ? "primary" : (isSet ? "success" : "default")}
                                        onClick={() => handlePlace(ext.id, 'extract')}
                                        size="small"
                                    >
                                        {isSet ? <CheckCircleIcon fontSize="small" /> : <AddLocationAltIcon fontSize="small" />}
                                    </IconButton>
                                }
                                disablePadding
                                className={`mb-1 rounded ${isPlacing ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                            >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <Checkbox
                                        edge="start"
                                        checked={isVisible(ext.id)}
                                        disabled={!isSet} // Disable toggle if no coords
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={() => handleToggle(ext.id, isVisible(ext.id))}
                                        size="small"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={ext.title}
                                    secondary={ext.type}
                                    primaryTypographyProps={{ variant: 'body2', className: 'font-medium' }}
                                    secondaryTypographyProps={{ variant: 'caption', className: ext.type === 'PMC' ? 'text-green-600' : 'text-blue-600' }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>

            <Divider />

            {/* Transits Section */}
            <div className="p-2">
                <Typography variant="subtitle2" className="px-2 py-1 text-gray-500 font-bold uppercase text-xs">
                    Transit Points
                </Typography>
                <List dense>
                    {transits.map((tr) => {
                        const isSet = hasCoordinates(tr.id);
                        const isPlacing = placementMode.active && placementMode.itemId === tr.id;
                        const destName = AVAILABLE_MAPS.find(m => m.id === tr.destinationMapId)?.name || tr.destinationMapId;

                        return (
                            <ListItem
                                key={tr.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="place"
                                        color={isPlacing ? "primary" : (isSet ? "success" : "default")}
                                        onClick={() => handlePlace(tr.id, 'transit')}
                                        size="small"
                                    >
                                        {isSet ? <CheckCircleIcon fontSize="small" /> : <AddLocationAltIcon fontSize="small" />}
                                    </IconButton>
                                }
                                disablePadding
                                className={`mb-1 rounded ${isPlacing ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                            >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <Checkbox
                                        edge="start"
                                        checked={isVisible(tr.id)}
                                        disabled={!isSet}
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={() => handleToggle(tr.id, isVisible(tr.id))}
                                        size="small"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`To ${destName}`}
                                    secondary="Transit"
                                    primaryTypographyProps={{ variant: 'body2', className: 'font-medium' }}
                                    secondaryTypographyProps={{ variant: 'caption', className: 'text-purple-600' }}
                                />
                            </ListItem>
                        );
                    })}
                    {transits.length === 0 && (
                        <Typography variant="caption" className="px-4 text-gray-400 italic">
                            No transits on this map.
                        </Typography>
                    )}
                </List>
            </div>

            <Snackbar
                open={!!message}
                autoHideDuration={3000}
                onClose={() => setMessage(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setMessage(null)} severity={message?.type || 'info'} sx={{ width: '100%' }}>
                    {message?.text}
                </Alert>
            </Snackbar>
        </Paper>
    );
}
