let equationArray = [];
let currentNumber = "0";

const calculator = document.querySelector(".calculator");
const numberDiv = document.querySelector(".numbers");
const equationDiv = document.querySelector(".equations");

function operate(operator, num1, num2) {
    operateMethods = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "/": (a,b) => a / b,
        "x": (a,b) => a*b,
        "^": (a,b) => a**b,
        "%": (a,b) => a % b,
    };
    return operateMethods[operator](num1, num2);
}

function handleEquation(arr) {
    if (arr.length >= 3) {
        arr[0] = operate(arr[1], arr[0], arr[2]);
        delete arr[1];
        delete arr[2];
        // filter out the undefineds
        arr = arr.filter(i => !!i);
    }
}

function displayEquation(arr) {
    equationDiv.textContent = arr.join("");
}

function displayNumber(num) {
    numberDiv.textContent = num;
}

function handleNumberInput(event) {

}

function handleOperatorInput(event) {
    
}

function handleCalculator(event) {
    if (event.target.nodeName !== "BUTTON") {
        return;
    }

    if (event.target.getAttribute("class") === "number-input") {
        handleNumberInput(event);
    } else if (event.target.getAttribute("class") === "operator-input") {
        handleOperatorInput(event);
    }
    
    handleEquation(equationArray);
    displayEquation(equationArray);
    displayNumber(currentNumber);
}

displayNumber(currentNumber)
calculator.addEventListener("click", handleCalculator);