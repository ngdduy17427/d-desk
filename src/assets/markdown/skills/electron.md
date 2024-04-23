### 1. <ins>What is `Electron`?</ins>

- Electron is a framework for building desktop applications using JavaScript, HTML, and CSS. By `embedding Chromium` and `Node.js` into its `binary`, it allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

### 2. <ins>What are the main `advantages` of Electron?</ins>

-

### 3. <ins>What are the main `disadvantages` of Electron?</ins>

-

### 4. <ins>What are the different `types of processes` in the Electron?</ins>

- There are two types of processes in the Electron:

  - `Main process`: It is chargeable for interacting with the native graphical consumer interface (GUI) of the working machine. The main process is more behind-the-scenes.
  - `Renderer process`: It is answerable for jogging the personal interface of your application via the usage of HTML files, CSS files, JavaScript files and so on. The renderer process runs in each of the windows in your app.

### 5. <ins>How can you `communicate` between the `main process` and `renderer process` in Electron?</ins>

- `Inter-process communication` (IPC) is used to communicate between the main process and renderer processes. Electron provides modules like 'ipcMain' and 'ipcRenderer' for sending and receiving messages.

### 6. <ins>Explain the Electron app life cycle events.</ins>

- Electron apps have several life cycle events, including `ready`, `window-all-closed`, `before-quit`, `will-quit`, and `quit`. These events help manage the `initialization`, `window creation`, and `quitting processes`.

### 7. <ins>Explain the Electron app life cycle events.</ins>

- Electron apps have several life cycle events, including `ready`, `window-all-closed`, `before-quit`, `will-quit`, and `quit`. These events help manage the `initialization`, `window creation`, and `quitting processes`.

### 8. <ins>How does `notification` is created in Electron?</ins>

- Notification is created by using an npm module called `node-notifier` in Electron.
- It is used to notify users in Windows, Linux and MacOS operating systems. Electron also provides native notifications API only for MacOS.
- The `node-notifier` module can be installed by using the following command.

### 9. <ins>What techniques do you use to `optimize the performance` of an Electron application?</ins>

- `Minimize the number of main process operations`: The main process is the most resource-intensive part of an Electron application, so it's important to minimize the number of operations it performs. This can be done by offloading as much work as possible to the renderer process, such as handling user input, making API calls, and rendering UI elements.
- `Use asynchronous operations`: Asynchronous operations allow the main process to perform multiple tasks at the same time, which can help improve performance. This can be done by using asynchronous APIs such as Promises and async/await.
- `Use web workers`: Web workers are a great way to offload CPU-intensive tasks from the main process. This can help improve performance by allowing the main process to focus on other tasks while the web worker handles the CPU-intensive task.
- `Optimize the application's startup time`: Startup time is an important factor in the performance of an Electron application. This can be done by optimizing the code, minimizing the number of dependencies, and using techniques such as lazy loading.
- `Use caching`: Caching can help improve performance by reducing the amount of data that needs to be retrieved from the server. This can be done by using techniques such as caching API responses and storing data in local storage.
- `Use code splitting`: Code splitting is a great way to improve performance by only loading the code that is needed for a particular page or feature. This can be done by using techniques such as dynamic imports and route-based code splitting.

### 10. <ins>What do you know about `Packaging Apps`?</ins>

- Packaging is an Electron app, refers to creating a desktop installer. Packaging and distributing apps is a crucial part of the improvement system.
- These can be accomplished by way of the usage of:

  - [Electron Forge](https://www.electronforge.io/).
  - [Electron Builder](https://www.electron.build/).

### 11. <ins>Is the Electron `secure to use`?</ins>

- Electron applications are web applications run in the Chromium engine so, they may be vulnerable to web-related attacks such as cross-site scripting attacks, through the same attack vectors as a browser (e.g., Chromium) or other internal components (Node.js) if you use the older versions of Electron. These vulnerabilities have been fixed in the latest Electron releases.

### 12. <ins>How Chromium and Node.js are used in Electron?</ins>

- **Chromium**: Is a Web kit developed and maintained by Google. It is an internet browser with a V8 JavaScript engine which aids all of the browser and DOM APIs. It is good for making web pages.
- **Node.js**: Keep backend code JavaScript state break away frontend utility windows kingdom.
