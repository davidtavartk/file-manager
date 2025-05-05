import crypto from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { stat } from 'node:fs/promises';

export const hash = async (args) => {
  const filePath = args[0];
  
  if (!filePath) {
    throw new Error('Invalid input');
  }
  
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    
    await stat(absolutePath);
    
    const hash = crypto.createHash('sha256');
    const stream = createReadStream(absolutePath);
    
    const fileHash = await new Promise((resolve, reject) => {
      stream.on('data', (data) => {
        hash.update(data);
      });
      
      stream.on('end', () => {
        resolve(hash.digest('hex'));
      });
      
      stream.on('error', (error) => {
        reject(error);
      });
    });
    
    console.log(fileHash);
  } catch (error) {
    throw new Error('Operation failed');
  }
};