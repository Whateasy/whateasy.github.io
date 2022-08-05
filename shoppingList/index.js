import {shoppingItemByCategories, shoppingCategoryByItems, displayOrder, defaultList} from "./public/seeding.js";

const shoppingItems = document.querySelector('.itemList')
const divShoppingList = document.querySelector('.shoppingList')
const selectedShoppingList = defaultList

insertShoppingItems(shoppingCategoryByItems)

checkInputBox()

updateShoppingListSection()


//Add pre-defined shopping items per category to the 'shoppingItems' section of the page
function insertShoppingItems(shoppingCategoryByItems) {
        shoppingCategoryByItems.forEach((category, key) => {
        const newUlDiv = document.createElement('div')
        newUlDiv.setAttribute('class', 'divForTypes')
        const newUl = document.createElement('ul')
        newUl.setAttribute('class','typeUl')
            const newSubHeading = document.createElement('h2')
            newSubHeading.textContent = key
            newUlDiv.append(newSubHeading)
        category.sort();
        category.forEach(item => {
                const newLi = document.createElement('li')
                const newInput = createInputElement(item, 'shoppingItems', inputBoxToShoppingList)
                const newLabel = createInputLabel(item, 'labelItems')
                newLi.append(newInput)
                newLi.appendChild(newLabel)
                newUl.appendChild(newLi)
        })
        newUlDiv.append(newUl)
        shoppingItems.append(newUlDiv)
    })
}

// tick the checkbox for items that are in the 'selectedShoppingList', which is pre-populated by a default list when web page loads.
function checkInputBox () {
    const allInputCheckBoxes = document.querySelectorAll('.shoppingItems')
    for(const each of allInputCheckBoxes){
        if(selectedShoppingList.includes(each.value))
            each.checked=true
    }
}

//populate the shopping list section of the web page.
function updateShoppingListSection() {
    while (divShoppingList.firstChild){
        divShoppingList.removeChild(divShoppingList.firstChild)
    }
    const newUl = document.createElement('ul')
    newUl.setAttribute('class','shoppingListSectionUl')
    const sortedSelectedShoppingList = sortSelectedShoppingList(selectedShoppingList)
    console.log('this is sorted listed', sortedSelectedShoppingList)
    sortedSelectedShoppingList.forEach(item =>{
        const newDiv = document.createElement('div')
        const newInput = createInputElement(item.item, 'shoppingItems', strikeOffList)
        const newLabel = createInputLabel(item.item, 'labelItems')
        const newSpan = createSpan(item.category, 'shoppingItemCategory')
        newSpan.textContent = item.category
        newDiv.append(newInput)
        newDiv.appendChild(newLabel)
        newDiv.appendChild(newSpan)
        newUl.appendChild(newDiv)
    })
    divShoppingList.append(newUl)
}


//helper function to create the input elements
function createInputElement(name, className, eventListener){
    const newInput = document.createElement('input')
    newInput.setAttribute('type', 'checkbox')
    newInput.setAttribute('name', name)
    newInput.setAttribute('class', className)
    newInput.value = name
    newInput.addEventListener('change', eventListener)
    return newInput
}

//helper function to create the labels for inputs
function createInputLabel(name, className){
    const newLabel = document.createElement('label')
    newLabel.setAttribute('for', name)
    newLabel.setAttribute('class', className)
    newLabel.textContent = name
    return newLabel
}

function createSpan(name, className){
    const newSpan = document.createElement('span')
    newSpan.textContent = name
    newSpan.setAttribute('class', className)
    return newSpan
}


//Event Listener for input box. When a box is ticked, it is added to the 'selectedShoppingList'.
function inputBoxToShoppingList(){
    console.log(selectedShoppingList)
    if (this.checked && selectedShoppingList.indexOf(this.value)===-1 ) {
            selectedShoppingList.splice(0, 0, this.value)
    } else if (!this.checked && selectedShoppingList.indexOf(this.value)!==-1){
            const indexStart= selectedShoppingList.indexOf(this.value)
            selectedShoppingList.splice(indexStart, 1)
    }
console.log(selectedShoppingList)
    updateShoppingListSection()
}

//Event Listener to add strike-through format to the items that are ticked.
function strikeOffList(){
    this.nextElementSibling.classList.toggle('strikethrough')
    this.nextElementSibling.nextElementSibling.classList.toggle('strikethrough')
}

//sort the shopping list alphabetically and then according to the display order
function sortSelectedShoppingList(selectedShoppingList){
    const mappedSelectedShoppingList = selectedShoppingList.sort().map(item => {
        const category = shoppingItemByCategories.get(item)
        return {item, order: displayOrder.get(shoppingItemByCategories.get(item)), category}
    })
    return mappedSelectedShoppingList.sort((a, b) => a.order - b.order)
}