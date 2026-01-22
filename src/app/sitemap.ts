import { MetadataRoute } from 'next'

// 静的エクスポート（output: 'export'）のためにこの行を追加
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.map-tool-for-eft.com'

    // サイト内の固定ページ
    const routes = [
        '', // ホーム
        '/about',
        '/privacy',
    ]

    // マップごとのページ
    const maps = [
        '/maps/ground_zero',
        '/maps/streets',
        '/maps/interchange',
        '/maps/customs',
        '/maps/factory',
        '/maps/woods',
        '/maps/reserve',
        '/maps/lighthouse',
        '/maps/shoreline',
        '/maps/the_lab',
        '/maps/the_labyrinth',
        '/maps/terminal',
    ]

    // すべてのURLを結合してsitemap形式に変換
    const allUrls = [...routes, ...maps]

    return allUrls.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
