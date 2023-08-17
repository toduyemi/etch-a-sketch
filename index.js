const GRIDLENGTH = 800;


const gridContainer =  document.querySelector('.grid-container');

const gridControl = document.querySelector('#grid-control');
const gridControlValue = document.querySelector('.control-value');

const shadeToggle = document.querySelector('#shade');
const eraseToggle = document.querySelector('#eraser');

let mouseDown = false;
let gridPrint = false;
let toggleErase = false;
let toggleShade = false;
let currentShade;

//control functionalities
gridControl.addEventListener('input',  (e) => {
    const newSliderValue = e.target.value;
    gridControlValue.textContent = `canvas: ${newSliderValue}x${newSliderValue}`;
});


eraseToggle.addEventListener('click', (e) => {

    toggleErase ^= true;
    toggleShade = false;

    //to style active buttons on gui
    if (toggleErase) {
        eraseToggle.classList.add('active');
        shadeToggle.classList.remove('active');
    }

    else {
        eraseToggle.classList.remove('active');
    }
});

shadeToggle.addEventListener('click', (e) => {
    toggleShade ^= true;
    toggleErase = false;

    //to style active buttons on gui
    if (toggleShade) {
        shadeToggle.classList.add('active');
        eraseToggle.classList.remove('active');
    }

    else {
        shadeToggle.classList.remove('active');
    }
});

function computeShade(currentShade) {
    let red;
    let green;
    let blue;

    red = 255 - (25.5 * (currentShade));
    green = 255 - (25.5 * (currentShade));
    blue = 255 - (25.5 * (currentShade));

    let shade = [red, green, blue];

    return shade;
}

function cap10(x) {
    if (x > 10) {
        return 10;
    }
    else {
        return x;
    }
}

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
            gridSquare.setAttribute('data-shade', '1');
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
function paint(e)   {
    if (!toggleErase && !toggleShade) {
        e.target.style.backgroundColor = `rgb(0, 0, 0)`;
        e.target.setAttribute('data-shade', '10');
    }
    else if (!toggleShade) {
        e.target.style.backgroundColor = `rgb(255, 255, 255)`;
        e.target.setAttribute('data-shade', '1');
    }

    if (toggleShade) {

        let shade = computeShade(currentShade);
        e.target.style.backgroundColor = `rgb(${shade[0]}, ${shade[1]}, ${shade[2]})`;
        e.target.setAttribute('data-shade', `${cap10(currentShade + 1)}`);
    }
}

gridContainer.addEventListener('mousedown', (e) => {
    currentShade = +e.target.getAttribute('data-shade');
    mouseDown = true;
    // prevents styling of components of gridcontainer that aren't individual squares
    if (currentShade) {
        paint(e);
    }
    
    
 });

gridContainer.addEventListener('mouseup', () => {
    mouseDown = false;
});

gridContainer.addEventListener('mouseover', (e) => {
    currentShade = +e.target.getAttribute('data-shade');
    // prevents styling of components of gridcontainer that aren't individual squares
    if (mouseDown && currentShade) {  
        paint(e);
    } 
});



