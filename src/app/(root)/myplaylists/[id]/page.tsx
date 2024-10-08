import SongsTable from './SongsTable'
import getPlaylistWithSong from '@/actions/user/playlist/getPlaylistWithSong'
import { redirect } from 'next/navigation'
import DownloadButton from '../../../../components/DownloadButton'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any) {
    const { playlist, error } = await getPlaylistWithSong(params.id)
    if (error)
        return {
            title: 'Muzikly',
        } as Metadata
    else
        return {
            title: `Playlist - ${playlist?.name}`,
        } as Metadata
}

export default async function page({ params }: any) {
    const { playlist, error } = await getPlaylistWithSong(params.id)
    if (error) redirect('/myplaylists')
    return (
        <div className="overflow-hidden px-2 pt-0 sm:px-5 sm:pt-5">
            <div className="flex h-full flex-col overflow-hidden pb-5">
                <div className="relative flex shrink-0 items-end gap-3 overflow-hidden pb-3 sm:pb-10">
                    <h1 className="overflow-hidden truncate text-lg font-bold sm:text-2xl md:text-3xl lg:text-4xl">{playlist.name}</h1>
                    <DownloadButton name={playlist.name} songs={playlist.songs} />
                </div>
                <SongsTable playlist={playlist} />
            </div>
        </div>
    )
}
