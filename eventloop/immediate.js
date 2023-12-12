const fs = require('fs');

fs.readFile('/Users/Sanjana/Documents/From_Windows_Data/SEM-6/FSE/node/learn-node/data/test.txt', function(err, data) {
  const startCallback = Date.now();
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
  if (err) console.log('Error');
  else console.log(data);

  const timeoutScheduled = Date.now();
  setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;

    console.log(`${delay}ms have passed since I was scheduled`);
  }, 5);
});

process.nextTick(() => {
  console.log('I was scheduled to run immediately');
});

