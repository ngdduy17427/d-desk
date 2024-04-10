### 1. <ins>What is `TypeScript`?</ins>

- TypeScript is a `superset` of JavaScript that compiles to plain JavaScript.
- TypeScript is an `object-oriented` and `statically` typed language.

### 2. <ins>What are the `advantages` of using TypeScript?</ins>

- There are a lot of advantages of using TypeScript, some of them are listed below:

  - The TypeScript code can compile down to the JavaScript code that is runnable on every browser.
  - It allow us to declare strongly or statically typed variables.
  - It consist of advanced features like code completion, intelliSense etc.
  - It supports namespace concept with the help of modules.
  - TypeScript throw errors at the compilation time during development unlike of JavaScript that shows errors at the runtime.

### 3. <ins>List some `disadvantages` of using TypeScript.</ins>

- There also exist some disadvantages of using TypeScript as listed below:

  - The concept of abstract classes is not supported by TypeScript.
  - Code Compilation is a time taking process in TypeScript.
  - A extra step of converting the TypeScript code into JavaScript code requires while running TypeScript.
  - A definition file needs to be added for using any external or third party library. All the external libraries not have the definition file.
  - The quality of all the definition files need to be correct.

### 4. <ins>How you can `declare a explicit variables` in Typescript?</ins>

- You can declare static variables using the colons `:` followed by the `data type` of the explicit type. You can not assign a value of some other `data type` to a static variable. The values of the same `data type` can be assigned.

```ts
let variable_name: data-type = value;
```

- For example:

```ts
let myName: string = "Joe";
myName = "Duy Nguyen";
console.log(myName); // Prints Duy Nguyen

myName = 28;
console.log(myName);
// Throws an error: Type '28' is not assignable to type 'string'.
```

### 5. <ins>Explain the `data types` available in TypeScript.</ins>

- There are mainly two types of data types available in TypeScript:

- **Built-in data types**: These data types already exist in typescript. They can be directly used to define the variables with different values.

  - `string`: It represents a text value like "JavaScript", or "TypeScript".
  - `number`: It represents the numbered values i.e. 2, 28, 99, etc.
  - `boolean`: It stores true or false values.
  - `null`: An empty value deliberately assigned to a variable.
  - `undefined`: Represents a variable that is declared but not initialized.
  - `any`: Represents any value of any data type and any number of values of different data types.
  - `void`: Used to represent that a particular function is not going to return any value of any data type.
  - `never`: Used when you are sure that something is never going to occur.

- **User-defined data types**: These are the data types that are defined by the user they may contain multiple values of multiple data types.

  - `arrays`: In typescript, arrays are used to store the multiple values of any kind of data type.
  - `enums`: A special class that specifies the constant variables.
  - `classes`: Used to store different data type values in the form of key-value pairs.
  - `interface`: These represent the basic syntax and blueprint that an entity must adhere to.

### 6. <ins>What is `never` type and its uses in TypeScript?</ins>

- A `never` type in typescript is indicate the values that may never be occured. It is mainly used with the function that return nothing and always thrown an exception or error.
- A `never` type is different from `void` type. Because, a function that returns nothing implicitly returns undefined and these functions are inferred using the `void` keyword. But a function that declared using the `never` keyword will never return a undefined it only returns `never` type.
- The `never` type can be used with following cases:

  - With an infinite loop.
  - In a function that throws exceptions or errors.

```ts
function neverFunc(): never {
  // Function Statements
}
```

### 7. <ins>Explain the working of `enums` in TypeScript?</ins>

- An `enum` in typescript is used to create a collection of constants.
- It is basically a class that allow us to create multiple constants of `numeric` as well as `string` type.
- By default, the value of numeric constant starts from `0` and increases accordingly for every constant by a margin of `1`.
- You can also change the initialisation value from `0` to any other value of your choice. It is declared using the `enum` keyword followed by the name of enum and constants. For example:

```ts
enum demoEnum {
  milk = 1,
  curd,
  butter,
  cheese,
}
let btr: demoEnum = demoEnum.butter;
console.log(btr);
// Prints: 3
```

### 8. <ins>What are `Type aliases` in TypeScript?</ins>

- **Type aliases** in TypeScript mean `a name for any type`. They provide a way of creating new names for existing types.
- **Type aliases** don’t define new types, instead, they provide an alternative name for an existing type.
- **Type aliases** can be created using the `type` keyword, referring to any valid TypeScript type, including primitive types. For example:

```ts
type MyNumber = number;
type User = {
  id: number;
  name: string;
  email: string;
};
```

### 9. <ins>What are `Interfaces` in TypeScript?</ins>

- **Interfaces** are defined using the `interface` keyword.
- An `interface` defines a contract that an object must adhere to. For example:

```ts
interface Client {
  name: string;
  address: string;
}
```

### 10. <ins>What are the differences between `Types` and `Interfaces`?</ins>

- `interface` Object / Functions syntax

```ts
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

- `type` Object / Functions syntax

```ts
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```

- Other Types

  - Unlike an `interface`, the `type` alias can also be used for other types such as `primitives`, `unions`, and `tuples`.

```ts
// primitive
type Name = string;

// object
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
```

- Interface extends interface syntax

```ts
interface PartialPointX {
  x: number;
}
interface Point extends PartialPointX {
  y: number;
}
```

- Type alias extends type alias syntax

```ts
type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };
```

- Interface extends type alias syntax

```ts
type PartialPointX = { x: number };
interface Point extends PartialPointX {
  y: number;
}
```

- Type alias extends interface syntax

```ts
interface PartialPointX {
  x: number;
}
type Point = PartialPointX & { y: number };
```

- Implements

```ts
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

// Can not implement an union type
type PartialPoint = { x: number } | { y: number };

class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}
```

- Unlike a `type` alias, an `interface` can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).

```ts
type Point = {
  x: number;
};
type Point = {
  y: number;
};
// Duplicate identifier 'Point'.

interface Point {
  x: number;
}
interface Point {
  y: number;
}

const point: Point = { x: 1, y: 2 };
```

- When to use `type`:

  - Use `type` when defining an alias for primitive types (string, boolean, number, bigint, symbol, etc).
  - Use `type` when defining tuple types.
  - Use `type` when defining function types.
  - Use `type` when defining a union.
  - Use `type` when trying to overload functions in object types via composition.
  - Use `type` when needing to take advantage of mapped types.

- When to use `interface`:

  - Use `interface` for all object types where using type is not required.
  - Use `interface` when you want to take advantage of declaration merging.

- _Always prefer `interface` over `type`_.

### 11. <ins>What are the differences between `Classes` and `Interfaces` in TypeScript?</ins>

- **Classes** is defined using the `class` keyword. The classes can contain the methods, properties and variables. Methods of a class are defined when the class is implemented. A class instance will allow us to access the properties and methods defined inside the class.
- **Interfaces** are defined using the `interface` keyword. It contains only the declarations of the properties and methods which are implemented by the derived class.

### 12. <ins>Is TypeScript `strictly statically` typed language?</ins>

- No, TypeScript is not a strictly statically typed language it is an optional statically typed language that means it is in our hands that a particular variable has to be statically typed or not.
- We can use the `any` type and allow a variable to accept the value of any kind of data type.
- We can also define a variabe with a particular data type that a variable can accept and throws error if a value of some other data type is assigned to it.
