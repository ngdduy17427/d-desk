### 1. <ins>What is `Node.js`?</ins>

- Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- Node.js is a JavaScript engine used for executing JavaScript code outside the browser. It is normally used to build the backend of the application and is highly scalable.

### 2. <ins>What are the main `advantages` of Node.js?</ins>

- Node.js is fast and scalable. Node.js is easy to learn and use. Node.js is well-suited for real-time applications, such as chat applications, online games, and streaming services. This is because Node.js can handle a large number of connections and can perform non-blocking I/O operations, which makes it ideal for real-time communication.

### 3. <ins>What are the main `disadvantages` of Node.js?</ins>

- **Single-threaded nature**: May not fully utilize multi-core CPUs, limiting performance.
- **NoSQL preference**: Relational databases like MySQL aren’t commonly used.
- **Rapid API changes**: Frequent updates can introduce instability and compatibility issues.

### 4. <ins>Is Node.js `single-threaded`?</ins>

- Yes, `Node.js is single-threaded` by default. However, it utilizes event-driven architecture and non-blocking I/O operations to handle multiple concurrent requests efficiently, enabling scalability and high performance in applications.

### 5. <ins>What kind of `API function` is supported by Node.js?</ins>

- **Synchronous**: These API functions are used for blocking code.
- **Asynchronous**: These API functions are used for non-blocking code.

### 6. <ins>What is `control flow` function?</ins>

- The control flow function is a piece of code that runs in between several asynchronous function calls.

### 7. <ins>What are `streams` in Node.js?</ins>

- Streams are objects that enable you to read data or write data continuously.
- There are four types of streams:

  - **Readable**: Used for reading operations.
  - **Writable**: Used for write operations.
  - **Duplex**: Used for both reading and write operations.
  - **Transform**: A type of duplex stream where the output is computed based on input.

### 8. <ins>What are the `pros` and `cons` of Node.js?</ins>

| Pros                                                                           | Cons                                                                           |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Fast processing and an event-based model.                                      | Not suitable for heavy computational tasks.                                    |
| Uses JavaScript, which is well-known amongst developers.                       | Using callback is complex since you end up with several nested callbacks.      |
| NPM has over 50,000 packages that provide the functionality to an application. | Dealing with relational databases is not a good option for Node.js.            |
| Best suited for streaming huge amounts of data and I/O intensive operations.   | Since Node.js is single-threaded, CPU intensive tasks are not its strong suit. |

### 9. <ins>What is the difference between `process.nextTick()` and `setImmediate()`?</ins>

- `nextTick()` postpones the execution of action until the next pass around the event loop, or it simply calls the callback function once the event loop's current execution is complete, whereas `setImmediate()` executes a callback on the next cycle of the event loop and returns control to the event loop for any I/O operations.

### 10. <ins>What is the difference between `fork()` and `spawn()`?</ins>

| fork()                                                                                   | spawn()                                                                                                               |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `fork()` is a particular case of `spawn()` that generates a new instance of a V8 engine. | `spawn()` launches a new process with the available set of commands.                                                  |
| Multiple workers run on a single node code base for multiple tasks.                      | This method doesn’t generate a new V8 instance, and only a single copy of the node module is active on the processor. |
