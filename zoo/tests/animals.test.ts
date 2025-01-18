import { Lion, Elephant, Tiger, Monkey } from "../src/models";

describe("Animal Speak Method", () => {
  describe("Lion", () => {
    const lion = new Lion();
    const sound = lion.getSound();

    test("should intersperse sound between words", () => {
      expect(lion.speak("I'm a lion")).toBe(
        `I'm ${sound} a ${sound} lion ${sound}`
      );
    });

    test("should handle single word", () => {
      expect(lion.speak("Hello")).toBe(`Hello ${sound}`);
    });
  });

  describe("Elephant", () => {
    const elephant = new Elephant();
    const sound = elephant.getSound();

    test("should intersperse sound between words with emoji", () => {
      expect(elephant.speak("I love peanuts")).toBe(
        `🐘 I ${sound} love ${sound} peanuts ${sound}`
      );
    });

    test("should handle single word with emoji", () => {
      expect(elephant.speak("Hello")).toBe(`🐘 Hello ${sound}`);
    });
  });

  describe("Tiger", () => {
    const tiger = new Tiger();
    const sound = tiger.getSound();

    test("should intersperse sound between words", () => {
      expect(tiger.speak("Lions suck")).toBe(`Lions ${sound} suck ${sound}`);
    });

    test("should handle single word", () => {
      expect(tiger.speak("Hello")).toBe(`Hello ${sound}`);
    });
  });

  describe("Monkey", () => {
    const monkey = new Monkey();
    const sound = monkey.getSound();

    test("should intersperse sound between words", () => {
      expect(monkey.speak("I love bananas")).toBe(
        `I ${sound} love ${sound} bananas ${sound}`
      );
    });

    test("should handle single word", () => {
      expect(monkey.speak("Hello")).toBe(`Hello ${sound}`);
    });
  });
});
