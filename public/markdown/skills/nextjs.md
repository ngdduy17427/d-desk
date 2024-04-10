### 1. <ins>What is Next.js?</ins>

- Next.js is a React framework for building full-stack web applications, which is famous for its unique features such as Server-side rendering and enhanced SEO.
- You use React Components to build user interfaces, and Next.js for additional features and optimizations.

### 2. <ins>Mention some features of Next.js.</ins>

- **Server-Side Rendering (SSR)**: Next.js allows server-side rendering, improving initial page load performance by rendering HTML on the server and sending it to the client.
- **Static Site Generation (SSG)**: Next.js supports static site generation, enabling the pre-rendering of pages at build time, resulting in faster loading times and better SEO.
- **File System-Based Routing**: The routing system is based on the file structure of the `pages` directory, making it intuitive and easy to organize code.
- **Automatic Code Splitting**: Next.js automatically splits code into smaller chunks, loading only what’s necessary for each page. This enhances performance by reducing initial bundle sizes.
- **API Routes**: Easily create serverless functions by defining API routes alongside your pages, simplifying the development of server-side logic.

### 3. <ins>What is `Server-Side Rendering`?</ins>

- `Server-Side Rendering` (SSR) is a technique used in web development where the server processes the React or other JavaScript framework code and generates the HTML on the server side, sending the fully rendered HTML to the client’s browser.
- Here’s a brief overview of the SSR process:

  - **Request from Client**: When a user makes a request to a server for a web page, the server receives the request.
  - **Server-Side Processing**: Instead of sending just a blank HTML shell or a minimal document, the server executes the JavaScript code associated with the requested page, fetches data if needed, and renders the complete HTML content on the server side.
  - **Sending Rendered HTML to Client**: The fully rendered HTML, along with any necessary CSS and JavaScript, is sent as a response to the client’s browser.
  - **Client-Side Hydration**: Once the HTML is received by the browser, any JavaScript code needed for interactive elements or further `Client-Side Rendering` is executed. This process is known as `hydration`.

### 4. <ins>What is `Client-Side Rendering`, and how does it differ from `Server-Side Rendering`?</ins>

- `Client-Side Rendering` (CSR) is the process of rendering a web page on the client's browser using JavaScript after receiving the initial HTML, CSS, and JavaScript from the server.
- The key difference between SSR and CSR is that SSR sends a fully rendered HTML page to the client's browser, while CSR sends an empty HTML page that is populated by JavaScript.

### 5. <ins>What is `Static Site Generation`, and how does it differ from `Server-Side Rendering`?</ins>

- `Static Site Generation` (SSG) is the process of generating a static HTML, CSS, and JavaScript file for each page on your website at build time.
- The key difference between SSG and SSR is that SSG generates a static file that can be served from a content delivery network (CDN), while SSR generates the HTML dynamically on the server and sends it to the client's browser.

### 6. <ins>How do you configure `routing` in a Next.js?</ins>

- Next.js uses `file-system` based router, where folders are used to define routes.
- Each folder represents a route segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.
- A special `page.js` file is used to make route segments publicly accessible.
- For example, to create a page with the URL path `/dashboard`, you would create a folder `dashboard` in the `app` directory and a `page.js` file in that folder.

### 7. <ins>How do you configure `dynamic routes` in a Next.js application?</ins>

- Next.js uses square brackets `[]` to denote dynamic segments in a URL path.
- For example, a blog could include the following route `app/blog/[slug]/page.js` where `[slug]` is the Dynamic Segment for blog posts.

### 8. <ins>How does Next.js handle `client-side navigation`?</ins>

- Next.js uses a `client-side navigation` approach that leverages the HTML5 History API. This enables smooth transitions between pages on the client side without a full page reload.
- Here’s an overview of how Next.js handles `client-side navigation`:

  - **Link Component**: Is a core part of client-side navigation in Next.js. It is used to create links between pages in your application. Using the Link component, when users click the link, Next.js intercepts the navigation event and fetches the necessary resources for the new page without triggering a full page reload.
  - **Programmatic Navigation**: In addition to using the Link component, Next.js provides a `useRouter` hook and a router object to allow for programmatic navigation. This is useful when you want to navigate based on user interactions or in response to certain events.

### 9. <ins>How do you implement `server-side caching` in a Next.js application?</ins>

- Next.js improves your application's performance and reduces costs by caching rendering work and data requests.

| Mechanism           | What                       | Purpose                                         | Duration                        |
| ------------------- | -------------------------- | ----------------------------------------------- | ------------------------------- |
| Request Memoization | Return values of functions | Re-use data in a React Component tree           | Per-request lifecycle           |
| Data Cache          | Data                       | Store data across user requests and deployments | Persistent (can be revalidated) |
| Full Route Cache    | HTML and RSC payload       | Reduce rendering cost and improve performance   | Persistent (can be revalidated) |

- **Request Memoization**: React extends the `fetch` API to automatically memoize requests that have the same URL and options. This means you can call a fetch function for the same data in multiple places in a React component tree while only executing it once. For example:

```tsx
async function getItem() {
  // The `fetch` function is automatically memoized and the result
  // is cached
  const res = await fetch("https://.../item/1");
  return res.json();
}

// This function is called twice, but only executed the first time
const item = await getItem(); // cache MISS

// The second call could be anywhere in your route
const item = await getItem(); // cache HIT
```

- **Data Cache**: Next.js has a built-in Data Cache that **persists** the result of data fetches across incoming **server requests** and **deployments**. This is possible because Next.js extends the native `fetch` API to allow each request on the server to set its own persistent caching semantics. By default, data requests that use `fetch` are **cached**. You can use the `cache` and `next.revalidate` options of fetch to configure the caching behavior.

- **Full Route Cache**: Next.js automatically renders and caches routes at build time. This is an optimization that allows you to serve the cached route instead of rendering on the server for every request, resulting in faster page loads.

### 10. <ins>What is `Image Component` and `Image Optimization` in Next JS?</ins>

- The Next.js Image component, `next/image`, represents a modern evolution of the HTML `<img>` element with built-in performance enhancements tailored for the contemporary web.

  - **Enhanced Performance**: Ensures the delivery of appropriately sized images for each device, utilizing modern image formats.
  - **Visual Stability**: Automatically mitigates Cumulative Layout Shift issues to enhance visual stability.
  - **Expedited Page Loads**: Images are loaded dynamically when they come into the viewport, and optional blur-up placeholders can be employed for faster page rendering.
  - **Asset Flexibility**: Supports on-demand image resizing, even for images stored on remote servers, providing flexibility in handling assets.

### 11. <ins>How does `code splitting` work in Next.js, and why is it important for performance?</ins>

- `Code splitting` in Next.js allows you to split your JavaScript bundles into smaller, more manageable pieces.
- This is essential for improving page load times because it reduces the initial load size.

### 12. <ins>How do you optimize the `performance` of a Next.js application?</ins>

- Optimizing the performance of a Nextjs application involves various strategies such as `code splitting`, `lazy loading`, `image optimization`, `server-side caching`, and `CDN caching`.
- Additionally, leveraging performance monitoring tools like Lighthouse or WebPageTest can help pinpoint areas that require improvement.
