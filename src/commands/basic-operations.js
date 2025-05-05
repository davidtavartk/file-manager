import fs from 'node:fs';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, unlink, rename, stat } from 'node:fs/promises';
import path from 'node:path';

export const cat = async (args) => {
    const filePath = args[0];
    
    if (!filePath) {
      throw new Error('Invalid input');
    }
    
    try {
      const absolutePath = path.resolve(process.cwd(), filePath);

      const fileStats = await stat(absolutePath);
      if (!fileStats.isFile()) {
        throw new Error('Not a file');
      }
      
      const readStream = createReadStream(absolutePath, { encoding: 'utf8' });
      
      await new Promise((resolve, reject) => {
        readStream.on('error', () => {
          reject(new Error('Operation failed'));
        });
        
        readStream.pipe(process.stdout);
        
        readStream.on('end', () => {
          resolve();
        });
      });
    } catch (error) {
      throw new Error('Operation failed');
    }
  };

export const add = async (args) => {
  const fileName = args[0];
  
  if (!fileName) {
    throw new Error('Invalid input');
  }
  
  try {
    const filePath = path.resolve(process.cwd(), fileName);
    
    fs.writeFileSync(filePath, '');
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const mkdir_cmd = async (args) => {
  const dirName = args[0];
  
  if (!dirName) {
    throw new Error('Invalid input');
  }
  
  try {
    const dirPath = path.resolve(process.cwd(), dirName);
    
    await mkdir(dirPath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const rn = async (args) => {
  const oldPath = args[0];
  const newFileName = args[1];
  
  if (!oldPath || !newFileName) {
    throw new Error('Invalid input');
  }
  
  try {
    const oldFilePath = path.resolve(process.cwd(), oldPath);
    const newFilePath = path.resolve(path.dirname(oldFilePath), newFileName);
    
    await rename(oldFilePath, newFilePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const cp = async (args) => {
  const filePath = args[0];
  const destinationPath = args[1];
  
  if (!filePath || !destinationPath) {
    throw new Error('Invalid input');
  }
  
  try {
    const sourceFilePath = path.resolve(process.cwd(), filePath);
    let destFilePath = path.resolve(process.cwd(), destinationPath);
    
    const sourceStat = await stat(sourceFilePath);
    
    try {
      const destStat = await stat(destFilePath);
      if (destStat.isDirectory()) {
        destFilePath = path.join(destFilePath, path.basename(sourceFilePath));
      }
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    
    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destFilePath);
    
    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });
  } catch (error) {
    throw new Error('Operation failed');
  }
};
 
export const mv = async (args) => {
  const filePath = args[0];
  const destinationPath = args[1];
  
  if (!filePath || !destinationPath) {
    throw new Error('Invalid input');
  }
  
  try {
    await cp([filePath, destinationPath]);
    
    const sourceFilePath = path.resolve(process.cwd(), filePath);
    await unlink(sourceFilePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const rm = async (args) => {
  const filePath = args[0];
  
  if (!filePath) {
    throw new Error('Invalid input');
  }
  
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);

    await unlink(absolutePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};