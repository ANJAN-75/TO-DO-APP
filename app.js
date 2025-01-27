let tasks=[]; 
const saveTask=()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const addTask=()=>{
    const taskInput=document.querySelector("#taskInput");
    const text=taskInput.value.trim();
    if(text){
        tasks.push({text:text, completed:false});
        taskInput.value="";
        updateTasklist();
        updateStats();
        saveTask();
    }
}
const toggletestComplete=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    console.log({tasks});
    updateTasklist();
    updateStats();
    saveTask();
}
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasklist();
    updateStats();
    saveTask();
}
const editTask=(index)=>{
    const taskInput=document.querySelector("#taskInput")
    taskInput.value=tasks[index].text;
    
    tasks.splice(index,1);
    updateTasklist();
    updateStats();
    saveTask();
}
const updateStats =()=>{
    const completeTasks=tasks.filter(task=>task.completed).length;
    const totalTask=tasks.length;
    const pogress=(completeTasks/totalTask)*100;
    const progressBar =document.querySelector("#progress");
    progressBar.style.width=`${pogress}%`;
    document.querySelector("#number").innerText=`${completeTasks}/${totalTask}`;
}
const updateTasklist=()=>{
    const tasklist=document.querySelector("#task-list");
    tasklist.innerHTML="";
    tasks.forEach((task,index)=>{
        const listiteam=document.createElement("li");
        listiteam.innerHTML=`
         <div class="taskIteam">
             <div class="task ${task.completed ? 'completed' : ''}">
                 <input type="checkbox" class="checkbox"${task.completed ? 'checked' : ''}>
                 <p>${task.text}</p>
             </div>
             <div class="icons">
                 <img src="edit.png" onclick="editTask(${index})">
                 <img src="bin.png"onclick="deleteTask(${index})">
             </div>
         </div>
        
       `
       listiteam.querySelector(".checkbox").addEventListener("change", () => {
        toggletestComplete(index);
    });
    
       tasklist.append(listiteam);
    
        
    })
    
}

document.querySelector("#add-task").addEventListener("click",(e)=>{
    e.preventDefault();
    addTask();
})
