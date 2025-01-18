import { isNumber } from "lodash";

export type ParsedQueryParams = {
  [key: string]: string | number | boolean;
};

export const parseQueryParams = (queryString: string) => {
  const queryParams: ParsedQueryParams = {};

  const searchParams = new URLSearchParams(queryString);
  searchParams.forEach((value, key) => {
    queryParams[key] = parseValue(value);
  });

  return queryParams;
};

const parseValue = (value: string): string | number | boolean => {
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  const numberValue = Number(value);
  return !isNaN(numberValue) && isNumber(numberValue) ? numberValue : value;
};
