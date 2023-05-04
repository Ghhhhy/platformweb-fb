export default function computedPx(designPx) {
  const designWidth = 1920
  const width = window.innerWidth
  return width / designWidth * designPx
}
