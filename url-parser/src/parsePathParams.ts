import { isNumber } from "lodash";

export type ParsedPathParams = {
  [key: string]: string | number;
};

export const parsePathParams = (
  formatParts: string[],
  pathParts: string[],
): ParsedPathParams =>
  formatParts.reduce<ParsedPathParams>((acc, format, index) => {
    if (format.startsWith(":")) {
      const key = format.slice(1);
      const value = pathParts[index];
      const numberValue = Number(value);
      acc[key] =
        !isNaN(numberValue) && isNumber(numberValue) ? numberValue : value;
    }
    return acc;
  }, {});
