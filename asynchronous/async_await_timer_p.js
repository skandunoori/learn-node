function foo() {
  new Promise((resolve) =>
    setTimeout(() => resolve("1")),
  ).then(res => {
    console.log(res);
    new Promise((resolve) =>
      setTimeout(() => resolve("2")),
    ).then(res => console.log(res));
  });
}

async function foo() {
 const res = await new Promise(
  (resolve) => setTimeout(resolve("1")
 ))
 console.log(res);
 const res1 = await new Promise(
  (resolve) => setTimeout(resolve("2")
 ))
 console.log(res1);
}
foo();
