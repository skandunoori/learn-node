# Basics

Node.js has several libraries (i.e. packages) we can use for development. In order to utilize installed libraries we use import or require a module in our code. For example:
    
    const http = require('http')

Once you have node installed, you can run your Javascript code from the terminal using commands. As mentioned earlier we can install libraries for development purposes. As an example, consider the following Node script.
As an example, consider a basic web server 'basics/helloserver.js'.

**For you to do**:

1. Run the server ($ node basics/helloserver.js)

2. Scripts can be explicitly told to execute with Node by adding a shebang at the beginning of a script file. We can add a shebang which contains the path to node (e.g. #! /path/where/node_is_installed). 
Edit helloserver.js by adding the shebang at the top of the script and run it as /path/to/helloserver.js. 

3. When you make changes to your code, you will have to restart the program. Make a change to your web server and see if it gets reflected without restarting the server.

4. Having to restart your program for every change you make can be annoying, especially for server scripts. So, to address this issue we can install the nodemon module with the following command:

    `$ npm i -g nodemon`

    This will install nodemon globally which will give you access to the command nodemon. As a general rule, avoid doing global install of npm packages if you do not require a module across different applications. The nodemon package will be used for every node application you develop, so it makes sense here. 

5. Once nodemon is installed, run the server using the command shown below. Make changes and verify the changes are reflected.

    `$ nodemon /path/to/helloserver.js`

**Useful Node JS Objects**

The process module is useful for reading arguments passed to a script from the command line. Arguments are stored in an array called process.argv. process.argv[0] and process.argv[1] is the path to node.js and the script respectively.
Answer the following questions based on "basics/foo.js":

1. Run foo.js with the following command line argument and record the output.

    `$ node foo.js hello 'I am' "an argument"`

Output: 
/opt/homebrew/Cellar/node/21.2.0/bin/node
/Users/Sanjana/Documents/From_Windows_Data/SEM-6/FSE/node/learn-node/basics/foo.js
hello
I am

2. Modify "basics/foo.js" such that all arguments except the Node path and the script path are logged.
const args = process.argv.slice(2);
O/P: 
hello
I am
an argument
# Block and Non Blocking Operations

The NodeJS standard library has several operations that are called blocking operations. A blocking operation does allow execution to proceed unless the operation has finished. Examples of blocking operations are I/O operations, database connection operations, etc. Since Node JS has an event loop that runs on a single thread, running blocking operations that take time to finish degrades throughput of the server. Therefore, the standard library also has non-blocking versions of these operations. Based on the problem at hand, one may choose to use a blocking or non-blocking operation. 

**For you to do**:

1. Explore the code in "operations/blocking.js" and "operations/nonblocking.js". For which code will the function moreWork() get executed. Why?
The moreWork() will be executed in the nonblocking.js file, as the event loop offloads file reading to the Thread pool, until it finishes reading, the moreWork() is provided to main thread for execution. Once the callback is available in the I/O phase queue of event loop, once the main thread is done with all execution, it offloads the callback in the I/O queue to execute.

One must be careful when writing concurrent scripts in Node.js. If actions performed in later stages are related to actions related in previous stages or vice-versa then the program will be in an error state. 
For example, consider the code in "operations/syncdelete.js".

**For you to do**:

1. Identify and fix the runtime error in "operations/syncdelete.js".

# Event Loop

When *setTimeout(callback, ms)* invoked, Node puts a *callback* in the timer phase's queue. The Node runtime executes it after a threshold time as specified in the *ms* argument.

**For you to do**:

1. In "eventloop/timer.js", what will be the order of execution?
foo
baz
foo
baz
2 : bar
1 : bar

2. How many callbacks will the timers phase queue have after the script is run? 
2 callbacks 

All I/O operations (e.g., read a file) run in the poll phase. The poll phase performs an I/O operation and puts all callbacks associated with the I/O operation in its queue. When the I/O operation completes, it executes the callbacks in the queue. 

**For you to do**:
1. In "eventloop/poll.js", which phase of the event loop will contain callback functions? What will they be?
Poll Phase contains callback from reading file.It contains data of the file.
2. What will be the execution order?
output:
foo
done
data of file

The poll phase is actually a blocking phase. If the callback queue associated with it is empty, it blocks the event loop till the earliest scheduled callback in the timers queue.

**For you to do**:
1. Run the script "eventloop/poll_timer.js". Explain the order of execution in terms of the messages you see in the console.
Output:
someAsyncOperation
101ms have passed since I was scheduled
The setTimeout is offloaded to the thread poll by event loop for 100ms. 
Meanwhile, the someAsyncOperation is called, which is also offloaded to the thread pool to read file. Once its done, it waits for 10 seconds to be executed.Once the callbacks in the poll phase are executed, the timer phase callbacks are executed. Hence, the order.
2. Change "Date.now() - startCallback < 10" in line 21 to "Date.now() - startCallback < 150". Will the order of execution change?
No, the order of execution will not change, as the poll phase waits for the events to complete and callbacks to execute before proceeding to timer phase.
3. Set timeout to 0. Will the order of execution change?

**For you to do**:
1. Run the script in "eventloop/immediate.js". What order of execution do you see in terms of the messages being logged.
Output:
File data
I was scheduled to run immediately
6ms have passed since I was scheduled
2. Change the script such that the immediate callback runs first.

The *process.nextTick()* API allows us to schedule tasks before the event loop.

**For you to do**:
1. Run the script "eventloop/tick_immediate.js". Explain the order of execution in terms of the messages logged.
Output:
main = 0
nextTick = 1
Run Immediately = 1
2. Run the script "eventloop/tick_immediate.js". Why doesn't setTimeout get executed? 
Because the nextTick is in a loop. Since the process.nextTick callbacks have higher priority than timers like setTimeout, the event loop will keep executing the process.nextTick(cb) callbacks and will never get to the setTimeout callback.
3. How does the output change if we replace process.nexTick(cb) with setImmediate(cb)?
the setTimeout callback is executed, as the setImmediate() is executed first.
4. Why does the script "eventloop/eventemit.js" not log the event message? Change it such that the event message gets logged.
It is because the emit is called even before attaching the listener to it. Moving this outside class after attaching the listener, emits the event message.


## Asynchronous Programming

The script in "asynchronous/callback.js" enables asynchronous behavior by scheduling a callback using the timer phase.
The script logs 0.

**For you to do**:

1. Change the script such that logs the sum of the elements in the list concatenated list.
2. Does the code look unweildy to you?
Since the calculation of sum is in the main thread, it gets executed before the timers phase callback get's executed. Because k is an empty array, the sum is shown as 0. On moving this sum functionality, to the timer phase, provides us with the sum 6.

### Promise

**For you to do**:

1. Run the script in "asynchronous/promise.js". Explain the order of execution based on the logged messages.
do more stuff
in main
processing ... 
Kim
2. Change the value of i to 12. How does it change the promise's execution?
found bad index
in main
processing ... 
Bad index rejected
3. Run the script in "asynchronous/promise1.js". Explain the order of execution based on the logged messages.
do more stuff
in main
processing ... 
Kim
Read Error
4. Do promises run before or after process.nextTick()?
after
5. Run the script in "asynchronous/promise2.js". Explain the order of execution based on the logged messages.
doing other things ...
in timer phase
6
6. Discuss the implications of running a computationally expensive task in a promise.

Read more about Promises [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#common_mistakes).

### Async and Await

**For you to do**:
1. The code in "asynchronous/asyncawait_timer.js" is quite hard to read. Rewrite it using async/await.
2. Explore the difference between sequentialStart, concurrentStart, concurrentPromise, and parallel in "asynchronous/concurrency.js".


# Further Reading:
-	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#async_functions_and_execution_order
-	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function
-	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
-	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
