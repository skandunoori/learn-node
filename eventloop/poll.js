const fs = require('fs');

function someAsyncOperation() {
  fs.readFile('/Users/Sanjana/Documents/From_Windows_Data/SEM-6/FSE/node/learn-node/data/test.txt', function(err, data) {
    if (err) console.log('Read Error');
    else console.log('Data: ' + data);
  });
}

function foo() {
  console.log('foo');
}

someAsyncOperation();
foo();
console.log('done');
