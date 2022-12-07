let addBtn = document.querySelector(".add-btn");

let removeBtn = document.querySelector(".remove-btn");

let mainCont = document.querySelector(".main-cont");

let modalCont = document.querySelector(".modal-cont");

let textareaCont = document.querySelector(".textarea-cont");

let allPriorityColor = document.querySelectorAll(".priority-color");

let toolboxColor = document.querySelectorAll(".color");



let colors = ["lightpink", "lightblue", "lightgreen", "black"];

let modalPriorityColor = colors[colors.length - 1];


let addFlag = false;

let removeFlag = false;



let lockClass = "fa-lock";

let unlockClass = "fa-lock-open";



let ticketArr = [];



if(localStorage.getItem("haha")){

    
    
    ticketArr = JSON.parse(localStorage.getItem("haha"));
    ticketArr.forEach((ticketObj) =>{
    
        createTicket(ticketObj.ticketColor , ticketObj.ticketTask , ticketObj.ticketID);
    
    })
}




for(let i = 0 ;  i < toolboxColor.length ; i++){

    toolboxColor[i].addEventListener("click" , (e) =>{

        let currentToolboxColor = toolboxColor[i].classList[0];


        
        let filteredTickets = ticketArr.filter((ticketObj , idx) =>{
        
            return currentToolboxColor === ticketObj.ticketColor;
        
        })
        

        
        
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        
        for(let i=0 ; i < allTicketsCont.length ; i++){
        
            allTicketsCont[i].remove();
        
        }
        

        

        
        filteredTickets.forEach((ticketObj, idx) =>{
        
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask , ticketObj.ticketID);
        
        })


    })

    toolboxColor[i].addEventListener("dblclick" , (e) =>{
    
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
    
        for(let i=0 ; i < allTicketsCont.length ; i++){
    
            allTicketsCont[i].remove();
    
        }
    
        ticketArr.forEach((ticketObj , idx) =>{
    
            createTicket(ticketObj.ticketColor , ticketObj.ticketTask , ticketObj.ticketID);
    
        })
    })
}






allPriorityColor.forEach((ColorElem, idx) => {

    ColorElem.addEventListener("click", (e) => {

        allPriorityColor.forEach((priorityColorElem, idx) => {

            priorityColorElem.classList.remove("border");

        })

        ColorElem.classList.add("border");


        modalPriorityColor = ColorElem.classList[0];

    })

})



addBtn.addEventListener("click", (e) => {

    
    
    addFlag = !addFlag;
    
    if (addFlag) {
    
        modalCont.style.display = "flex";
    
    } else {
    
        modalCont.style.display = "none";
    
    }
})




removeBtn.addEventListener("click", (e) => {

    removeFlag = !removeFlag;


})




modalCont.addEventListener("keydown", (e) => {

    let key = e.key;

    if (key === "Enter") {

        createTicket(modalPriorityColor, textareaCont.value);

        addFlag = false;

        setModalToDefault();

    }

})



function createTicket(ticketColor, ticketTask, ticketID) {

    let id = ticketID || shortid();
    let ticketCont = document.createElement("div");

    ticketCont.setAttribute("class", "ticket-cont");

    ticketCont.innerHTML = `

    <div class = "ticket-color ${ticketColor}"></div>

    <div class="ticket-id">#${ticketID}</div>

    <div class="task-area">${ticketTask}</div>

    <div class="ticket-lock">

    <i class="fa-solid fa-lock"></i>

    </div>

    `;


    mainCont.appendChild(ticketCont);


    

    
    if(!ticketID) {
    
        
        
        ticketArr.push({ticketColor , ticketTask , ticketID : id});
        
        localStorage.setItem("haha",JSON.stringify(ticketArr));
    }



    
    handleRemoval(ticketCont ,id);
    
    handleLock(ticketCont , id);
    
    handleColor(ticketCont , id);
}




function handleRemoval(ticket , id) {

    //removeFlag -> true -> remove

    ticket.addEventListener("click" , (e) =>{

        if(!removeFlag) return ;

        
        
        let idx = getTicketIdx(id);
        //DB removal
        
        ticketArr.splice(idx , 1);
        
        let strTicketArr = JSON.stringify(ticketArr);
        
        localStorage.setItem("haha", strTicketArr);
        
        ticket.remove(); // UI removal
    })

}






function handleLock(ticket , id) {

    let ticketLockElem = ticket.querySelector(".ticket-lock");

    let ticketLock = ticketLockElem.children[0];

    let ticketTaskArea = ticket.querySelector(".task-area");

    ticketLock.addEventListener("click", (e) => {

        let ticketIdx = getTicketIdx(id);
        if (ticketLock.classList.contains(lockClass)) {

            ticketLock.classList.remove(lockClass);

            ticketLock.classList.add(unlockClass);

            ticketTaskArea.setAttribute("contenteditable", "true");

        } else {

            ticketLock.classList.remove(unlockClass);

            ticketLock.classList.add(lockClass);

            ticketTaskArea.setAttribute("contentedittable", "true");

        }

        
        
        ticketArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
        localStorag.setItem("haha",JSON.stringify(ticketArr));
    })

}




function handleColor(ticket ,id) {

    let ticketColor = ticket.querySelector(".ticket-color");

    ticketColor.addEventListener("click", (e) => {

        
        
        let ticketIdx = getTicketIdx(id);
        

        
        let currentTicketColor = ticketColor.classList[1];
        

        let currentTicketColorIdx = colors.findIndex((color) => {
        
            return currentTicketColor === color;
        })
        
        currentTicketColorIdx++;
        
        let newTicketColorIdx = currentTicketColorIdx % colors.length;
        
        let newTicketColor = colors[newTicketColorIdx];
        
        ticketColor.classList.remove(currentTicketColor);
        
        ticketColor.classList.add(newTicketColor);


        
        
        ticketArr[ticketIdx].ticketColor = newTicketColor;
        
        localStorage.setItem("haha" , JSON.stringify(ticketArr));
    })  

}




function getTicketIdx(id) {

    let ticketIdx = ticketArr.findIndex((ticketObj) =>{

        return ticketObj.ticketID == id;

    })
    return ticketIdx;

}



function setModalToDefault(){

    modalCont.style.display = "none";

    textareaCont.value = "";

    allPriorityColor.forEach((priorityColorElem, idx) => {

        priorityColorElem.classList.remove("border");

    })
    allPriorityColor[allPriorityColor.length - 1].classList.add("border");


}




