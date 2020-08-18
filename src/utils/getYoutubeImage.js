import getYoutubeSlug from './getYoutubeSlug'

/**
 * sadly youtube always serves an image (no error or anything), the only
 * way to check if we got the big max resolution image
 * is to check for the image width.
 *
 * fetch for status also doesnt work because cross orgin
 *
 * @param {string} url to check
 */
const check = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = (status) => resolve((img.width > 1000))
    img.src = url
  })
}

// delivers the youtube thumbnail.
// if you set quality to "max" you get the
// maxresdefault thumbnail when its available
export default async (link, quality) => {
  const maxUrl = `https://i3.ytimg.com/vi/${getYoutubeSlug(link)}/maxresdefault.jpg`
  const hqUrl = `https://i3.ytimg.com/vi/${getYoutubeSlug(link)}/hqdefault.jpg`
  if (quality === 'max') {
    const maxIsAvailable = await check(maxUrl)
    if (maxIsAvailable) {
      return maxUrl
    } else {
      return hqUrl
    }
  } else {
    return hqUrl
  }
}
