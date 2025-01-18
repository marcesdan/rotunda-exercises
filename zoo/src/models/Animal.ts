export abstract class Animal {
  protected abstract readonly SOUND: string;

  getSound(): string {
    return this.SOUND;
  }

  speak(inputPhrase: string): string {
    const words = inputPhrase.split(" ");
    return words.join(` ${this.SOUND} `) + ` ${this.SOUND}`;
  }
}
