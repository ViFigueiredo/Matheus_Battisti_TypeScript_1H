// string, number, boolean
let x: number = 10;
// x = 'teste'
x = 20;

console.log(x);

// inferencia x annotation - há casos em que a inferencia não é entendida
let y = 12; // inferencia
let z: number = 12; // annotation

// Tipos básicos
let firstName: string = "Vinicius";
let age: number = 29;
const isAdmin: boolean = true;

// String (obj) != string (type)
console.log(typeof firstName); // devemos seguir essa notação

firstName = "João";
console.log(firstName);

// object (listas)
const myNumbers: number[] = [1, 2, 3];
console.log(myNumbers);
console.log(myNumbers.length);
// console.log(myNumbers.toUpperCase());
console.log(firstName.toUpperCase());
myNumbers.push(5);
console.log(myNumbers);

// tuplas
let myTuple: [number, string, string[]];
// myTuple = [true, false, true]

// object literals -> {prop: value}
const user: { name: string; age: number } = {
  name: "Pedro",
  age: 18,
};
console.log(user);
console.log(user.name);
// user.job = 'Programador'

// any - qualquer coisa
let a: any = 0;
a = "teste";
a = true;
a = [];

// union types
let id: string | number = "10";
id = 200;
// id = true
// id = []

// type alias
type myIdType = number | string;
const userId: myIdType = 10;
const productId: myIdType = "00001";
const shirId: myIdType = 123;

// enum
// tamanho de roupas (size: Médio, size: Pequeno)
enum Size {
  P = "Pequeno",
  M = "Médio",
  G = "Grande",
}

const camisa = {
  name: "Camisa gola V",
  size: Size.G,
};
console.log(camisa);

// literals types - valor literal de um tipo (não é tipo, é um valor)
let teste: "autenticado" | null;
// teste = 'outrovalor'
teste = null;

// funções
function sum(a: number, b: number) {
  return a + b;
}
console.log(sum(12, 12));
// console.log(sum(12, true));

function sayHelloTo(name: string): string {
  // return true
  return `Hello ${name}`;
}
console.log(sayHelloTo("Vinicius"));

function logger(msg: string): void {
  // sem retorno
  console.log(msg);
}
logger("Teste");

// ? -> opcional porém exige validação
function greeting(name: string, greet?: string) {
  if (greet) return `Olá ${greet} ${name}`;
  return `Olá ${name}`;
}
console.log(greeting("Vinicius"));
console.log(greeting("Vinicius", "Sir"));

// interfaces
interface MathFunctionParams {
  n1: number;
  n2: number;
}

function sumNumbers(nums: MathFunctionParams) {
  return nums.n1 + nums.n2;
}

console.log(sumNumbers({ n1: 1, n2: 2 }));

function multiplyNumbers(nums: MathFunctionParams) {
  return nums.n1 * nums.n2;
}

const someNumbers: MathFunctionParams = {
  n1: 5,
  n2: 10,
};
console.log(multiplyNumbers(someNumbers));

// narrowing - checagem de tipos
function doSomething(info: number | boolean) {
  if (typeof info === "number") return `O número é ${info}`;
  return "Não foi passado um número";
}

console.log(doSomething(5));
console.log(doSomething(true));

// generics
function showArraysItems<T>(arr: T[]) {
  arr.forEach((item) => {
    console.log(`ITEM: ${item}`);
  });
}

const a1 = [1, 2, 3];
const a2 = ["a", "b", "c"];
showArraysItems(a1);
showArraysItems(a2);

// classes
class User {
  name;
  role;
  isApproved;

  constructor(name: string, role: string, isApproved: boolean) {
    this.name = name;
    this.role = role;
    this.isApproved = isApproved;
  }

  showUsername() {
    console.log(`O nome do usuário é ${this.name}`);
  }

  showUserRole(canShow: boolean) {
    if (canShow) {
      console.log(`Role do usuário é: ${this.role}`);
      return;
    }
    console.log("Informação restrita!");
  }
}

const zeca = new User("Zéca", "Admin", true);
console.log(zeca);
zeca.showUsername();
zeca.showUserRole(true);

// interface em classes
interface IVehicle {
  brand: string;
  showBrand(): void;
}

class Car implements IVehicle {
  brand;
  wheels;

  constructor(brand: string, wheels: number) {
    this.brand = brand;
    this.wheels = wheels;
  }

  showBrand(): void {
    console.log(`A marca do carro é ${this.brand}`);
  }
}

const fusca = new Car("VW", 4);
fusca.showBrand();

// herança
class SuperCar extends Car {
  engine;

  constructor(brand: string, wheels: number, engine: number) {
    super(brand, wheels);
    this.engine = engine;
  }
}

const a4 = new SuperCar("Audi", 4, 2.0);
console.log(a4);
a4.showBrand();

// decorators
// constructor decorator
// deve retorna outra função contendo tudo que será alterado na classe base
function BaseParameters() {
  return function <
    T extends { // generics estendendo para o construtor
      new (...args: any[]): {}; // construtor recebe um spread[arr] de tipo any e retorna um obj
    }
  >(constructor: T) { // recebe um construtor
    return class extends constructor { //extende para o construtor
      id = Math.random();
      createdAt = new Date();
    };
  };
}

@BaseParameters()
class Person {
  name;

  constructor(name: string) {
    this.name = name;
  }
}

const sam = new Person("Sam");
console.log(sam);
