// method format date
const formatDate = (timestamp) => {
  const d = new Date(timestamp._seconds * 1000)
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  const year = d.getFullYear()
  return `${month}/${day}/${year}`
}
export default formatDate
