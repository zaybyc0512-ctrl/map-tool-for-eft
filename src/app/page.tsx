"use client";

import Link from 'next/link';
import { AVAILABLE_MAPS } from '@/lib/mapData';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
                Map Tool for EFT
            </Typography>

            <Grid container spacing={4}>
                {AVAILABLE_MAPS.map((map) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={map.id}>
                        <Card elevation={4}>
                            <CardActionArea component={Link} href={`/maps/${map.id}`}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    src={map.imagePath}
                                    alt={map.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {map.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Interactive map for {map.name} with extracts, loot, and more.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* User Guide Section */}
            <Box sx={{ mt: 10, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4, borderBottom: '2px solid #eee', pb: 2 }}>
                    使い方ガイド (User Guide)
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            🎮 基本操作 (Basic Controls)
                        </Typography>
                        <Typography component="div" variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>マップ移動:</strong> ドラッグ (Panツール選択時) またはマウスホイールでズーム。</li>
                                <li><strong>脱出/移動ポイント:</strong> 左サイドバーのリストからポイント名横の <AddLocationAltIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> をクリックし、マップ上の任意の場所をクリックして配置します。</li>
                                <li><strong>ポイント表示切替:</strong> チェックボックスで表示/非表示を個別に切り替えられます。</li>
                            </ul>
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ea4335' }}>
                            ✏️ 描画ツール (Drawing Tools)
                        </Typography>
                        <Typography component="div" variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>ピン (Marker):</strong> マップをクリックしてピンを設置。タイトルを入力できます。ツールアイコンを右クリックで「カテゴリー（Memo, Item, Danger, Task）」を選択可能。</li>
                                <li><strong>線 (Line):</strong> ドラッグしてフリーハンドで線を引きます。作戦ルートの記録に便利です。</li>
                                <li><strong>テキスト (Text):</strong> マップをクリックして文字を入力。</li>
                                <li><strong>画像 (Image):</strong> 自分のPCにある画像をアップロードしてマップに貼り付けられます。</li>
                            </ul>
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#34a853' }}>
                            📤 共有と保存 (Share & Save)
                        </Typography>
                        <Typography component="div" variant="body1" sx={{ color: 'text.secondary' }}>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>共有 (Share):</strong> 左サイドバーの「Share Map」ボタンで現在の状態（ピンや描画）を含んだURLをコピーします。友人に送って作戦を共有しましょう。（※画像は共有されません）</li>
                                <li><strong>保存 (Save):</strong> 共有されたURLを開くと「読み取り専用」モードになります。「Save」ボタンを押すと、現在の表示内容で自分のローカルデータを<strong>上書き保存</strong>します。</li>
                            </ul>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
