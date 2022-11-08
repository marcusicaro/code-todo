import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { addDays, startOfDay } from 'date-fns';

const dateConvert = (date) => {

const dateFormatted = format(date, 'dd/MM/yyyy')

return dateFormatted

}



class itemFactory {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
};

// add schedule
const plusButton = document.querySelector('#plus-button');
plusButton.addEventListener('click', () => {
    document.querySelector('#input-form').style.display = 'grid';
});

// close schedule form 
const closeButton = document.querySelector('#close-btn');
function closeForm () {
    const formClosed = closeButton.parentNode.parentNode.style.display = 'none';
    return formClosed
}

closeButton.addEventListener("click", closeForm);

var id = 0;

// hide schedule details 
function hideSibling(sibling){
    sibling.addEventListener('click', () => {
        if (sibling.nextSibling.style.display === 'none'){
            sibling.nextSibling.style.display = 'grid';
        } else if (sibling.nextSibling.style.display === 'grid'){
            sibling.nextSibling.style.display = 'none';
        }
    })
}

// erase schedule values 
const eraseValues = () => {
    const eraseTitle =  document.querySelector('#title').value = '';
    const eraseDescription = document.querySelector('#set-description').value = '';
    const eraseDueDate = document.querySelector('#duedate').value = '';
    const erasePriority = document.querySelector('#set-priority').value = 'low';
    const eraseNote = document.querySelector('#note').value = '';
 
    return {
     eraseTitle,
     eraseDescription,
     eraseDueDate,
     erasePriority,
     eraseNote
    }
 }

// create schedule box 
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

    boxes.appendChild(boxDiv);
    boxDividerUp.appendChild(boxDividerBottom.firstChild);


    hideSibling(boxDividerUp);


    let targetBold = document.getElementById(id);
    targetBold.firstChild.style.fontWeight = 'bold';
    id ++;
}

class manageProject {

    constructor(){}
    
    giveID() {
        const projectID = 0;
        return projectID;
    }
}

var idOne = new manageProject;


const createBtn = document.querySelector('#create-btn');
createBtn.addEventListener('click', () => {
    const titleInput = document.querySelector('#title').value;
    const descriptionInput = document.querySelector('#set-description').value;
    const dueDateInput = document.querySelector('#duedate').value;

    function dateOperations () {
        if (dueDateInput !== ''){
            const newDateFormat = new Date(dueDateInput);
            const dateFormated = dateConvert(newDateFormat);
            return dateFormated
        } else {
            return ''
        }
    }


        if (titleInput === ''){
            alert("Title can't be empty");
            return
        }


    dateOperations();

    const priorityInput = document.querySelector('#set-priority').value;
    const noteInput = document.querySelector('#note').value;

    let newItem = new itemFactory (titleInput, descriptionInput, dateOperations(), priorityInput, noteInput);

    createBox(newItem);
    
    eraseValues();
    closeForm ();
    
})


const projectManage = () => {

    const closeBtnSelect = document.querySelector('#close-project-form');
    const projectCloseBtn = closeBtnSelect.addEventListener('click', () => {
        projectForm.style.display = 'none';
    })

    const projectForm = document.querySelector('#project-form');
    const projectPlusIconSelect = document.querySelector('.plus-project');
    const projectPlusIcon = projectPlusIconSelect.addEventListener('click', () => {
        projectForm.style.display = 'grid';
        })
    const createProjectBtn = document.querySelector('#create-project');
    const createProject = createProjectBtn.addEventListener('click', () => {
        const projectTextContent = document.querySelector("#project-input");
        const projectListSelect = document.querySelector('.project-list');
        const createProjectItem = document.createElement('li');
        const projectTextContentValue = projectTextContent.value;
        createProjectItem.textContent = projectTextContentValue;
        createProjectItem.setAttribute('id', `${projectTextContentValue}`);
        projectListSelect.appendChild(createProjectItem);
        projectForm.style.display = 'none';
    })

    return {projectCloseBtn, projectPlusIcon, createProject}
}

projectManage()