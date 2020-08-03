import getYoutubeSlug from './getYoutubeSlug'

export default (link, quality) => {
  if (quality === 'max') {
    return `https://i3.ytimg.com/vi/${getYoutubeSlug(link)}/hqdefault.jpg`
  } else {
    return `https://i3.ytimg.com/vi/${getYoutubeSlug(link)}/hqdefault.jpg`
  }
}
