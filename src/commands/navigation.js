import path from 'node:path';
import { readdir } from 'node:fs/promises';

export const up = async () => {
  const currentDir = process.cwd();
  const parentDir = path.resolve(currentDir, '..');
  
  // Check if we're already at the root
  if (currentDir !== path.parse(currentDir).root) {
    process.chdir(parentDir);
  }
};

export const cd = async (args) => {
  const targetPath = args[0];
  
  if (!targetPath) {
    throw new Error('Path is required');
  }

  try {
    const newPath = path.resolve(process.cwd(), targetPath);
    process.chdir(newPath);
  } catch (error) {
    throw new Error('Invalid path');
  }
};

export const ls = async () => {
  const currentDir = process.cwd();
  
  try {
    const items = await readdir(currentDir, { withFileTypes: true });
    
    const directories = items.filter(item => item.isDirectory());
    const files = items.filter(item => item.isFile());
    
    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));
    
    const allItems = [...directories, ...files];
    
    console.log("(index)          Name                    Type");
    console.log("---------------------------------------------------");
    
    allItems.forEach((item, index) => {
      const indexStr = String(index).padEnd(15);
      const nameStr = `'${item.name}'`.padEnd(24);
      const typeStr = item.isDirectory() ? "'directory'" : "'file'";
      
      console.log(`${indexStr}${nameStr}${typeStr}`);
    });
  } catch (error) {
    throw new Error('Operation failed');
  }
};