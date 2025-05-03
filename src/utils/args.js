const parseArgs = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) {
    console.error("Error: Username is required. Use --username=your_username");
    process.exit(1);
  }

  const username = usernameArg.split("=")[1];

  if (!username) {
    console.error("Error: Username cannot be empty");
    process.exit(1);
  }

  return { username };
};

export { parseArgs };
