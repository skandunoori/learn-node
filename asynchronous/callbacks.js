let k = [];
let sum = 0;
function someAsyncOperation() {
  setTimeout(function() {
    k = k.concat([1,2,3]);
    k.forEach((item, i) => {
      sum = sum + item;
    });
    console.log(sum);
  }, 0);
};
someAsyncOperation();


