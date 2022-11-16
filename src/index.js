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
    removeTask(projectTitle) {
        this.tasks = this.tasks.filter(task => task.title !== projectTitle)
        console.log(this.tasks);
    }
};

// create default project 
const defaultProject = new Project('Default');

// create first task 
// const learnCode = new itemFactory('learn code', 'JavaScript, HTML, CSS', '10/11/2022', 'high', 'already doing it')

// add a first task to default project 
// defaultProject.addTask(learnCode);

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

    removeProject(projectName) {
        this.projects = this.projects.filter((project) => project.projectTitle !== projectName)
        console.log(this.projects);
    }
};

// create default library
const defaultLibrary = new ProjectLibrary();

const localSave = () => {
    localStorage.setItem('firstLoad', JSON.stringify(defaultLibrary));
}

const localLoad = () => {
    var localDefaultLibraryString = JSON.parse(localStorage.getItem('firstLoad'));
    Object.assign(defaultLibrary, localDefaultLibraryString);
    globalThis.localDefaultLibraryString;
}

// current project
const globalCurrentProject = () => {
    var currentProject = defaultProject;
}

// globalCurrentProject.currentProject = defaultProject;
// console.log(defaultLibrary);
// // add default project to default library
// defaultLibrary.addProject(defaultProject);

// append project to project list 
function appendProjectToProjectList (element) {
    const projectContentContainer = document.createElement('div');
    projectContentContainer.className = 'project-text-content'
    const createListItem = document.createElement('li');
    createListItem.style.cursor = 'pointer';
    const projectTrashCan = document.createElement('i');
    projectTrashCan.className = 'fa-solid fa-trash';
    sidebarProjectListUl.appendChild(projectTrashCan);

    projectTrashCan.addEventListener('click', () => {
        let projectToBeDeletedTitle = projectTrashCan.parentElement.firstChild.textContent;
        defaultLibrary.removeProject(projectToBeDeletedTitle);

        // saves local library after it removes a project 
        // localLoad()
        localSave();

        projectTrashCan.parentElement.remove();
        if (projectToBeDeletedTitle === globalCurrentProject.currentProject.projectTitle){
            projectTitle.innerHTML = '';
            emptyBoxContainer(); 
        }
    })
    
    createListItem.addEventListener('click', () => {
        globalCurrentProject.currentProject = element;
        projectTitle.textContent = element.projectTitle;
        emptyBoxContainer(); 
        createTaskFromProjectTasks();
    })

    createListItem.textContent = element.projectTitle;
    projectContentContainer.appendChild(createListItem);
    projectContentContainer.appendChild(projectTrashCan);
    sidebarProjectListUl.appendChild(projectContentContainer);


    // change the current project to the one being created 
    globalCurrentProject.currentProject = element;

    // change displayed project text title to this 
    projectTitle.textContent = element.projectTitle;

    emptyBoxContainer();

}

// // append default project to projects list 
// appendProjectToProjectList(defaultProject);

// add project from form 
createProjectBtn.addEventListener('click', () => {
    let createNewProject = new Project(projectFormInput.value);

    // checks if name has already been taken 
    if (defaultLibrary.isInLibrary(createNewProject)){
        return alert('Project name already exists');
    }
    defaultLibrary.addProject(createNewProject);
    appendProjectToProjectList(createNewProject);

    // tests if it's saving new projects on localSave 
    localSave();
    // localSave();
 
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
        const resetDate = `${dateElement}T00:00:00`
        console.log(resetDate)
        const newDateFormat = new Date(resetDate);
        // console.log(newDateFormat);
        const dateFormated = dateConvert(newDateFormat);
        // console.log(dateFormated);
        return dateFormated
    } else {
        return ''
    }
}

// globalCurrentProject.currentProject.addTask('ASDASD');
// console.log(globalCurrentProject.currentProject)

// add task from form to current project
const createTask = () => {
    const getTitleInput = document.querySelector('#title').value;
    const getDescriptionInput = document.querySelector("#set-description").value;
    const getDueDate = document.querySelector('#duedate').value;
    // console.log(getDueDate);
    const dueDateConverted = convertDate(getDueDate);
    // console.log(dueDateConverted);
    const getPriorityInput = document.querySelector('#set-priority').value;
    const getNotesValue = document.querySelector('#note').value;

    // checks for empty title value 
    if (getTitleInput === ''){
        return alert('Please insert a title');
    }

    var newItem = new itemFactory(getTitleInput, getDescriptionInput, dueDateConverted, getPriorityInput, getNotesValue);
    
    // console.log(globalCurrentProject.currentProject);

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

    const trashCan = document.createElement('i');
    trashCan.addEventListener('click', () => {
        let taskTitle = trashCan.parentElement.firstChild.textContent;
        globalCurrentProject.currentProject.removeTask(taskTitle);
        trashCan.parentElement.remove();
        localSave();
    });
    trashCan.className = 'fa-solid fa-trash';
    taskCard.appendChild(trashCan);
    boxContainer.appendChild(taskCard);
    localSave();
}

// // create task from project
const createTaskFromProjectTasks = () => {
    globalCurrentProject.currentProject.tasks.forEach(element => createTaskVisual(element));
}

// create default task on screen 
// createTaskVisual(defaultProject.tasks[0]);

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



const createVisualProjects = (defaultLibrary) => {
    defaultLibrary.projects.forEach(e => appendProjectToProjectList(e))
    defaultLibrary.projects.forEach((project) => {
        const proto = Object.getPrototypeOf(defaultProject);
        Object.setPrototypeOf(project, proto);
    });
}

function onPageLoad () {
        localLoad()
        if(defaultLibrary.projects.length === 0) {
        // create first task 
        const learnCode = new itemFactory('learn code', 'JavaScript, HTML, CSS', '10/11/2022', 'high', 'already doing it');

        // add a first task to default project 
        defaultProject.addTask(learnCode);

        //add defaultProject to defaultLibrary
        defaultLibrary.addProject(defaultProject);

        // show defaultProject on screen 
        // appendProjectToProjectList(defaultProject);

        // show learnCode on screen 
        createTaskVisual(learnCode);

        // console.log('ASDASD')
        }
        createVisualProjects(defaultLibrary);
        for(var i = 0; i < defaultLibrary.projects[0].tasks.length; i++){
        createTaskVisual(defaultLibrary.projects[0].tasks[i]);
        }
}

onPageLoad();

//  get today date 
const todayDate = new Date();
const todayDateConverted = dateConvert(todayDate);

// tests if it's equals to today date to show on screen 
function checkDueDate (c) {
    // console.log(todayDateConverted);
    if(c.dueDate === todayDateConverted){
        createTaskVisual(c);
    }
}

// loop through tasks 
const loopThroughTasks = (projectWithTasks) => {
    // console.log(projectWithTasks.tasks[0])
    projectWithTasks.tasks.forEach(element => checkDueDate(element));
}

// loop through each project of the projectlibrary 
const loopThroughProjects = () => {
    for(var i = 0; i < defaultLibrary.projects.length; i++){
        // console.log(defaultLibrary.projects[i])
        loopThroughTasks(defaultLibrary.projects[i]);
        // console.log('asd')
    }
} 

const todaySelector = document.querySelector('#today');
const changeTodaySelectorCursor = (() => {return todaySelector.style.cursor = 'pointer';})();

todaySelector.addEventListener('click', function()  {
    projectTitle.textContent = 'Today';
    emptyBoxContainer();
    loopThroughProjects();
});

// see next week days 
const nextWeek = ((date) => {
    const anotherDate = new Date();
    const today = dateConvert(anotherDate);
    const dayTwo = dateConvert(addDays(anotherDate, 1));
    const dayThree = dateConvert(addDays(anotherDate, 2));
    const dayFour = dateConvert(addDays(anotherDate, 3));
    const dayFive = dateConvert(addDays(anotherDate, 4));
    const daySix = dateConvert(addDays(anotherDate, 5));
    const daySeven = dateConvert(addDays(anotherDate, 6));
    const dayEigth = dateConvert(addDays(anotherDate, 7));

    return {today, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven, dayEigth}

})();

function checkDueDateNextWeek (c) {
    if(c.dueDate === nextWeek.today || c.dueDate === nextWeek.dayTwo || c.dueDate === nextWeek.dayThree || c.dueDate === nextWeek.dayFour || 
        c.dueDate === nextWeek.dayFive || c.dueDate === nextWeek.daySix
        || c.dueDate === nextWeek.daySeven || c.dueDate === nextWeek.dayEigth){
        createTaskVisual(c);
    }
}

const loopThroughTasksWeek = (projectWithTasks) => {
    projectWithTasks.tasks.forEach(element => checkDueDateNextWeek(element));
}

// loop through each project of the projectlibrary 
const loopThroughProjectsWeek = () => {
    for(var i = 0; i < defaultLibrary.projects.length; i++){
        loopThroughTasksWeek(defaultLibrary.projects[i]);
    }
} 


const upcomingSelector = document.querySelector('#upcoming');
const changeUpcomingSelectorCursor = (() => {return upcomingSelector.style.cursor = 'pointer';})();

upcomingSelector.addEventListener('click', function()  {
    projectTitle.textContent = 'Upcoming';
    emptyBoxContainer();
    loopThroughProjectsWeek();
});