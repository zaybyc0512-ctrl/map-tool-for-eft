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
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{
                    '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 3, mb: 1 },
                    '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
                    '& ul': { paddingLeft: 3, listStyleType: 'disc', mb: 2 },
                    '& p': { mb: 2, lineHeight: 1.6 },
                }}
            />

            {/* AdSense Placeholder */}
            <Box sx={{ my: 4, p: 2, bgcolor: '#f0f0f0', textAlign: 'center', color: '#888' }}>
                Google AdSense Placeholder
            </Box>
        </Container>
    );
}
