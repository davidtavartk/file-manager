import path from 'node:path';

export const isAboveRoot = (currentPath, newPath) => {
  const absolutePath = path.resolve(currentPath, newPath);
  
  const root = path.parse(absolutePath).root;
  
  if (absolutePath === root) {
    return false;
  }
  
  try {
    const relative = path.relative(root, absolutePath);
    return relative.startsWith('..');
  } catch {
    return true;
  }
};

export const canNavigate = (currentPath, targetPath) => {
  const absoluteTarget = path.resolve(currentPath, targetPath);
  return !isAboveRoot(currentPath, targetPath);
};