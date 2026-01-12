"use client";

import { Container, Typography, Box } from '@mui/material';

interface WikiArticlePanelProps {
    title: string;
    content: string;
}

export default function WikiArticlePanel({ title, content }: WikiArticlePanelProps) {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>

            <Box
                className="prose max-w-none text-slate-900"
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{
                    '& h1': { color: '#0f172a' },
                    '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 1, color: '#0f172a' },
                    '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1, color: '#0f172a' },
                    '& ul': { paddingLeft: 3, listStyleType: 'disc', mb: 2 },
                    '& p': { mb: 2, lineHeight: 1.6 },
                    '& strong': { color: '#0f172a' }
                }}
            />

            {/* AdSense Placeholder */}
            <Box sx={{ my: 4, p: 2, bgcolor: '#f0f0f0', textAlign: 'center', color: '#888' }}>
                Google AdSense Placeholder
            </Box>
        </Container>
    );
}
