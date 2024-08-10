import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Muzikly - My Playlists',
}

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactElement
}>) {
    return children
}
