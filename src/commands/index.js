import { up, cd, ls } from "./navigation.js";
import {
  cat,
  add,
  mkdir_cmd as mkdir,
  rn,
  cp,
  mv,
  rm,
} from "./basic-operations.js";

const commands = {
  up,
  cd,
  ls,
  cat,
  add,
  mkdir,
  rn,
  cp,
  mv,
  rm,
};

export const executeCommand = async (input) => {
  const [command, ...args] = input.split(" ");

  if (!commands[command]) {
    throw new Error("Invalid input");
  }

  try {
    await commands[command](args);
  } catch (error) {
    if (error.message === "Invalid input") {
      throw new Error("Invalid input");
    }
    throw new Error("Operation failed");
  }
};
