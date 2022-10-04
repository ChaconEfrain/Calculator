"use strict";

const numbers = document.querySelectorAll(".numbers");
// const operators = document.querySelectorAll(".operator");
const mainOperators = document.querySelectorAll(".main-operator");
const extraOperators = document.querySelectorAll(".extra-operator");
const clearAll = document.querySelector(".clear-all");
const clear = document.querySelector(".clear");
const result = document.querySelector(".result");
const equal = document.querySelector(".equal");
const erase = document.querySelector(".erase");
let equalPressed = false;

const mainOperations = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 - num2;

    case "×":
      return num1 * num2;

    case "÷":
      return num1 / num2;

    case "%":
      return (num1 / 100) * num2;
  }
};

const getResultTwoNumbers = (numsDisplayed) => {
  const operator = numsDisplayed
    .split("")
    .find((el) => !Number(el) && el !== "." && el !== "0");
  const operatorIndex = numsDisplayed
    .split("")
    .findIndex((el) => el === operator);
  const firstNumber = numsDisplayed.slice(0, operatorIndex);
  const secondNumber = numsDisplayed.slice(operatorIndex + 1);
  result.innerHTML = +mainOperations(
    +firstNumber,
    +secondNumber,
    operator
  ).toFixed(2);
};

clearAll.addEventListener("click", () => {
  result.innerHTML = "";
});

clear.addEventListener("click", () => {
  const operator = result.innerHTML
    .split("")
    .find((el) => !Number(el) && el !== "." && el !== "0");
  const operatorIndex = result.innerHTML
    .split("")
    .findIndex((el) => el === operator);
  const newNumber = result.innerHTML.slice(0, operatorIndex);
  result.innerHTML = newNumber;
});

erase.addEventListener("click", () => {
  const erasedNumberIndex = result.innerHTML.length - 1;
  const newNumber = result.innerHTML.slice(0, erasedNumberIndex);
  result.innerHTML = newNumber;
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (!equalPressed) {
      result.innerHTML += number.innerHTML;
    } else {
      result.innerHTML = "";
      equalPressed = !equalPressed;
      result.innerHTML += number.innerHTML;
    }
  });
});

mainOperators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (
      !result.innerHTML.includes("÷") &&
      !result.innerHTML.includes("×") &&
      !result.innerHTML.includes("-") &&
      !result.innerHTML.includes("+") &&
      !result.innerHTML.includes("%") &&
      result.innerHTML.length
    ) {
      result.innerHTML += operator.innerHTML;
    }
  });
});

extraOperators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    console.log(e.target);
    switch (e.target.innerHTML) {
      case "1/X":
        result.innerHTML = (1 / +result.innerHTML).toFixed(2);
        break;

      case "X²":
        result.innerHTML = Math.pow(+result.innerHTML, 2).toFixed(2);
        break;

      case "²√X":
        result.innerHTML = Math.sqrt(+result.innerHTML).toFixed(2);
        break;
    }
  });
});

equal.addEventListener("click", () => {
  getResultTwoNumbers(result.innerHTML);
  equalPressed = !equalPressed;
});
