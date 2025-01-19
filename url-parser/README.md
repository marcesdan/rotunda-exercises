# URL Parser Exercise

## Problem Statement

Given:

1. A URL format string with variable parts (prefixed with `:`)
2. An actual URL instance matching that format with optional query parameters

Create a parser that extracts all variables into a hash/object.

### Example Input

```typescript
const formatString = "/:version/api/:collection/:id";
const actualUrl = "/6/api/listings/3?sort=desc&limit=10";
```

### Example Output

```typescript
{
  version: 6,
  collection: "listings",
  id: 3,
  sort: "desc",
  limit: 10
}
```

## Solution

The solution splits the problem into three main parts:

1. Parse path parameters (:version, :collection, :id)
2. Parse query parameters (sort, limit)
3. Combine both into a single result

## Implementation Details

### Main Parser - [`index.ts`](./src/index.ts)

Split URL into path and query components
Combine results from both parsers

### Path Parameters - [`parsePathParams.ts`](./src/parsePathParams.ts)

Split format and URL into parts
Match format parts starting with : to corresponding URL values
Convert numeric strings to numbers

### Query Parameters - [`parseQueryParams.ts`](./src/parseQueryParams.ts)

Use URLSearchParams to parse query string
Convert values to appropriate types (number, boolean, string)

> [!NOTE]
> While this implementation serves the purpose of the code challenge, in a real-world scenario I would consider using [query-string](https://github.com/sindresorhus/query-string) library which provides:
>
> - Automatic type conversion (numbers, booleans)
> - Array notation parsing
> - Null/undefined filtering
> - `stringify` for converting objects back to query strings
> - Production-ready edge cases handling

## Usage

```typescript
import { parseUrl } from "./src";

const result = parseUrl(
  "/:version/api/:collection/:id",
  "/6/api/listings/3?sort=desc&limit=10"
);

console.log(result);
// {
//   version: 6,
//   collection: "listings",
//   id: 3,
//   sort: "desc",
//   limit: 10
// }
```

## Tests

The implementation includes tests for:

- Basic path parameter parsing
- Query parameter parsing
- Type conversion (strings, numbers, booleans)
- URLs without query parameters

Run tests in root directory with:

```shell
npm run tests
```
