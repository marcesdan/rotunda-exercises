# Zoo Exercise

A TypeScript implementation of a zoo where different animals can speak in their unique ways.

## Project Structure

```shell
zoo
├── src
│   ├── models
│   │   ├── Animal.ts        # Abstract class defining common properties and methods
│   │   ├── Lion.ts          # Class representing a lion
│   │   ├── Elephant.ts      # Class representing an elephant
│   │   └── Monkey.ts        # Class representing a monkey
│   │   └── index.ts         # Module exporting the animal classes
│   ├── index.ts             # Entry point of the application
├── tests
│   └── animals.test.ts      # Unit tests for the animal classes
└── README.md                # Project documentation
```

## Getting Started

1. Follow the [installation instructions](../README.md#installation).

2. Run the application:

   ```sh
   npm dev:zoo
   ```

3. Run the tests:

   ```sh
   npm test:zoo
   ```

## Note on Object-Oriented Programming

This exercise represents a classic example of OOP application, particularly demonstrating polymorphism through different animals sharing a common interface. While it serves as an educational example.

> [!WARNING]
> Having seen many codebases suffer from over-engineering, my experience shows that:
>
> - Complex inheritance hierarchies can be hard to maintain.
> - Consider composition over inheritance when possible.
> - Defer abstractions until they're needed.

This exercise demonstrates OOP concepts while acknowledging these practical considerations.
