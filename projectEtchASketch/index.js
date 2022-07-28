
const gridSizeRange = document.getElementById('gridSizeRange')
let gridSize = gridSizeRange.value
console.log(`grid size: ${gridSize}`)
const gridSizeLabel = document.getElementById('gridSizeLabel')
const pixelGrid = document.querySelector('.pixelGrid')
const colorPicker = document.getElementById('colorPicker')
const colorPickerLabel = document.getElementById('colorPickerLabel')
const sketchModes = document.getElementsByClassName('eraserType')
const rainbowMode = document.getElementById('rainbow')
const transparentColor = '#00000000';

updateColorLabel()

updateGridSizeLabel()

const dPixelGrid = document.querySelector('.pixelGrid')

changeGridOnScreen(gridSize)


gridSizeRange.addEventListener('mouseup', (e) => {
    gridSize = gridSizeRange.value
    changeGridOnScreen(gridSize)
})

//creating dragging effect using mousedown and mouse over to maintain the selection effect.
//reset the drag when mouse is up.

let isDragging = false;

pixelGrid.onmousedown = function (e) {
    isDragging = true;
    if(e.target.id){
    executeSketch(e);
    }
}

pixelGrid.onmouseup = pixelGrid.onmouseleave = function(){
    isDragging = false;
}

pixelGrid.onmouseover = function (e) {
    if(isDragging && e.target.id) {
        executeSketch(e)
    }
}

function changeGridOnScreen(gridSize) {
    createDivForGrid(gridSize)
    changeGridSizeCss(gridSizeRange.value)
}

function createDivForGrid(gridSize) {
    while (pixelGrid.firstChild){
        pixelGrid.removeChild(pixelGrid.firstChild)
    }
    for (let i = 0; i < (gridSize * gridSize); i++) {
        const divElement = document.createElement("div")
        divElement.setAttribute("id", `${i+1}`)
        dPixelGrid.appendChild(divElement)
    }
}

function changeGridSizeCss (targetColNum) {
    let htmlStyles = window.getComputedStyle(document.querySelector('html'));
    let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));
    console.log(`start Column: ${colNum}`)
    document.documentElement.style.setProperty("--colNum", targetColNum);
}

function updateGridSizeLabel() {
    gridSizeLabel.innerText = `${gridSizeRange.value} x ${gridSizeRange.value}`
}

function updateColorLabel() {
    const hexColorCode = colorPicker.value
    colorPickerLabel.textContent = hexColorCode.toUpperCase();
    document.documentElement.style.setProperty("--divColor", hexColorCode);

    uncheckRainbowMode()
}

function executeSketch(e) {
    const sketchMode = checkSketchMode()
    // if(e.target.style.background) {
    //     e.target.style.background = 'none';
    // }
    switch (sketchMode[0].value) {
        case 'draw':
            document.documentElement.style.setProperty("--divOpacity", '1');
            if(rainbowMode.checked) {
                e.target.style.backgroundColor = generateRainbowColors();
            } else {
                e.target.style.backgroundColor = colorPicker.value;
            }
            break;
        case 'clearOne':
                e.target.style.backgroundColor = transparentColor
            break;
        case 'clearAll':
            clearAll()
            break;
        default:
            e.target.style.backgroundColor = colorPicker.value;
    }
}

function checkSketchMode() {
    return Array.prototype.filter.call(sketchModes, function(mode){
        return mode.checked;
    })
}

function clearAll() {
    document.documentElement.style.setProperty("--divOpacity", '0');
    setTimeout(clearDiv, 700);
}

function uncheckRainbowMode(){
    rainbowMode.checked = false;
    // document.documentElement.style.setProperty("--divBackground", '');
}

function checkRainbowMode(){
    rainbowMode.checked = true;
    // document.documentElement.style.setProperty("--divBackground", rainbowColor);

}

function generateRainbowColors() {
    const rainbowColors = ['rgb(148, 0, 211)', 'rgb(75,0,130)', 'rgb(0,0,255)', 'rgb(0,255,0)', 'rgb(255, 255,0)','rgb(255,127,0)','rgb(255,0,0)']
    const random = Math.floor(Math.random()*rainbowColors.length)
    const color = rainbowColors[random]
    return color
}

function clearDiv() {
    const children = pixelGrid.childNodes
    children.forEach(child =>{
        child.style.backgroundColor = transparentColor
    })
}
