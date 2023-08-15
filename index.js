const GRIDLENGTH = 800;


const gridContainer =  document.querySelector('.grid-container');

const gridControl = document.querySelector('#grid-control');
const gridControlValue = document.querySelector('.control-value');

let mouseDown = false;
let gridPrint = false;

//control functionalities
gridControl.addEventListener('input',  (e) => {
    const newSliderValue = e.target.value;
    gridControlValue.textContent = `${newSliderValue}x${newSliderValue}`;
});

//canvas functionalities
function createGrid(dimension) {

    for (let i = 0; i < dimension; i++) {
        // create a div for each row
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        gridContainer.appendChild(gridRow);

        for (let j = 0; j < dimension; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.width = `${GRIDLENGTH / dimension}px`;
            gridSquare.style.height = `${GRIDLENGTH / dimension}px`;
            gridRow.appendChild(gridSquare);
        }
    }
    gridPrint = true;
}

function resetGrid() {
    
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    gridPrint = false;
}

function transformGrid(e) {
    if (gridPrint) {
        resetGrid();
    }
    createGrid(e.target.value);
}

createGrid(16);
gridControl.addEventListener('input', transformGrid);




// painting functionality - whyd does it only target the square and not the whole grid?
gridContainer.addEventListener('mousedown', (e) => {
    console.log('yo');
    mouseDown = true;
    e.target.classList.add('paint');
    
 });

gridContainer.addEventListener('mouseup', () => {
    mouseDown = false;
});

gridContainer.addEventListener('mouseover', (e) => {
    console.log('yo');
    if (mouseDown) {
        console.log('yo');
        console.log(mouseDown);
        e.target.classList.add('paint');
    }
    
});



