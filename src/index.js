import { parseArgs } from "./utils/args.js";
import { homedir } from 'node:os';
import {
  printWelcome,
  printGoodbye,
  printCurrentDirectory,
  printInvalidInput,
} from "./utils/messages.js";


const startFileManager = () => {
  const { username } = parseArgs();

  process.chdir(homedir());
  printWelcome(username);
  printCurrentDirectory();

  process.stdout.write('> ');

  process.on("SIGINT", () => {
    printGoodbye(username);
    process.exit(0);
  });

  process.stdin.on("data", (data) => {
    const input = data.toString().trim();

    if (input === ".exit") {
      printGoodbye(username);
      process.exit(0);
    }

    printInvalidInput();
    printCurrentDirectory();
    process.stdout.write('> ');
  });
};

startFileManager();
