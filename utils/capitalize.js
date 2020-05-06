export default function capitalize(str) {
  const firstLetter = str.charAt(0)
  const rest = str.slice(1)
  return firstLetter.toUpperCase() + rest
}