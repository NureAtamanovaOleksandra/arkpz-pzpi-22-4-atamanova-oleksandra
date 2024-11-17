// поганий приклад
let myVariable;
let my_variable;

// гарний приклад
let myVariable;
let anotherVariable;


// поганий приклад
function f(a: number, b: number): number {
    return a + b;
  }
  
// гарний приклад
function sum(a: number, b: number): number {
    return a + b;
}


// поганий приклад
let area1 = width1 * height1;
let area2 = width2 * height2;

// гарний приклад
function calculateArea(width: number, height: number): number {
  return width * height;
}


// поганий приклад
let value: any;

// гарний приклад
let value: number;


// поганий приклад
[1, 2, 3].map(function (x) {
    return x * 2;
  });
  
// гарний приклад
[1, 2, 3].map(x => x * 2);


// поганий приклад
let speed = 3.6;

// гарний приклад
const METERS_PER_SECOND = 3.6;


// поганий приклад
fetchData().then(data => processData(data));

// гарний приклад
async function loadData() {
  const data = await fetchData();
  processData(data);
}


// поганий приклад
let result;
result = calculateValue();

// гарний приклад
const result = calculateValue();


// поганий приклад
let count;
console.log(count); // може бути undefined

// гарний приклад
let count = 0;
console.log(count);


// поганий приклад
var globalValue = 42;

// гарний приклад
function calculate() {
  let localValue = 42;
}


// поганий приклад
let message = 'Hello, ' + name + '!';

// гарний приклад
let message = `Hello, ${name}!`;


// поганий приклад
function processData(data: any): void {
  // довгий код, що виконує кілька дій
}

// гарний приклад
function fetchData(data: any): void {
  // код для завантаження даних
}
function transformData(data: any): any {
  // код для обробки даних
}


// поганий приклад
function displayUser(user: { name: string; age: number }) {
  console.log(user.name, user.age);
}

// гарний приклад
interface User {
  name: string;
  age: number;
}
function displayUser(user: User) {
  console.log(user.name, user.age);
}


// поганий приклад
function calculateArea(radius: number): number {
  return Math.PI * radius * radius;
}

// гарний приклад
// Calculates the area of a circle with a given radius
function calculateArea(radius: number): number {
  return Math.PI * radius * radius;
}


// поганий приклад
var count = 10;

// гарний приклад
let count = 10;


// поганий приклад
let data: string | null;

// гарний приклад
let data: string | undefined;


// поганий приклад
let a = 10; // змінна для зберігання числа 10

// гарний приклад
let numberOfItems = 10;


//гарний приклад
function setAge(age: number) {
  if (age < 0) throw new Error("Age cannot be negative");
}


// поганий приклад
const ADMIN = 1;
const USER = 2;

// гарний приклад
enum Role {
  Admin,
  User
}


// поганий приклад
function calculate(): number {
  // відсутній return
}

// гарний приклад
function calculate(): number {
  return 42;
}


// поганий приклад
let message = age < 18 ? "young" : age < 50 ? "adult" : "senior";

// гарний приклад
let message;
if (age < 18) message = "young";
else if (age < 50) message = "adult";
else message = "senior";


// поганий приклад
const name = person.name;
const age = person.age;

// гарний приклад
const { name, age } = person;


// поганий приклад
let length = data.length; // може викликати помилку, якщо data є null або undefined

// гарний приклад
let length = data ? data.length : 0;