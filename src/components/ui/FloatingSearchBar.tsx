"use client";

import { Paper, Select, MenuItem, Button, SelectChangeEvent, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AVAILABLE_MAPS } from '@/lib/mapData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMapStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, useRef } from 'react';

interface FloatingSearchBarProps {
    currentMapId: string;
}

export default function FloatingSearchBar({ currentMapId }: FloatingSearchBarProps) {
    const router = useRouter();
    const { setMapImage } = useMapStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value;
        if (val) {
            router.push(`/maps/${val}`);
        }
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target?.result as string;
                if (dataUrl) {
                    // Update the image for the CURRENTLY selected map
                    setMapImage(currentMapId, dataUrl);
                    // No navigation needed, state update triggers re-render in GameMap
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const isCustom = !AVAILABLE_MAPS.find(m => m.id === currentMapId);

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 1000,
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2
            }}
        >
            <Select
                value={isCustom ? '' : currentMapId}
                onChange={handleChange}
                displayEmpty
                size="small"
                sx={{ minWidth: 150, border: 'none', fieldset: { border: 'none' } }}
                renderValue={(selected) => {
                    if (selected === '') return <em>Custom Map</em>;
                    return AVAILABLE_MAPS.find(m => m.id === selected)?.name || selected;
                }}
            >
                <MenuItem disabled value="">
                    <em>Select Map</em>
                </MenuItem>
                {AVAILABLE_MAPS.map((map) => (
                    <MenuItem key={map.id} value={map.id}>
                        {map.name}
                    </MenuItem>
                ))}
            </Select>

            <IconButton color="primary" sx={{ p: '10px' }} aria-label="upload" onClick={() => fileInputRef.current?.click()}>
                <CloudUploadIcon />
            </IconButton>
            <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
            />
        </Paper>
    );
}
