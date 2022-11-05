import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { addDays, startOfDay } from 'date-fns';

// var date = new Date();

// const dateConvert = (date) => {

// const dateFormatted = format(date, 'dd/MM/yyyy')

// console.log(dateFormatted);

// return dateFormatted

// }

// dateConvert(date);


class itemFactory {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
};


const newFactory = new itemFactory ('asd', 'VERY GOOD DESCRIPTION', 'asdfa', 'asrgge', '12d21d');

const viewItem = (factory) => {
    for(var e in factory){
        console.log(factory[e]);
    }
}
viewItem(newFactory);

class project {
    constructor(){
        let i = 0;
        const projectID = i;
        return i++
    }
}


    

const plusButton = document.querySelector('#plus-button');
plusButton.addEventListener('click', () => {
    document.querySelector('#input-form').style.display = 'grid';
});


const closeButton = document.querySelector('#close-btn');
closeButton.addEventListener("click", function() {
    document.querySelector('#input-form').style.display = 'none';
  });


// const createBox = () => {
//     const boxDiv = document.createElement('div');
//     boxDiv.className = 'box';
//     const boxTitle = document.createElement('p');
//     boxDiv.appendChild(boxTitle);
//     const boxDescription = document.createElement('p');
//     boxDiv.appendChild(boxDescription);
//     const boxDueDate = document.createElement('p');
//     boxDiv.appendChild(boxDueDate);
//     const boxPriority = document.createElement('p');
//     boxDiv.appendChild(boxPriority);
//     const noteInput = document.createElement('p');
//     boxDiv.appendChild(noteInput);
//     };

const boxesContentSelector = document.getElementById('boxes');
// const p = document.createElement('p');
// p.innerText = 'asdasd';


// console.log(boxContainerSelector);
var id = 0;

function hideSibling(sibling){
    sibling.addEventListener('click', () => {
        if (sibling.nextSibling.style.display === 'none'){
            sibling.nextSibling.style.display = 'grid';
        } else if (sibling.nextSibling.style.display === 'grid'){
            sibling.nextSibling.style.display = 'none';
        }
    })
}



const createBox = (item) => {
    const boxDiv = document.createElement('div');
    boxDiv.setAttribute('id', `${id}`);
    boxDiv.className = 'box';
    const boxDividerUp = document.createElement('div');
    boxDividerUp.className = 'schedule-title';
    boxDiv.appendChild(boxDividerUp);
    const boxDividerBottom = document.createElement('div');
    boxDividerBottom.className = 'schedule-details';
    boxDividerBottom.style.display = 'grid';
    boxDiv.appendChild(boxDividerBottom);

    function createBoxContent(item){
        for(var e in item){
            let a = document.createElement('p');
            a.textContent = `${item[e]}`
            boxDividerBottom.appendChild(a);
        }
    }   

    createBoxContent(item);
    // for(var e in item){
    //     let a = document.createElement('p');
    //     a.textContent = `${item[e]}`
    //     boxDividerBottom.appendChild(a);
    // }
    boxes.appendChild(boxDiv);
    boxDividerUp.appendChild(boxDividerBottom.firstChild);

    // console.log(boxDividerUp.nextElementSibling);
    // boxDividerUp.nextSibling.style.display = 'none';
    hideSibling(boxDividerUp);
    // boxDividerUp.addEventListener('click', () => {
    //     boxDividerUp.nextSibling.style.display = 'none';
    // })

    let targetBold = document.getElementById(id);
    targetBold.firstChild.style.fontWeight = 'bold';
    id ++;
}


createBox(newFactory);
createBox(newFactory);

const createBtn = document.querySelector('#create-btn');
createBtn.addEventListener('click', () => {
    const titleInput = document.querySelector('#title').value;
    const descriptionInput = document.querySelector('#set-description').value;
    const dueDateInput = document.querySelector('#duedate').value;
    const priorityInput = document.querySelector('#set-priority').value;
    const noteInput = document.querySelector('#note').value;

    let newItem = new itemFactory (titleInput, descriptionInput, dueDateInput, priorityInput, noteInput);

    createBox();
    
    
})