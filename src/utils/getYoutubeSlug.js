export default (link) => {
  const rg = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gm
  const slug = rg.exec(link)
  if (slug) {
    return slug[1]
  }
}
