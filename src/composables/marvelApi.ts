import type { Comics, Path } from "@/types/marvel";

const apiKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC;
const MARVEL_API = "//gateway.marvel.com/v1/public/";
const API_SIGN = `apikey=${apiKey}`;
const ITEMS_PER_PAGE = 20;

export const useComics = async (page: number = 0): Promise<Comics> => {
  const pagination = page ? `&offset=${page * ITEMS_PER_PAGE}` : "";
  const requestURI = `${MARVEL_API}/comics?${API_SIGN}${pagination}`;
  const result = await fetch(requestURI);
  const jsonResult = await result.json();
  return jsonResult.data;
};

const getPagination = (page?: number): string => {
  return page ? `&offset=${page * ITEMS_PER_PAGE}` : "";
};

const getQuery = (query?: string): string => {
  return query ? `&${query}` : "";
};

const getRequestURI = (
  path: Path,
  query: string,
  pagination: string
): string => {
  const apiPath = `${MARVEL_API}/${path}`;
  return `${apiPath}${API_SIGN}${query}${pagination}`;
};
