import { Animal } from "./Animal";

export class Elephant extends Animal {
  protected readonly SOUND = "pawoo";

  speak(inputPhrase: string): string {
    const baseSpeak = super.speak(inputPhrase);
    return `🐘 ${baseSpeak}`;
  }
}
