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
    return a / b
}

function equal (a=1, b=1){

}

const results = document.querySelector('.results')
const defaultDisplay = '0'
results.textContent = defaultDisplay

const keyPads = document.querySelector('.keyPads')
const keys = ['0', '.', '=', '1', '2', '3', '+','4', '5', '6','-', '7', '8', '9', '\u00d7','C', '+/-', '%', '\u00f7'].reverse()
const operators = new Map([['\u00f7', divide],['\u00d7', multiply], ['-', subtract],  ['+', add],['=', equal]])
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const specialChar = ['C', '+/-', '%']
const keyBoardToKeysMapping = new Map([['/', '\u00f7'],['Backspace', 'C'], ['Enter', '=']])
let tempNumStorage, tempOperation,tempToggleEl, waitForNumber, tempResults, whatHasBeenPressed,
    decimals, acCounter, multiDigits

function reload(){
    tempNumStorage = [];
    tempOperation = [];
    whatHasBeenPressed = []
    tempToggleEl = undefined;
    tempResults = ''
    acCounter = 0
    waitForNumber = false;
    decimals = false
    multiDigits = false
}

reload()

insertKeysToKeyPad()

//function to create input buttons for the key pads
function insertKeysToKeyPad () {
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

//event listeners to route the key pressed to the appropriate actions
function iPressed(){
    whatHasBeenPressed.push(this.value)
    if(tempToggleEl !== undefined ){
    tempToggleEl.classList.toggle('highlight')
        tempToggleEl = undefined
    }
    //several parameters need to be reset from numbers and the all clear vs clear button differentiation
    //operator key being pressed is a signal to indicate the number input step has finished
    if (operators.has(this.value)){
        console.log('I am in operator route')
        decimals = false;
        document.getElementById('.').disabled = false;
        acCounter = 0
        multiDigits = false
        document.getElementById('C').textContent = 'C';
        //flag here to perform a calculation if previous operator has the priority
        // and was just waiting for the numbers to be pressed
        if(waitForNumber){
            tempResults = popFormula()
            tempNumStorage.push(tempResults)
            waitForNumber = false
        }
        justOperator(this)
    } else if (numbers.includes(this.value)){
        console.log('I am in number route')
        acCounter = 0;
        justNumbers(this)
    } else {
        console.log('I am in special route')
        decimals = false;
        document.getElementById('.').disabled = false;
        multiDigits = false;
        iamSpecial(this)
    }
    console.log('What has been pressed:',whatHasBeenPressed)
}

//the logic here is to ensure we control the number of digits shown on screen.
function showOnDisplay(input) {
    let modInput;
    typeof input === 'number' ? modInput = input.toString().split('') : modInput = input.split('');
    if (modInput.length <= 9) {
        results.textContent = modInput.join('');
    } else {
        const slicedInput = modInput.slice(0, 10)
        if (modInput[10] * 1 > 5) {
            slicedInput.push(slicedInput.pop() * 1 + 1)
        }
        results.textContent = slicedInput.join('');
    }
}

function justNumbers(input) {
    acCounter = 0;
    document.getElementById('C').textContent = 'C';
    //this route disables the decimal button after it has been pressed once
    if(input.value === '.' && !decimals) {
        decimals = true
        input.disabled = true;
        //logic here is to ensure multiple digits (including decimals) are treated as one number
        if(multiDigits){
            let revisedNum = tempNumStorage.pop();
            revisedNum = revisedNum.toString()+input.value;
            showOnDisplay(revisedNum)
            // revisedNum = revisedNum * 1
            tempNumStorage.push(revisedNum)
        } else {
            showOnDisplay('0.')
            tempNumStorage.push('0.')
        }

        //logic here is to ensure multiple digits are treated as one number
    } else if (multiDigits) {
        let revisedNum = tempNumStorage.pop();
        revisedNum = revisedNum.toString()+input.value;
        showOnDisplay(revisedNum)
        revisedNum = revisedNum * 1
        tempNumStorage.push(revisedNum)
    } else {
        tempNumStorage.push(input.value * 1)
        showOnDisplay(input.value)
        multiDigits = true;
    }
}

// calculation results are shown on screen after operator is pressed if a definitive solution can be found,
// and we are not waiting for further number input.
function justOperator(input){
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

//special operations for each of these
function iamSpecial(input){
    let modResults = ''
    switch (input.value){
        //AC and C cases are distinct in their usage, therefore need to be differentiated.
        case 'AC':
        case 'C':
            acCounter = acCounter + 1
            showOnDisplay(defaultDisplay);
            if (acCounter === 1){
                if (tempNumStorage.length > 1 ) {
                    tempNumStorage.pop();
                } else if (tempOperation.length > 0){
                    const operator = document.getElementById(`${tempOperation[tempOperation.length-1]}`)
                    operator.classList.toggle('highlight')
                    tempToggleEl = operator
                }
                input.textContent = 'AC'
            } else if (acCounter === 2) {
                reload();
                input.textContent = 'C'
            }
            break;
        case '%':
            modResults = 1 * results.textContent/100
            showOnDisplay(modResults);
            tempNumStorage.pop()
            tempNumStorage.push(modResults)
            break;
        case '+/-':
            modResults = results.textContent*-1
            showOnDisplay(modResults);
            tempNumStorage.pop()
            tempNumStorage.push(modResults)
            break;
    }
}

//division and multiplication has priority over other operations
function checkCalcPriority(){
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


//adding keyboard control to allow user input operations and numbers using keyboard
document.addEventListener('keydown', (e)=>{
    const keyName = e.key;
    console.log('I pressed key', keyName)
    if (keys.includes(keyName)) {
        document.getElementById(keyName).click()
    } else if (keyBoardToKeysMapping.has(keyName)){
        document.getElementById(keyBoardToKeysMapping.get(keyName)).click()
    }
})

