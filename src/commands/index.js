import { up, cd, ls } from './navigation.js';

const commands = {
  up,
  cd,
  ls,
};

export const executeCommand = async (input) => {
  const [command, ...args] = input.split(' ');
  
  if (!commands[command]) {
    throw new Error('Invalid input');
  }
  
  try {
    await commands[command](args);
  } catch (error) {
    if (error.message === 'Invalid input' || error.message === 'Path is required' || error.message === 'Invalid path') {
      throw new Error('Invalid input');
    }
    throw new Error('Operation failed');
  }
};