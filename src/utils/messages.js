export const printWelcome = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const printGoodbye = (username) => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
};

export const printInvalidInput = () => {
  console.log("Invalid input");
};

export const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const printOperationFailed = () => {
  console.log("Operation failed");
};
