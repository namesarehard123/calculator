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
        console.log(arr);
        arr[0] = operate(arr[1], arr[0], arr[2]);
        delete arr[1];
        delete arr[2];
        
    }
    equationArray = arr.filter(i => !!i);
}

function displayEquation(arr) {
    equationDiv.textContent = arr.join("");
}

function displayNumber(num) {
    numberDiv.textContent = num;
}

function smartParse(str) {
    if (str.includes(".")) {
        return parseFloat(str)
    } else {
        return parseInt(str);
    }
}

function handleNumberInput(event) {
    const element = event.target;
    if (element.textContent === "AC") {
        equationArray = [];
        currentNumber = "0";
        return;
    } else if (element.textContent === "<=") {
        currentNumber = currentNumber.slice(0,-1);
        return;
    }

    // number inputs
    if (currentNumber === "0") {
        currentNumber = "";
    }
    currentNumber += element.textContent;
}

function handleOperatorInput(event) {
    const element = event.target;
   
    if (element.textContent === "=") {
        equationArray.push(smartParse(currentNumber));
        handleEquation(equationArray);
        currentNumber = `${equationArray[0] ? equationArray[0]:"0"}`;
        equationArray = [];
    } else {
        if (currentNumber === "") {
            return;
        }
        equationArray.push(smartParse(currentNumber));
        equationArray.push(element.textContent);
        currentNumber = "";
    }
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