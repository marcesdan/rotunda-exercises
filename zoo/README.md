# Zoo Exercise

A TypeScript implementation of a zoo where different animals can speak in their unique ways.

## Project Structure

```sh
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

1. Clone the repository:

   ```sh
   git clone <github.con/marcesdan/rotunda-exercises>
   ```

2. Install the dependencies:

   ```sh
   npm i
   ```

3. Run the application:

   ```sh
   npm dev:zoo
   ```

4. Run the tests:

   ```sh
   npm test:zoo
   ```

## Note on Object-Oriented Programming

This exercise represents a classic example of OOP application, particularly demonstrating polymorphism through different animals sharing a common interface. While it serves as an excellent educational example, it's worth noting that these aren't universal solutions for all problems. From my experience:

- OOP abstractions, when overused or misapplied, can lead to complex inheritance hierarchies.
- I've seen many codebases suffer from premature abstraction in the name of "future extensibility".
- Real-world systems often grow in unexpected ways that don't fit initial OOP designs.

This doesn't mean OOP is inherently flawed - rather, I think it suggests:

1. Not every problem needs an object-oriented solution.
2. Abstractions should be introduced when there's concrete evidence they're needed.
3. Simple and direct code often ages better than complex abstractions.

This exercise demonstrates OOP concepts while acknowledging these practical considerations.
