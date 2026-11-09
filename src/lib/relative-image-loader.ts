/** Static-export image loader: serves local images as-is via relative paths. */
export default function relativeImageLoader({ src }: { src: string; width: number; quality?: number }) {
  return src.startsWith("/") ? src.slice(1) : src;
}
