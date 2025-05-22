import Song from '@/types/song.types'
import createDownloadLinks from './download_links'
import createImageLinks from './image_links'
import { createArtistMap } from './format.artist'

const decodeHtmlEntities = (text: string) => {
    if (typeof text !== 'string') {
        return text
    }
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

export const formatSong = (song: any) =>
    ({
        id: song.id,
        name: decodeHtmlEntities(song.title),
        type: song.type,
        year: Number(song.year || 0),
        releaseDate: song.more_info?.release_date,
        duration: Number(song.more_info?.duration),
        label: song.more_info?.label,
        explicitContent: song.explicit_content === '1',
        playCount: Number(song.play_count || 0),
        language: song.language,
        hasLyrics: song.more_info?.has_lyrics === 'true',
        lyricsId: song.more_info?.lyrics_id,
        url: song.perma_url,
        copyright: song.more_info?.copyright_text,
        album: {
            id: song.more_info?.album_id,
            name: song.more_info?.album,
            url: song.more_info?.album_url,
        },
        artists: {
            primary: song.more_info?.artistMap?.primary_artists?.map(createArtistMap),
            featured: song.more_info?.artistMap?.featured_artists?.map(createArtistMap),
            all: song.more_info?.artistMap?.artists?.map(createArtistMap),
        },
        image: createImageLinks(song.image),
        downloadUrl: createDownloadLinks(song.more_info?.encrypted_media_url),
    }) as Song
