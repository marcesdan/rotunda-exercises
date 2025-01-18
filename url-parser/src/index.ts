import { type ParsedPathParams, parsePathParams } from "./parsePathParams";
import { type ParsedQueryParams, parseQueryParams } from "./parseQueryParams";

export function parseUrl(formatString: string, actualUrl: string) {
  const [path, queryString] = actualUrl.split("?");
  const formatParts = formatString.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);

  const pathParams: ParsedPathParams = parsePathParams(formatParts, pathParts);
  const queryParams: ParsedQueryParams = parseQueryParams(queryString);

  return { ...pathParams, ...queryParams };
}
