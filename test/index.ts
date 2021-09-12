import { promiseLimit } from '../src';
const main = async () => {
  const ps = promiseLimit();
  for (let i = 0; i < 10; i++) {
    // Execute a random exit process and save the Promise
    ps.add(new Promise((resolve) => setTimeout(() => resolve(i), Math.random() * 1000)));
    // Specify the maximum number of parallel execution and wait
    // Return value false: the process has not finished within the limit
    // Return index of the process returned by resolve
    const v = await ps.wait(5);
    console.log(`${i}:${v}`); // Number of loops: display the finished function
  }
  // wait for remaining processing if the loop exits with less than 5 in parallel
  (await ps.all()).forEach((v) => console.log(`*:${v}`));
};

main();
