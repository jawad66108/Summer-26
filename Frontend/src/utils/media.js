const API_ORIGIN = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
).replace(/\/api\/?$/, "");

export function resolveImageUrl(path) {
  if (!path) return null;
  return `${API_ORIGIN}${path}`;
}
