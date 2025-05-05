import os from 'node:os';

export const os_info = async (args) => {
  const flag = args[0];
  
  if (!flag) {
    throw new Error('Invalid input');
  }
  
  try {
    switch (flag) {
      case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;
        
      case '--cpus':
        const cpus = os.cpus();
        console.log(`Overall amount of CPUs: ${cpus.length}`);
        
        cpus.forEach((cpu, index) => {
          const clockRateGHz = cpu.speed / 1000;
          console.log(`CPU ${index + 1}: ${cpu.model}, Clock Rate: ${clockRateGHz.toFixed(2)} GHz`);
        });
        break;
        
      case '--homedir':
        console.log(os.homedir());
        break;
        
      case '--username':
        console.log(os.userInfo().username);
        break;
        
      case '--architecture':
        console.log(os.arch());
        break;
        
      default:
        throw new Error('Invalid input');
    }
  } catch (error) {
    throw new Error('Operation failed');
  }
};