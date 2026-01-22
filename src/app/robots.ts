import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://www.map-tool-for-eft.com/sitemap.xml',
    }
}
// ビルドエラー回避のために静的生成を指定
export const dynamic = 'force-static'
