const fallbackBackendOrigin = "https://zelfmonco.xyz";

const rawBackendOrigin = import.meta.env.VITE_BACKEND_ORIGIN?.trim() || fallbackBackendOrigin;

export const backendOrigin = rawBackendOrigin.replace(/\/+$/, "");

export function backendUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${backendOrigin}${normalizedPath}`;
}
