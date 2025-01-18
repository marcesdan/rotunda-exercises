import { Animal, Lion, Tiger, Elephant, Monkey } from "./models";

const lion = new Lion();
const tiger = new Tiger();
const monkey = new Monkey();
const elephant = new Elephant();

const animals: Animal[] = [lion, tiger, monkey, elephant];

const message = "Hello from the zoo";

animals.forEach((animal: Animal) => {
  console.log(animal.speak(message));
});
