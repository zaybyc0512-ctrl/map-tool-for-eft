"use client";

import { Paper, ToggleButton, ToggleButtonGroup, IconButton, Divider, Tooltip, Box, Popover, Typography } from '@mui/material';
import PanToolIcon from '@mui/icons-material/PanTool';
import EditIcon from '@mui/icons-material/Edit';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PlaceIcon from '@mui/icons-material/Place';
import ImageIcon from '@mui/icons-material/Image';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import StarsIcon from '@mui/icons-material/Stars';

import UndoIcon from '@mui/icons-material/Undo';
import { useMapStore } from '@/lib/store';
import { useState } from 'react';

const COLORS = ['#EA4335', '#4285F4', '#FBBC04', '#34A853', '#000000', '#FFFFFF'];

const MARKER_CATEGORIES = [
    { id: 'memo', label: 'Memo', icon: <PlaceIcon />, color: '#EA4335' },
    { id: 'item', label: 'Item', icon: <StarsIcon />, color: '#FBBC04' },
    { id: 'danger', label: 'Danger', icon: <WarningIcon />, color: '#000000' },
    { id: 'task', label: 'Task', icon: <CheckCircleIcon />, color: '#4285F4' },
] as const;

export default function ToolPanel() {
    const {
        drawTool, setDrawTool,
        selectedColor, setSelectedColor,
        undoLastDrawing, currentMapId
    } = useMapStore();

    // Marker Category Popover State
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleToolChange = (event: React.MouseEvent<HTMLElement>, newTool: string | null) => {
        if (newTool === 'marker') {
            setDrawTool('marker');
            // Open category selector if clicking marker tool while already active? 
            // Or maybe just always open? Let's treat it as a secondary config.
            if (drawTool === 'marker') {
                setAnchorEl(event.currentTarget);
            }
        } else if (newTool) {
            setDrawTool(newTool as any);
            setAnchorEl(null);
        }
    };

    const handleCategorySelect = (color: string) => {
        setSelectedColor(color);
        setAnchorEl(null);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    position: 'absolute',
                    top: 80,
                    right: 20,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 1,
                    gap: 1
                }}
                className="flex flex-col gap-2 p-2"
            >
                <ToggleButtonGroup
                    value={drawTool}
                    exclusive
                    onChange={handleToolChange}
                    orientation="vertical"
                    aria-label="drawing tools"
                    size="small"
                >
                    <ToggleButton value="pan" aria-label="pan">
                        <Tooltip title="移動 (Pan)" placement="left"><PanToolIcon /></Tooltip>
                    </ToggleButton>
                    <ToggleButton value="marker" aria-label="marker" onContextMenu={(e) => { e.preventDefault(); setAnchorEl(e.currentTarget); }}>
                        <Tooltip title="ピン (Marker) - Click again to change type" placement="left"><PlaceIcon /></Tooltip>
                    </ToggleButton>
                    <ToggleButton value="line" aria-label="line">
                        <Tooltip title="線 (Line)" placement="left"><EditIcon /></Tooltip>
                    </ToggleButton>
                    <ToggleButton value="text" aria-label="text">
                        <Tooltip title="テキスト (Text)" placement="left"><TextFieldsIcon /></Tooltip>
                    </ToggleButton>
                    <ToggleButton value="image" aria-label="image">
                        <Tooltip title="画像 (Image)" placement="left"><ImageIcon /></Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>

                <Divider />

                <Tooltip title="元に戻す (Undo)" placement="left">
                    <IconButton onClick={() => undoLastDrawing(currentMapId)} size="small" aria-label="undo">
                        <UndoIcon />
                    </IconButton>
                </Tooltip>

                <Divider />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: 40, gap: 0.5 }}>
                    {COLORS.map(c => (
                        <Box
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            sx={{
                                width: 18,
                                height: 18,
                                bgcolor: c,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: selectedColor === c ? '2px solid #555' : '1px solid #ddd'
                            }}
                        />
                    ))}
                </Box>
            </Paper>

            {/* Marker Category Selector Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'gray' }}>Select Type</Typography>
                    {MARKER_CATEGORIES.map((cat) => (
                        <Box
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.color)}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                        >
                            <Box sx={{ color: cat.color }}>{cat.icon}</Box>
                            <span className="text-sm">{cat.label}</span>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </>
    );
}
