// let tasks = [
//   {
//     title: "Task1",
//     desc: "descr1",
//     staff: "Vali",
//     startDate: "01.25.2022",
//     finishDate: "01.25.2022",
//     status: "Pending",
//     price: 100,
//   },
//   {
//     title: "Task2",
//     desc: "descr2",
//     staff: "Zafar",
//     startDate: "01.25.2022",
//     finishDate: "01.25.2022",
//     status: "Doing",
//     price: 200,
//   },
//   {
//     title: "Task3",
//     desc: "descr3",
//     staff: "Dilshod",
//     startDate: "01.25.2022",
//     finishDate: "01.25.2022",
//     status: "Done",
//     price: 210,
//   },
//   {
//     title: "Task4",
//     desc: "descr4",
//     staff: "Dilshod",
//     startDate: "01.25.2022",
//     finishDate: "01.25.2022",
//     status: "Closed",
//     price: 2000,
//   },
//   {
//     title: "Task5",
//     desc: "descr5",
//     staff: "Vali",
//     startDate: "01.25.2022",
//     finishDate: "01.25.2022",
//     status: "Rejected",
//     price: 200,
//   },
// ];

// localStorage.setItem('tasks',JSON.stringify(tasks));

let tasks=JSON.parse(localStorage.getItem("tasks"))? JSON.parse(localStorage.getItem("tasks")) : [];

let workers = [];
let salary = [];


let myForm=document.forms["myForm"];
let title=document.forms["myForm"]["title"];
let desc=document.forms["myForm"]["desc"];
let staff=document.forms["myForm"]["staff"];
let startDate=document.forms["myForm"]["startDate"];
let finishDate=document.forms["myForm"]["finishDate"];
let status=document.forms["myForm"]["status"];
let price=document.forms["myForm"]["price"];
let tableBody=document.querySelector(".tableBody")

const countsalary=()=>{
  for(let i=0; i<tasks.length; i++){
    if(!workers.includes(tasks[i].staff)){
      workers.push(tasks[i].staff);
      salary.push({name:tasks[i].staff, count:0, price:0})
    }
  }
  for (let i=0; i<salary.length; i++){
    let counter=0;
    let price=0;
    for(let j=0;j<tasks.length; j++){
      if(salary[i].name===tasks[j].staff && tasks[j].status==="Closed"){
        counter++;
        price +=+tasks[j].price;
      }
    }
    salary[i].count=counter;
    salary[i].price=price;
  }

  let tableBodyHtml="";
  for (let i=0; i<salary.length;i++){
    tableBodyHtml +=`
    <tr>
    <th scope="row">${i+1}</th>
    <td>${salary[i].name}</td>
    <td>${salary[i].count}</td>
    <td>${salary[i].price}</td>
    </tr>
    `;
  }
  tableBody.innerHTML=tableBodyHtml;

};





const AddNewTask=()=>{
    let task={
        title:title.value,
        desc:desc.value,
        staff:staff.value,
        startDate:startDate.value,
        finishDate:finishDate.value,
        status:status.value,
        price:price.value
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    chiz();
}

const chiz=()=>{
  let pending=document.querySelector(".pending");
  let doing=document.querySelector(".doing");
  let done=document.querySelector(".done");
  let closed=document.querySelector(".closed");
  let rejected=document.querySelector(".rejected");
  pending.innerHTML="";
  doing.innerHTML="";
  done.innerHTML="";
  closed.innerHTML="";
  rejected.innerHTML="";
  tasks.forEach((task, index)=>{
    if (task.status==="Pending"){      
     pending.innerHTML +=`<h3>${task.staff}</h3>
                        <h4>${task.title}</h4>
                        <h5>Price:${task.price}</h5>
                        <p class="text-truncate">Desc:${task.desc}</p>
                        <p><b>Start date: </b>${task.startDate}</p>
                        <p><b>Finish date: </b>${task.finishDate}</p>
                        <select name="staff" class="form-control mb-2" id="mySelect${index}">
                          <option value="">Select status</option>
                          <option value="Doing">Doing</option>
                          <option value="Done">Done</option>
                        </select>
                        <div class="d-flex align-items-center justify-content-between">
                          <button class="btn btn-warning text-white" onclick="editStatus(${index})">
                            Edit status
                          </button>
                          <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
                        </div> 
                        <hr>
        `;
    } else if (task.status==="Doing"){
      doing.innerHTML +=`<h3>${task.staff}</h3>
                        <h4>${task.title}</h4>
                        <h5>Price:${task.price}</h5>
                        <p class="text-truncate">Desc:${task.desc}</p>
                        <p><b>Start date: </b>${task.startDate}</p>
                        <p><b>Finish date: </b>${task.finishDate}</p>
                        <select name="staff" class="form-control mb-2" id="mySelect${index}">
                          <option value="">Select status</option>
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                        </select>
                        <div class="d-flex align-items-center justify-content-between">
                          <button class="btn btn-warning text-white" onclick="editStatus(${index})">
                            Edit status
                          </button>
                          <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
                        </div> 
        `;
    }else if (task.status==="Done"){
      done.innerHTML +=`<h3>${task.staff}</h3>
                        <h4>${task.title}</h4>
                        <h5>Price:${task.price}</h5>
                        <p class="text-truncate">Desc:${task.desc}</p>
                        <p><b>Start date: </b>${task.startDate}</p>
                        <p><b>Finish date: </b>${task.finishDate}</p>
                        <select name="staff" class="form-control mb-2" id="mySelect${index}">
                          <option value="">Select status</option>
                          <option value="Pending">Pending</option>
                          <option value="Doing">Doing</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <button class="btn btn-warning text-white" onclick="editStatus(${index})">
                            Edit status
                          </button>
                          <button class="btn btn-danger" onclick="deleteTask(${index} )">Delete</button>
                        </div> 
                          <button class="btn btn-secondary" onclick="rejectTask(${index})">Rejected</button>
                        
        `;
    }else if (task.status==="Closed"){
      closed.innerHTML +=`<h3>${task.staff}</h3>
                        <h4>${task.title}</h4>
                        <h5>Price:${task.price}</h5>
                        <p class="text-truncate">Desc:${task.desc}</p>
                        <p><b>Start date: </b>${task.startDate}</p>
                        <p><b>Finish date: </b>${task.finishDate}</p>
                      <hr>
        `;
    }else if (task.status==="Rejected"){
      rejected.innerHTML +=`<h3>${task.staff}</h3>
                        <h4>${task.title}</h4>
                        <h5>Price:${task.price}</h5>
                        <p class="text-truncate">Desc:${task.desc}</p>
                        <p><b>Start date: </b>${task.startDate}</p>
                        <p><b>Finish date: </b>${task.finishDate}</p>                  
        `;
    }
  });

  myForm.reset();

} 
chiz();


const deleteTask = index => {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  chiz();
};

const rejectTask = index => {
  tasks[index].status = "Rejected";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  chiz()
};



const editStatus=index=>{
  let mySelect=document.getElementById(`mySelect${index}`)
  console.log(mySelect.value);
  if (mySelect.value!=""){
    tasks[index].status=mySelect.value;
}
  localStorage.setItem("tasks", JSON.stringify(tasks));
  chiz();
};



// localeStorage
// JSON

// localStorage.setItem(name,"Zafar");
// console.log(localStorage.getItem(name))

// localStorage.setItem("odam",JSON.stringify({name:"Zafar"}));
// console.log(JSON.parse(localStorage.getItem("odam")).name);

// localStorage.setItem("number",[1,2,3,4,5]);
// console.log(localStorage.getItem("number"));

// localStorage.setItem("arr",JSON.stringify([1,2,3,4,5]));
// console.log(JSON.parse(localStorage.getItem("arr")));




