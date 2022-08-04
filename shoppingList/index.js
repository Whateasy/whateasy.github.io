import {shoppingItemByCategories, shoppingCategoryByItems} from "./public/seeding.js";

insertShoppingItems(shoppingCategoryByItems)

function insertShoppingItems(shoppingCategoryByItems) {
    const shoppingItems = document.querySelector('.itemList')
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
                const newInput = document.createElement('input')
                newInput.setAttribute('type', 'checkbox')
                newInput.setAttribute('name', item)
                newInput.value = item
                const newLabel = document.createElement('label')
                newLabel.setAttribute('for', item)
                newLabel.textContent = item
                newLi.append(newInput)
                newLi.appendChild(newLabel)
                newUl.appendChild(newLi)
        })
        newUlDiv.append(newUl)
        shoppingItems.append(newUlDiv)
    })
}



