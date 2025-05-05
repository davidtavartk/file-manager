import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { stat } from 'node:fs/promises';

export const compress = async (args) => {
  const sourcePath = args[0];
  const destinationPath = args[1];
  
  if (!sourcePath || !destinationPath) {
    throw new Error('Invalid input');
  }
  
  try {
    const absoluteSourcePath = path.resolve(process.cwd(), sourcePath);
    const absoluteDestinationPath = path.resolve(process.cwd(), destinationPath);
    
    await stat(absoluteSourcePath);
    
    const readStream = createReadStream(absoluteSourcePath);
    const writeStream = createWriteStream(absoluteDestinationPath);
    const brotliCompress = createBrotliCompress();
    
    await pipeline(readStream, brotliCompress, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const decompress = async (args) => {
  const sourcePath = args[0];
  const destinationPath = args[1];
  
  if (!sourcePath || !destinationPath) {
    throw new Error('Invalid input');
  }
  
  try {
    const absoluteSourcePath = path.resolve(process.cwd(), sourcePath);
    const absoluteDestinationPath = path.resolve(process.cwd(), destinationPath);
    
    await stat(absoluteSourcePath);
    
    const readStream = createReadStream(absoluteSourcePath);
    const writeStream = createWriteStream(absoluteDestinationPath);
    const brotliDecompress = createBrotliDecompress();
    
    await pipeline(readStream, brotliDecompress, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
};