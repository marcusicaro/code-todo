import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { addDays, startOfDay } from 'date-fns';

// DOM selectors 
const projectTitle = document.querySelector('#current-project-title');
const sidebarProjectListUl = document.querySelector('.project-list');
const createProjectBtn = document.querySelector('#create-project');
const projectFormInput = document.querySelector('#project-input');
const taskForm = document.querySelector('#input-form');
const boxContainer = document.querySelector('.boxes-container');
const taskCreatBtn = document.querySelector('#create-btn');
const openAddTaskBtn = document.querySelector('#plus-button');
const closeAddTaskFormBtn = document.querySelector('#close-btn');
const projectForm = document.querySelector('#project-form');
const openAddProjectFormBtn = document.querySelector('.plus-project');
const closeProjectFormBtn = document.querySelector('#close-project-form');


// convert date 
const dateConvert = (date) => {

const dateFormatted = format(date, 'dd/MM/yyyy')

return dateFormatted

}

// create task 
class itemFactory {
    constructor(title, description, dueDate, priority, notes, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        // this.project = project;
    }
};

// project class
class Project {
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
        this.tasks = [];
    }

    // insert task into project 
    addTask(newTask) {
        this.tasks.push(newTask)
    }

    alreadyExists(newTask) {
        return this.tasks.some((task) => task.title === newTask.title)
    }
};

// create default project 
const defaultProject = new Project('Default');

// create first task 
const learnCode = new itemFactory('learn code', 'JavaScript, HTML, CSS', '10/11/2022', 'high', 'already doing it', defaultProject)

// add a first task to default project 
defaultProject.addTask(learnCode);

// project library class
class ProjectLibrary {
    constructor() {
        this.projects = []
    }

    // insert project into library
    addProject(newProject) {
        if (!this.isInLibrary(newProject)){
        this.projects.push(newProject)
        }
    }

    isInLibrary(newProject){
        return this.projects.some((project) => project.projectTitle === newProject.projectTitle)
    }
};

// create default library
const defaultLibrary = new ProjectLibrary();

// current project
const globalCurrentProject = () => {
    var currentProject = defaultProject;
}

// add default project to default library
defaultLibrary.addProject(defaultProject);

// append project to project list 

function appendProjectToProjectList (element) {
    const createListItem = document.createElement('li');
    createListItem.style.cursor = 'pointer';
    
    createListItem.addEventListener('click', () => {
        globalCurrentProject.currentProject = element;
        projectTitle.textContent = element.projectTitle;
        emptyBoxContainer(); 
        createTaskFromProjectTasks();
    })

    createListItem.textContent = element.projectTitle;
    sidebarProjectListUl.appendChild(createListItem);

    // change the current project to the one being created 
    globalCurrentProject.currentProject = element;

    // change displayed project text title to this 
    projectTitle.textContent = element.projectTitle;

    emptyBoxContainer();

}

// append default project to projects list 
appendProjectToProjectList(defaultProject);

// add project from form 
createProjectBtn.addEventListener('click', () => {
    let createNewProject = new Project(projectFormInput.value);

    // checks if name has already been taken 
    if (defaultLibrary.isInLibrary(createNewProject)){
        return alert('Project name already exists');
    }
    defaultLibrary.addProject(createNewProject);
    appendProjectToProjectList(createNewProject);
 
    // closes project form 
    projectForm.style.display = 'none';

    // clear project form input
    projectFormInput.value = '';
});

// append task to current project 
const appendTaskToCurrentProject = (el) => {
    globalCurrentProject.currentProject.addTask(el)
}

// convert date 
const convertDate = (dateElement) => {
    if (dateElement !== ''){
        const newDateFormat = new Date(dateElement);
        const dateFormated = dateConvert(newDateFormat);
        return dateFormated
    } else {
        return ''
    }
}

// add task from form to current project
const createTask = () => {
    const getTitleInput = document.querySelector('#title').value;
    const getDescriptionInput = document.querySelector("#set-description").value;
    const getDueDate = document.querySelector('#duedate').value;
    const dueDateConverted = convertDate(getDueDate);
    const getPriorityInput = document.querySelector('#set-priority').value;
    const getNotesValue = document.querySelector('#note').value;

    // checks for empty title value 
    if (getTitleInput === ''){
        return alert('Please insert a title');
    }

    var newItem = new itemFactory(getTitleInput, getDescriptionInput, dueDateConverted, getPriorityInput, getNotesValue);
    
    if (globalCurrentProject.currentProject.alreadyExists(newItem)){
        return alert('Task name already in use, please choose a different one.');
    }

    appendTaskToCurrentProject(newItem);

    createTaskVisual(newItem);
}

// execute task creation and closes task form 
function formCreateBtn () {
    createTask();

    // erase task form input values 
    eraseTaskFormInputValues();

    // closes task form 
    taskForm.style.display = 'none';
}

// empty box container 
function emptyBoxContainer () {
    boxContainer.innerHTML = '';
}


// create task on current task display 
const createTaskVisual = (item) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('box'); 

    for(var a in item){
            if (item[a] !== ''){
                let b = document.createElement('p');
                b.textContent = `${item[a]}`
                if(b.textContent !== '[object Object]') {
                    taskCard.appendChild(b);
                }
        }
    }

    boxContainer.appendChild(taskCard);
}

// // create task from project
const createTaskFromProjectTasks = () => {
    // console.log(globalCurrentProject.currentProject.tasks[0]);
    globalCurrentProject.currentProject.tasks.forEach(element => createTaskVisual(element));
    // for ()
    // createTaskVisual(globalCurrentProject.currentProject.tasks[0])
}

// create default task on screen 
createTaskVisual(defaultProject.tasks[0]);

// remove from display
function removeFromDisplay (object) {
    object.style.display = 'none'
};

// show on screen
function showOnScreen (something) {
    something.style.display = 'grid'
};

// task form create button action 
taskCreatBtn.addEventListener('click', formCreateBtn);

// open add task form
openAddTaskBtn.addEventListener('click', () => {
    taskForm.style.display = 'grid';
});

// close add task form 
function closeForm () {
    const formClosed = this.parentNode.style.display = 'none';
    return formClosed
}
closeAddTaskFormBtn.addEventListener("click", closeForm);

// open project form 
openAddProjectFormBtn.addEventListener('click', () => {
    projectForm.style.display = 'grid';
    });

// close project form 
closeProjectFormBtn.addEventListener('click', closeForm);


// erase task form values on inputs
const eraseTaskFormInputValues = () => {
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
 };