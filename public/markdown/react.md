### 1. What is `React`?

- React is a JavaScript library created by Facebook
- React is a User Interface (UI) library
- React is a tool for building UI components

### 2. What is `Virtual DOM` in React?

- **Virtual DOM** is a lightweight copy of the actual DOM. So for every object that exists in the original DOM, there is an object for that in React Virtual DOM. It is exactly the same, but it does not have the power to directly change the layout of the document.
- **Manipulating DOM is slow, but manipulating Virtual DOM is fast** as nothing gets drawn on the screen. So each time there is a change in the state of our application, the virtual DOM gets updated first instead of the real DOM.

### 3. What is `JSX`?

- JSX is stands for JavaScript XML, is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.
- JSX makes it easier to write and understand React components by combining the power of JavaScript with the familiarity of HTML syntax.
- Here are some key points about JSX:

```jsx
const element = <h1>Hello, world!</h1>;
```

```jsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;
```

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="John" />;
```

### 4. What are the key differences between `Props` and `State` in React?

| Props                                                                                                      | State                                                                                                     |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Immutable data that are passed from parent components to child components.                                 | The internal state of a component and is used for data that can change over time.                         |
| It is Immutable (cannot be modified directly).                                                             | It is Mutable (can be modified).                                                                          |
| Used for configuring a component when it is created and remain fixed throughout the component's lifecycle. | Changes to state trigger re-renders of the component, allowing it to reflect the updated state in the UI. |
| Props are read-only.                                                                                       | The state is both read and write.                                                                         |

### 5. What is `context` API?

- The Context API is a feature in React, a popular JavaScript library for building user interfaces, that allows you to manage state at a global level in your application without having to pass props down through every level of the component tree.

### 6. What is the use of `ref` in React?

- The `ref` attribute is used to reference a particular instance of a React component or DOM element created in the render method. It provides a way to access and interact with the underlying DOM nodes or React components directly.
- Here are some common use cases for `refs` in React:

  - **Accessing DOM elements**: You can use refs to reference and manipulate DOM elements directly. This is useful when you need to focus an input field, measure its dimensions, or trigger imperative animations.
  - **Managing focus, text selection, or media playback**: Refs can be used to manage focus within a component, select text programmatically, or control media playback (e.g., playing/pausing a video).
  - **Integrating with third-party libraries**: When integrating with third-party libraries that require direct access to DOM elements, refs provide a way to pass references to those elements.
  - **Triggering imperative animations**: Refs can be used to trigger imperative animations with libraries like GSAP or directly manipulating CSS properties.
  - **Accessing child components**: Refs can also be used to access methods or properties of child components directly, although this should generally be avoided in favor of passing down props.

```jsx
import React, { useRef, useEffect } from "react";

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus the input</button>
    </div>
  );
}

export default TextInputWithFocusButton;
```

### 7. What is a `key` in React?

- The `key` attribute is a special keyword you need to include when creating arrays of elements, typically when rendering lists of items. The main purpose of keys is to help React identify which items have changed, are added, or are removed from a list.
- Here are a few key points about keys in React:

  - **Uniqueness**: Keys should be unique among siblings in the same list. React uses keys to identify which items have changed, been added, or been removed. If keys are not unique or are not provided, React may not be able to efficiently update the DOM.
  - **Stability**: Keys should be stable and not change over time, especially between renders. If keys change frequently, React might unnecessarily recreate DOM elements, leading to performance issues or incorrect behavior.
  - **Performance**: Keys help React identify which items have changed, allowing it to update the DOM more efficiently by reusing existing DOM elements whenever possible rather than recreating them from scratch.
  - **Reconciliation**: React uses keys as hints to optimize the reconciliation process, which is the process of comparing the previous and current states of a component's UI and determining the minimal set of changes needed to update the DOM.

```jsx
function MyList() {
  const items = ["Apple", "Banana", "Orange"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

### 8. What is `one-way data binding` in React?

- One-way data binding in React refers to the flow of data from a parent component to a child component.
- In this model, data flows down the component hierarchy, meaning that changes to the data in the parent component will be passed down to the child components, but changes in the child components won't affect the parent or other siblings directly.
- Here's a basic example to illustrate one-way data binding in React:

```jsx
// ParentComponent.js
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent count={count} onIncrement={incrementCount} />
    </div>
  );
}

export default ParentComponent;
```

```jsx
// ChildComponent.js
import React from "react";

function ChildComponent({ count, onIncrement }) {
  return (
    <div>
      <button onClick={onIncrement}>Increment Count</button>
      <p>Received Count from Parent: {count}</p>
    </div>
  );
}

export default ChildComponent;
```

### 9. What are `hooks` in React?

- `hooks` are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8 as a way to use stateful logic without writing a class component.
- Some of the most commonly used hooks are:

  - `useState`: Allows functional components to manage state.
  - `useEffect`: Allows performing side effects in functional components (similar to componentDidMount, componentDidUpdate, componentWillUnmount in class components).
  - `useContext`: Allows functional components to consume context.
  - `useReducer`: An alternative to useState. It is usually preferable when the state logic is complex and involves multiple sub-values or when the next state depends on the previous one.
  - `useCallback`: Memoizes functions to prevent unnecessary re-renders in child components.
  - `useMemo`: Memoizes the result of a function to prevent expensive calculations on every render.
  - `useRef`: Allows functional components to create mutable references.
  - `useImperativeHandle`: Customizes the instance value that is exposed by a ref.

### 10. What is useEffect's `dependencies` argument in React?

- `dependencies` is an array of values that the effect depends on.
- If one of these values changes between renders, React will re-run the effect. If the values have not changed, React will skip the effect.
- Here's a basic example:

```jsx
import React, { useState, useEffect } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This will run after every render
    document.title = `You clicked ${count} times`;

    // Cleanup function
    return () => {
      document.title = "React App"; // Reset the title when component unmounts
    };
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### 11. What is `Fragment` in React?

- `Fragment` is a built-in component that allows you to group multiple children without adding extra nodes to the DOM.
- It's useful when you need to return multiple elements from a component's render method but don't want to add an additional wrapping element to the DOM.
- Here's two examples:

```jsx
import React from "react";

function MyComponent() {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>This is a paragraph</p>
    </React.Fragment>
  );
}
```

```jsx
import React from "react";

function MyComponent() {
  return (
    <>
      <h1>Hello</h1>
      <p>This is a paragraph</p>
    </>
  );
}
```

### 12. What is `Higher-Order Component` in React?

- A Higher-Order Component (HOC) in React is a pattern used for reusing component logic.
- It's a function that takes a component and returns a new component with some enhanced functionality.
- HOCs are commonly used for cross-cutting concerns like data fetching, authentication, or styling.
- Here's a simple example of a Higher-Order Component (HOC) that applies some basic styling to a component:

```jsx
import React from "react";

// Higher-Order Component for styling
const withStyle = (WrappedComponent) => {
  // Define the style object
  const style = {
    border: "2px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
  };

  // Return a new component with the added style
  return (props) => <WrappedComponent {...props} style={style} />;
};

// Component to be styled
const MyComponent = ({ message }) => <div>{message}</div>;

// Wrap the component with the HOC
const StyledComponent = withStyle(MyComponent);

export default StyledComponent;
```
