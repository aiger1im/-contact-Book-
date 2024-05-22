const API = 'http://localhost:8000/todo'
let inp = document.querySelector('.inp')
let btn = document.querySelector(".btnadd")
let inp2 = document.querySelector(".inp2")
let inp3 = document.querySelector(".inp3")
let inp4 = document.querySelector(".inp4")
let ul = document.querySelector("ul")
btn.addEventListener('click',()=>{
    if(!inp.value.trim() || !inp2.value.trim() || !inp3.value.trim() || !inp4.value.trim()){
        alert("Введите данные")
    }let newTodo = {
        todo: inp.value,
        todo1: inp2.value,
        todo3:inp3.value,
        todo4: inp4.value
    }
    createTodo(newTodo)
    readTask()
    inp.value = ''
    inp2.value = ''
    inp3.value = ''
    inp4.value = ''
    
})

function createTodo (todo){
    fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json;charset=utf-8"
        },body: JSON.stringify(todo)
    }).then(()=>readTask())
}

function readTask(){
    fetch(API).then((res)=>{
        return res.json()
    }).then((data)=>{
        ul.innerHTML = ''
        data.forEach((elem)=>{
           ul.innerHTML += `
           <li> ${elem.todo}  ${elem.todo1}  ${elem.todo3}  ${elem.todo4}
           <button id="${elem.id}" class="btnDElete">Delete<button>
           <button id="${elem.id}" class="btnEdit">Edit<button>
           <li>
           ` 
        })
    })
}

readTask()

document.addEventListener('click',(e)=>{

    let del_class = [...e.target.classList]
    let id = e.target.id
    if(del_class.includes("btnDElete")){
        fetch(`${API}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            }
        }).then(()=>readTask())
    }
})

let inpEdit = document.querySelector(".inpEdit")
let btneditSave = document.querySelector(".btneditSave")
let div = document.querySelector(".editmodal")

document.addEventListener("click", (e)=>{
    let id = e.target.id
    let edit_class = [...e.target.classList]
    if(edit_class.includes("btnEdit")){
        div.style.display = 'block'
        fetch(`${API}/${id}`).then((res)=>{
            return res.json()
        }).then((data)=>{
            inpEdit.value = data.todo
            btneditSave.setAttribute("id",data.id)
        })
    }})
    btneditSave.addEventListener('click',(e)=>{
        // console.log(e)
        if(!inpEdit.value.trim()){
            alert("Введите данные")
        }let editTodo = {
            todo: inpEdit.value
        }
        editedTodo(editTodo,btneditSave.id)
        div.style.display = 'none'
    })

function editedTodo(newTodo,id){
    fetch(`${API}/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json;charset=utf-8"
        },body: JSON.stringify(newTodo)
    }).then(()=>readTask())
}



