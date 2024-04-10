### 1. <ins>What is `CSS`?</ins>

- CSS stands for Cascading Style Sheet.
- It’s a style sheet language that determines how the elements/contents in the page are looked/shown.
- CSS is used to develop a consistent look and feel for all the pages.

### 2. <ins>Why do we use `CSS`?</ins>

- We use CSS because of the following reasons:

  - **CSS saves time**: You can write CSS once and reuse the same sheet on multiple HTML pages.
  - **Easy Maintenance**: To make a global change simply change the style, and all elements in all the webpages will be updated automatically.
  - **Search Engines**: CSS is considered a clean coding technique, which means search engines won’t have to struggle to “read” its content.
  - **Superior styles to HTML**: CSS has a much wider array of attributes than HTML, so you can give a far better look to your HTML page in comparison to HTML attributes.
  - **Offline Browsing**: CSS can store web applications locally with the help of an offline cache. Using of this we can view offline websites.

### 3. <ins>What are the key differences between `CSS` and `CSS3`?</ins>

- CSS3 is faster than CSS.
- CSS3 can be breakdown into modules.
- CSS3 is the latest version, hence it supports responsive design.
- CSS3 is capable of making the web page more attractive and takes less time to create.
- CSS3 can performs all kinds of animation and transformations as it supports animation and 3D transformations.

### 4. <ins>What is the `syntax` for CSS?</ins>

- A CSS style rule consists of a selector, property, and its value.
- The selector points to the HTML element where CSS style is to be applied. The CSS property is separated by semicolons.

```css
selector {
  property: value;
}
```

### 5. <ins>What are `CSS Selectors`?</ins>

- CSS Selectors are used to selecting HTML elements based on their element name, id, attributes, etc. It can select one or more elements simultaneously.

- **Element selector**: The `element` selector in CSS is used to select HTML elements which are required to be styled. For example:

```css
element_name {
  // CSS Property
}
```

- **ID selector**: The `#id` selector is used to set the style of the given id. The id attribute is the unique identifier in an HTML document. The id selector is used with a `#` character. For example:

```css
#id_name {
    // CSS Property
}
```

- **Class selector**: The `.class` selector is used to select all elements which belong to a particular class attribute. To select the elements with a particular class, use the `.` character with specifying the class name. For example:

```css
.class_name {
  // CSS Property
}
```

### 6. <ins>What is `CSS Box Model`?</ins>

- The CSS box model is a container that contains multiple properties including borders, margin, padding, and the content itself.
- It is used to create the design and layout of web pages. It can be used as a toolkit for customizing the layout of different elements.
- The web browser renders every element as a rectangular box according to the CSS box model.
- Box-Model has multiple properties in CSS. Some of them are given below:

  - **Content Area**: This area consists of content like text, images, or other media content. It is bounded by the content edge and its dimensions are given by content box width and height.
  - **Padding Area**: It includes the element’s padding. This area is actually the space around the content area and within the border box. Its dimensions are given by the width of the padding-box and the height of the padding-box.
  - **Border Area**: It is the area between the box’s padding and margin. Its dimensions are given by the width and height of the border.
  - **Margin Area**: This area consists of space between border and margin. The dimensions of the Margin area are the margin-box width and the margin-box height. It is useful to separate the element from its neighbors.

### 7. <ins>How can we `hide` an element in CSS?</ins>

- The style `display` property is used to hide and show the content of HTML DOM by accessing the DOM element using JavaScript/jQuery. To hide an element, set the style display property to `none`.

```css
display: "none";
/* The element with display: none; does not take up any space */
```

- The `visibility` property is used to hide or show the content of HTML elements. The visibility property specifies that the element is currently visible on the page. The `hidden` value can be used to hide the element.

```css
visibility: "hidden";
/* The hidden element still takes up space */
```

### 8. <ins>What are the `various positioning` properties in CSS?</ins>

- The `position` property in CSS tells about the method of positioning for an element or an HTML entity. There are five different types of position properties available in CSS:

  - `fixed`: Any HTML element with `position: fixed` property will be positioned relative to the viewport. An element with fixed positioning allows it to remain at the same position even as we scroll the page.
  - `static`: This method of positioning is set by default. If we don’t mention the method of positioning for any element, the element has the `position: static` method by default.
  - `relative`: An element with `position: relative` is positioned relatively with the other elements which are sitting at top of it.
  - `absolute`: An element with `position: absolute` will be positioned with respect to its parent. The positioning of this element does not depend upon its siblings or the elements which are at the same level.
  - `sticky`: Element with `position: sticky` and `top: 0` played a role between `fixed` & `relative` based on the position where it is placed. If the element is placed in the middle of the document then when the user scrolls the document, the sticky element starts scrolling until it touches the top.

### 9. <ins>Can we `overlap` elements in CSS?</ins>

- The `z-index` property is used to displace elements on the z-axis i.e in or out of the screen. It is used to define the order of elements if they overlap with each other.

```css
z-index: auto | number | initial | inherit;
```

### 10. <ins>What is CSS `overflow`?</ins>

- The CSS `overflow` controls the big content. It tells whether to clip content or to add scroll bars. The overflow contains the following property:

  - `visible`: The content is not clipped and is visible outside the element box.
  - `hidden`: The overflow is clipped and the rest of the content is invisible.
  - `scroll`: The overflow is clipped but a scrollbar is added to see the rest of the content. The scrollbar can be horizontal or vertical.
  - `auto`: It automatically adds a scrollbar whenever it is required.
  - `overflow-x` and `overflow-y`: This property specifies how to change the overflow of elements. x deals with horizontal edges and y deals with vertical edges.

### 11. <ins>What are `pseudo-elements` in CSS?</ins>

- **Pseudo-element** in CSS is used to add style to specified parts of an element. Example: Using style before or after an element. Below is some examples to describe the use of pseudo-element:

  - `::before`: It is used to add some CSS property before an element when that element is called.
  - `::after`: It is used to add some CSS property after an element when that element is called.
  - `::first-letter`: It is used to make changes to the first letter of an element.
  - `::first-line`: It is used to make changes to the first line of an element.

### 12. <ins>What are `pseudo-classes` in CSS?</ins>

- **Pseudo-classes** in CSS is used to define the special state of an element. It can be combined with a CSS selector to add an effect to existing elements based on their states. For Example, changing the style of an element when the user hovers over it, or when a link is visited. All of these can be done using Pseudo Classes in CSS.

  - `:hover`: This pseudo-class is used to add a special effect to an element when our mouse pointer is over it. The below example demonstrates that when your mouse enters the box area, its background color changes from yellow to orange.
  - `:active`: This pseudo-class is used to select an element that is activated when the user clicks on it. The following example demonstrates that when you click on the box, its background color changes for a moment.
  - `:focus`: This pseudo-class is used to select an element that is currently focussed by the user. It works on user input elements used in forms and is triggered as soon as the user clicks on it. In the following example, the background color of the input field which is currently focused changes.
  - `:visited`: This pseudo-class is used to select the links which have been already visited by the user. In the following example, the color of the link changes once it is visited.
