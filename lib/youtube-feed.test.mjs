// Run with `npm test` (Node's built-in runner; Node 24 strips the .ts types itself).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { decodeXml, displayTitle, oembedUrl, parseFeed, uploadsPlaylistId, videoIdFromThumbnail } from './youtube-feed.ts'

// Trimmed from the channel's real feed: a Short first, then a long-form video.
const FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns="http://www.w3.org/2005/Atom">
 <title>Screen Sage</title>
 <link rel="alternate" href="https://www.youtube.com/channel/UCrI8VGMKwjyVW2mbGNHA4xQ"/>
 <entry>
  <id>yt:video:SJ_dLZOa5X4</id>
  <yt:videoId>SJ_dLZOa5X4</yt:videoId>
  <title>#lanterns made me build my own ring • Lumenwright devlog 01 • #greenlantern #dccomics #vr</title>
  <link rel="alternate" href="https://www.youtube.com/shorts/SJ_dLZOa5X4"/>
 </entry>
 <entry>
  <id>yt:video:sz0Bo8J5CAE</id>
  <yt:videoId>sz0Bo8J5CAE</yt:videoId>
  <title>Channel Your Inner Chakra 🌀 Boruto &amp; Kawaki Epic Battles | Screen Sage Mindful Gaming ✨</title>
  <link rel="alternate" href="https://www.youtube.com/watch?v=sz0Bo8J5CAE"/>
 </entry>
</feed>`

test('parseFeed reads every entry and flags Shorts by their link', () => {
  assert.deepEqual(parseFeed(FEED), [
    { id: 'SJ_dLZOa5X4', title: 'Lanterns made me build my own ring • Lumenwright devlog 01', short: true },
    { id: 'sz0Bo8J5CAE', title: 'Channel Your Inner Chakra 🌀 Boruto & Kawaki Epic Battles | Screen Sage Mindful Gaming ✨', short: false },
  ])
})

test('parseFeed skips the channel-level link and returns nothing for an empty feed', () => {
  assert.deepEqual(parseFeed('<feed><title>Screen Sage</title></feed>'), [])
})

test('displayTitle drops trailing hashtags, keeps inline ones as words, capitalises a leading one', () => {
  assert.equal(displayTitle('It’s a brand new day 🌇 #spiderman #marvel #mcu'), 'It’s a brand new day 🌇')
  assert.equal(displayTitle('#lanterns made me build my own ring'), 'Lanterns made me build my own ring')
  assert.equal(displayTitle('Training with #goku today'), 'Training with goku today')
  assert.equal(displayTitle('Training arc • #anime'), 'Training arc')
  assert.equal(displayTitle('No tags at all'), 'No tags at all')
})

test('decodeXml handles named and numeric entities', () => {
  assert.equal(decodeXml('Boruto &amp; Kawaki &#39;n&#x27; &quot;friends&quot;'), 'Boruto & Kawaki \'n\' "friends"')
  assert.equal(decodeXml('&unknown; stays'), '&unknown; stays')
})

test('uploadsPlaylistId turns a channel id into its uploads playlist', () => {
  assert.equal(uploadsPlaylistId('UCrI8VGMKwjyVW2mbGNHA4xQ'), 'UUrI8VGMKwjyVW2mbGNHA4xQ')
  assert.equal(uploadsPlaylistId('UUrI8VGMKwjyVW2mbGNHA4xQ'), null)
  assert.equal(uploadsPlaylistId(''), null)
})

test('videoIdFromThumbnail reads the id from any thumbnail URL', () => {
  assert.equal(videoIdFromThumbnail('https://i.ytimg.com/vi/SJ_dLZOa5X4/hqdefault.jpg'), 'SJ_dLZOa5X4')
  assert.equal(videoIdFromThumbnail('https://i.ytimg.com/vi_webp/vMnldiu-3Tw/maxresdefault.webp'), 'vMnldiu-3Tw')
  assert.equal(videoIdFromThumbnail('https://i1.ytimg.com/vi/SJ_dLZOa5X4/hqdefault.jpg'), 'SJ_dLZOa5X4')
  assert.equal(videoIdFromThumbnail('https://example.com/vi/SJ_dLZOa5X4/hqdefault.jpg'), null)
  assert.equal(videoIdFromThumbnail('https://i.ytimg.com/vi/short/hqdefault.jpg'), null)
  assert.equal(videoIdFromThumbnail(undefined), null)
})

test('oembedUrl encodes the page URL', () => {
  assert.equal(
    oembedUrl('https://www.youtube.com/playlist?list=UUabc'),
    'https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DUUabc&format=json',
  )
})

test('displayTitle tidies an oEmbed title', () => {
  assert.equal(
    displayTitle('Lanterns made me build my own ring | Lumenwright devlog 01 #greenlantern #vr #gamedev'),
    'Lanterns made me build my own ring | Lumenwright devlog 01',
  )
})
