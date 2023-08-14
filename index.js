const GRIDLENGTH = 800;


const gridContainer =  document.querySelector('.grid-container');


let dimension = 120;

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

let mouseDown = false;

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



