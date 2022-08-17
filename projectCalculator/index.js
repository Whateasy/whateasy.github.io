function operate(a, operator, b) {
    return operator(a, b)
}

function add (a, b) {
        return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return (a / b).toFixed(8)
}

function equal (a=1, b=1){

}

const results = document.querySelector('.results')
const defaultDisplay = '0'
results.textContent = defaultDisplay

const keyPads = document.querySelector('.keyPads')
const operators = new Map([['\u00f7', divide],['\u00d7', multiply], ['-', subtract],  ['+', add],['=', equal]])
// const operators2 = new Map([[divide, '\u00f7'],[ multiply, '\u00d7'], [subtract,'-', ],  [add, '+' ],['equal','=', ]])
// const operatorsArray = Array.from(operators2.values())
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const specialChar = ['C', '+/-', '%']
let tempNumStorage = [];
let tempOperation = [];
let tempToggleEl, waitForNumber, tempResults
let whatHasBeenPressed = []
let decimals = false
let acCounter = 0

console.log('tempNumStorage', tempNumStorage)
console.log('tempNumOperation', tempOperation)

insertKeysToKeyPad()

//function to create input buttons for the key pads
function insertKeysToKeyPad () {
    const keys = ['0', '.', '=', '1', '2', '3', '+','4', '5', '6','-', '7', '8', '9', '\u00d7','C', '+/-', '%', '\u00f7'].reverse()
    keys.forEach(key =>{
        const inputKey = document.createElement('button')
        let className;
        if (operators.has(key)){
            className = 'operator'
        } else if (numbers.includes(key)){
            className = 'inputNumber'
        } else {
            className = 'specialChar'
        }
        setAttributes(inputKey, {'class': className, 'id': key, 'name':key, 'value': key})
        inputKey.textContent = key.toString()
        inputKey.addEventListener('click', iPressed)
        keyPads.append(inputKey)
    })
}

//helper function to set attributes for DOM elements
function setAttributes (element, attributes) {
    for (let key in attributes){
    element.setAttribute(key, attributes[key])
    }
}

function iPressed(){
    whatHasBeenPressed.push(this.value)
    if(tempToggleEl !== undefined ){
    tempToggleEl.classList.toggle('highlight')
        tempToggleEl = undefined
    }
    if (operators.has(this.value)){
        console.log('I am in operator route')
        justOperator(this)
    } else if (numbers.includes(this.value)){
        acCounter = 0;
        console.log('I am in number route')
        justNumbers(this)
    } else {
        console.log('I am in special route')
        iamSpecial(this)
    }
    console.log('What has been pressed:',whatHasBeenPressed)
}

function showOnDisplay(input) {
    results.textContent = input
}

function justNumbers(input) {
    if(input.value === '.' && !decimals){
        decimals = true
        let revisedNum = tempNumStorage.pop();
        revisedNum = revisedNum.toString()+input.value;
        showOnDisplay(revisedNum)
        // revisedNum = revisedNum * 1
        console.log(revisedNum)
        tempNumStorage.push(revisedNum)
        console.log(tempNumStorage)
    } else if(decimals){
        let revisedNum = tempNumStorage.pop();
        revisedNum = revisedNum.toString()+input.value;
        showOnDisplay(revisedNum)
        revisedNum = revisedNum * 1
        console.log(revisedNum)
        tempNumStorage.push(revisedNum)
        console.log(tempNumStorage)
    } else {
        tempNumStorage.push(parseInt(input.value))
        console.log('before doing numberCalculation: tempNumStorage', tempNumStorage)
        showOnDisplay(input.value)
            if(waitForNumber){
            tempResults = popFormula()
            tempNumStorage.push(tempResults)
            waitForNumber = false
            console.log('did numberCalculation: tempNumOperation', tempOperation)
        }
    }
}

function justOperator(input){
    if(decimals) decimals = false;
    if(input.value ==='='){
        if(tempResults){
            showOnDisplay(tempResults)
            waitForNumber = false
        } else {
        tempResults = shiftFormula()
        tempNumStorage.push(tempResults)
        showOnDisplay(tempResults)
        waitForNumber = false
        }
    } else {
        input.classList.toggle('highlight')
        tempToggleEl = input
    tempOperation.push(input.value)
    if (tempResults){
        showOnDisplay(tempResults)
        tempResults = ''
    }
    checkCalcPriority(input.value)
    }
}

function iamSpecial(input){
    let modResults = ''
    switch (input.value){
        case 'AC':
        case 'C':
            acCounter = acCounter + 1
            if (acCounter === 1 && tempNumStorage.length > 1 ){
                console.log('I am in clear')
                tempNumStorage.pop();
                showOnDisplay(defaultDisplay);
                input.textContent = 'AC'
                if (tempOperation.length > 0){
                    console.log('I am toggling operator')
                    const operator = document.getElementById(`${tempOperation[tempOperation.length-1]}`)
                    operator.classList.toggle('highlight')
                    tempToggleEl = operator
                }
            } else if (acCounter === 2) {
            showOnDisplay(defaultDisplay);
            tempNumStorage = [];
            tempOperation = [];
            acCounter = 0;
            input.textContent = 'C'
            }
            break;
        case '%':
            modResults = parseInt(results.textContent,10)/100
            showOnDisplay(modResults);
            tempNumStorage.pop()
            tempNumStorage.push(modResults)
            break;
        case '+/-':
            modResults = parseInt(results.textContent,10)*-1
            showOnDisplay(modResults);
            tempNumStorage.pop()
            tempNumStorage.push(modResults)
            break;
    }
}

function checkCalcPriority(){
    console.log('1stStep checkCalcPriority: tempNumStorage', tempNumStorage)
    console.log('1stStep checkCalcPriority: tempNumOperation', tempOperation)
    const priorityList = ['\u00d7', '\u00f7']
    if (priorityList.includes(tempOperation[tempOperation.length-1])) {
        waitForNumber = true
    }
    if(tempOperation.length>=2 && !waitForNumber){
        tempResults = shiftFormula()
        tempNumStorage.push(tempResults)
        showOnDisplay(tempResults)
        tempResults = ''
        waitForNumber = false
        }
}

function popFormula(){
    console.log('in PopFormula:', tempNumStorage)
    const b = tempNumStorage.pop()
    const a = tempNumStorage.pop()
    const operator = tempOperation.pop()
    tempResults = operate(a, operators.get(operator), b)
    console.log(tempResults)
    return tempResults
}

function shiftFormula(){
    console.log('in shiftFormula:', tempNumStorage)
    const a = tempNumStorage.shift()
    const b = tempNumStorage.shift()
    const operator = tempOperation.shift()
    tempResults = operate(a, operators.get(operator), b)
    console.log(tempResults)
    return tempResults
}
