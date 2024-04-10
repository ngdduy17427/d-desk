### 1. <ins>What is `HTML`?</ins>

- HTML stands for HyperText Markup Language.
- It is a standard text formatting language used for developing web pages released in 1993.
- HTML is a language that is interpreted by the browser and it tells the browser what to display and how to display.

### 2. <ins>What are the key differences between `HTML` and `HTML5`?</ins>

- HTML5 supports video, graphics, and audio, whereas HTML only supports them through third-party extensions.
- HTML5 is mobile-friendly, whereas HTML is not.
- HTML5 is compatible with all major web browsers, whereas HTML is not.
- HTML5 offers several options for local storage, whereas HTML only offers cookies.
- HTML5 supports multi-threading, whereas HTML operates only in one thread.

### 3. <ins>What are `tags` in HTML5 and how many are required to make a basic web page?</ins>

- Tags are pieces of HTML5 code used to define the structure of the page.
- There are more than 100 tags in HTML5, with each one serving a unique purpose, such as positioning text or supporting audio.
- In their most basic form, most web pages will need around four tags to get started. These are:

```html
<!doctype html>
<html>
  <head>
    <title></title>
  </head>
  <body></body>
</html>
```

### 4. <ins>What are `elements` in HTML5?</ins>

- Elements are components of HTML5 code that instruct the web browser how to structure and interpret the HTML5 document.
- Typically, they encompass an opening tag, a closing tag, and specified content between the opening and closing tags, depending on the type of tag used.

### 5. <ins>What are `void elements` in HTML?</ins>

- HTML elements which do not have closing tags or do not need to be closed are Void elements. For Example:

```html
<br />
<img />
<hr />
```

### 6. <ins>What are `attributes` in HTML5?</ins>

- Attributes are special properties or characteristics used within an element to modify its behavior.
- For example, attributes can be used to specify the dimensions or positioning values of an image.
- Attributes are specified within the opening tag and must be enclosed in quotation marks.

### 7. <ins>What is the `canvas` element in HTML5?</ins>

- The `<canvas>` element is a container that is used to draw graphics on the web page using scripting language like JavaScript.
- It allows for dynamic and scriptable rendering of 2D shapes and bitmap images.
- There are several methods in `canvas` to draw paths, boxes, circles, text and add images. For example:

```html
<canvas id="myCanvas1" width="300" height="100">
  Your browser does not support the HTML5 canvas tag.
</canvas>
```

### 8. <ins>How do you set `language` in HTML?</ins>

- There are multiple ways to set language in HTML

  - By setting content-language in headers for language of the page.
  - By setting accept-language in headers for list of language that a page accept.
  - Setting `lang` attribute in html tag.

- For example:

```html
<!doctype html>
<html lang="en"></html>
```

### 9. <ins>How to create a `nested webpage` in HTML?</ins>

- The HTML `iframe` tag is used to display a nested webpage. In other words, it represents a webpage within a webpage. The HTML `<iframe>` tag defines an inline frame. For example:

```html
<!doctype html>
<html>
  <body>
    <h2>HTML Iframes example</h2>
    <p>Use the height and width attributes to specify the size of the iframe:</p>
    <iframe src="https://www.javatpoint.com/" height="300" width="400"></iframe>
  </body>
</html>
```

### 10. <ins>Explain the `layout` of HTML?</ins>

- HTML layout specifies a way in which the web page is arranged.
- Following are different HTML5 elements which are used to define the different parts of a webpage:

  - `<header>`: It is used to define a header for a document or a section.
  - `<nav>`: It is used to define a container for navigation links.
  - `<section>`: It is used to define a section in a document.
  - `<article>`: It is used to define an independent, self-contained article.
  - `<aside>`: It is used to define content aside from the content (like a sidebar).
  - `<footer>`: It is used to define a footer for a document or a section.

### 11. <ins>Does a `<!DOCTYPE html>` tag is a HTML tag?</ins>

- No, the `<!DOCTYPE html>` declaration is not an HTML tag. There are many type of HTML. For example:

  - HTML 4.01 Strict
  - HTML 4.01 Transitional
  - HTML 4.01 Frameset
  - XHTML 1.0 Strict
  - XHTML 1.0 Transitional
  - XHTML 1.0 Frameset
  - XHTML 1.1

- So, `<!DOCTYPE html>` is used to instruct the web browser about the HTML page.

### 12. <ins>If I do not put `<!DOCTYPE html>` will HTML 5 work?</ins>

- No, the browser will not be able to identify that it is an HTML document and HTML 5 tags do not function properly.
