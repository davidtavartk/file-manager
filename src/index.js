import { parseArgs } from "./utils/args.js";
import { homedir } from 'node:os';
import {
  printWelcome,
  printGoodbye,
  printCurrentDirectory,
  printInvalidInput,
} from "./utils/messages.js";
import { executeCommand } from "./commands/index.js";


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

  process.stdin.on("data", async (data) => {
    const input = data.toString().trim();

    if (input === ".exit") {
      printGoodbye(username);
      process.exit(0);
    }

    if (input) {
        try {
          await executeCommand(input);
        } catch (error) {
          if (error.message === 'Invalid input') {
            console.log('Invalid input');
          } else {
            console.log('Operation failed');
          }
        }
      }

    printInvalidInput();
    printCurrentDirectory();
    process.stdout.write('> ');
  });
};

startFileManager();
