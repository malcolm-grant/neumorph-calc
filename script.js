"use strict";

class Calculator {
  constructor(prevOperandTextElement, curOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.curOperandTextElement = curOperandTextElement;
    this.resetValue = false;
    this.clear();
  }

  clear() {
    this.curOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.curOperand.includes(".")) return;
    this.curOperand = this.curOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.curOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.reset = true;
    this.operation = operation;
    this.prevOperand = this.curOperand;
    this.curOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const cur = parseFloat(this.curOperand);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case "+":
        computation = prev + cur;
        break;
      case "-":
        computation = prev - cur;
        break;
      case "\u00f7":
        computation = prev / cur;
        break;
      case "\u00D7":
        computation = prev * cur;
        break;
      default:
        return;
    }
    this.resetValue = true;
    this.curOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
    console.log(computation);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.curOperandTextElement.innerText = this.getDisplayNumber(
      this.curOperand
    );
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevOperandTextElement = document.querySelector("[data-prev-operand]");
const curOperandTextElement = document.querySelector("[data-cur-operand]");

const calculator = new Calculator(
  prevOperandTextElement,
  curOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      calculator.prevOperand === "" &&
      calculator.curOperand !== "" &&
      calculator.resetValue
    ) {
      calculator.curOperand = "";
      calculator.resetValue = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
