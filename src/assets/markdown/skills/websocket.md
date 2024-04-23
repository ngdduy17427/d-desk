### 1. <ins>What is `WebSocket`?</ins>

- **WebSocket** is bidirectional, a full-duplex protocol that is used in the same scenario of client-server communication.
- It is a stateful protocol, which means the connection between client and server will keep alive until it is terminated by either party (client or server).

### 2. <ins>What are the main `advantages` of WebSocket?</ins>

-

### 3. <ins>What are the main `disadvantages` of WebSocket?</ins>

-

### 4. <ins>Why use `WebSocket` over `HTTP`?</ins>

- Data can be sent from server to client at any time, without the client even requesting it. This is often called server-push and is very valuable for applications where the client needs to know fairly quickly when something happens on the server (like a new chat messages has been received or a new price has been udpated). A client cannot be pushed data over http. The client would have to regularly poll by making an http request every few seconds in order to get timely new data. Client polling is not efficient.
- Data can be sent either way very efficiently. Because the connection is already established and a webSocket data frame is very efficiently organized, one can send data a lot more efficiently that via an HTTP request that necessarily contains headers, cookies, etc...

### 5. <ins>What are some common `use cases` for WebSockets?</ins>

- WebSockets fills several communication gaps experienced in traditional web environments, enhancing real-time interactivity.

  - **Chat Applications**: Delivers real-time messaging with reduced server overhead. Particularly useful in group chats and when delivering notifications.
  - **Gaming**: Supports real-time, multiplayer game interactions such as moves, chats, and scores.
  - **Interactive Dashboard**: Provides seamless live updates for data visualization and reporting, useful for financial, IoT, and analytics platforms.
  - **Live Customer Support**: Ensures instant direct interaction between customer support representatives and users.
  - **Collaborative Tools**: Facilitates real-time teamwork in productivity apps, such as Google Docs for simultaneous editing or Whimsical for shared whiteboards.
  - **Real-Time Editors**: Enables shared editing of text, code, and media in real time, like Google Docs and CodeSandbox.
  - **Interactive Maps**: Offers responsive real-time map updates, essential for GPS and logistics apps.
  - **Stock Market Tracker**: Displays live stock data, fluctuating prices, company news, and more, vital for traders and financial analysts.
  - **Real-Time Communication**: Powers features like VoIP, video conferencing, and screen sharing in communication apps like Slack and Zoom.
