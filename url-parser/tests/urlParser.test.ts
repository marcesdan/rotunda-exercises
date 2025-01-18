import { parseUrl } from "../src";

describe("parseUrl", () => {
  it("should parse URL with path and query parameters", () => {
    const formatString = "/:version/api/:collection/:id";
    const actualUrl = "/6/api/listings/3?sort=desc&limit=10";

    const result = parseUrl(formatString, actualUrl);

    expect(result).toEqual({
      version: 6,
      collection: "listings",
      id: 3,
      sort: "desc",
      limit: 10,
    });
  });

  it("should parse URL without query parameters", () => {
    const formatString = "/:version/api/:collection/:id";
    const actualUrl = "/6/api/listings/3";

    const result = parseUrl(formatString, actualUrl);

    expect(result).toEqual({
      version: 6,
      collection: "listings",
      id: 3,
    });
  });

  it("should parse URL with query parameters with booleans", () => {
    const formatString = "/:version/api/:collection/:id";
    const actualUrl = "/6/api/listings/3?sort=desc&limit=10&flag=true";

    const result = parseUrl(formatString, actualUrl);

    expect(result).toEqual({
      version: 6,
      collection: "listings",
      id: 3,
      sort: "desc",
      limit: 10,
      flag: true,
    });
  });
});
