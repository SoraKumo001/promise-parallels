# @node-libraries/promise-limit

[![](https://img.shields.io/npm/l/@node-libraries/promise-limit)](https://www.npmjs.com/package/@node-libraries/promise-limit)
[![](https://img.shields.io/npm/v/@node-libraries/promise-limit)](https://www.npmjs.com/package/@node-libraries/promise-limit)
[![](https://img.shields.io/npm/dw/@node-libraries/promise-limit)](https://www.npmjs.com/package/@node-libraries/promise-limit)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/SoraKumo001/promise-parallels)

Limits the maximum number of asynchronous processes that can be executed.  
The number of executions is controlled at the loop stage, so no memory is wasted in the queue.

## usage

- `promiseLimit()` to create an instance
- `add()` to store Promise
- `wait()` waits for a specified maximum number
- `all()` waits for remaining processes

```ts
import { promiseLimit } from '@node-libraries/promise-limit';
const main = async () => {
  const ps = promiseLimit();
  for (let i = 0; i < 10; i++) {
    // Execute a random exit process and save the Promise
    ps.add(new Promise((resolve) => setTimeout(() => resolve(i), Math.random() * 100)));
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
```

## Execution result

```sh
0:false
1:false
2:false
3:false
4:3
5:1
6:2
7:4
8:0
9:6
*:5
*:7
*:8
*:9
```
