// const Birthdate  =  new Date('06/04/2021');
// // console.log(date.getUTCDate());
// // console.log(date.toUTCString());

// const currentDate = new Date();


// const year = currentDate.getFullYear();
// const month = currentDate.getMonth();
// const day = currentDate.getDay();
// const date = currentDate.getDate();

// console.log(day,year,month)

// console.log(Date.now())
// console.log(Date.now()

// list to store my records;
"use strict";

const meetingRecords ={};

const emailInput = document.querySelector("#email");
const Enterbtn = document.querySelector("#enter");
const leavebtn = document.querySelector("#leave");
const durationbtn = document.querySelector("#duration");
const tableBody = document.querySelector("#table-body");
const tableBodyGen = document.querySelector("#table-body-gen");


Enterbtn.addEventListener("click", adduserhandler);
leavebtn.addEventListener("click", exituserHandler);
durationbtn.addEventListener("click",generateDuration);


function adduserhandler() {
const email = emailInput.value;
if(!email ==""){



if(!meetingRecords[email]) {
    meetingRecords[email] = []
}
let lastIndex = meetingRecords[email].length-1;
let previousEntry = meetingRecords[email][lastIndex];

//Check if user is already in the meeting
if(previousEntry && !previousEntry.left){
return alert ("You have already joined the meeting");
}
    
const entryTime = new Date().toUTCString();
meetingRecords[email].push({joined:entryTime}) 

}
updateDom();
}

function exituserHandler(){
    const email = emailInput.value;
    const leftTime = new Date().toUTCString();

    //check if the user has already left the meeting;
    let lastIndex = meetingRecords[email].length-1;
    let previousEntry = meetingRecords[email][lastIndex];

    if(previousEntry && previousEntry.left){
        return alert("You have already left");
    }
    //This is where the .left is defined.
    meetingRecords[email][lastIndex].left = leftTime;
updateDom();
}

function generateDuration(){
const frag = new DocumentFragment();

for(let email in meetingRecords){
    for(let record of meetingRecords[email]){

        let joinedTime = new Date(record.joined);
        let leftTimeT = new Date(record.left);
   //const meetingduration = Math.abs(leftTimeT -joinedTime);
    const meetingduration =leftTimeT.getSeconds()-joinedTime.getSeconds();               const newRow = document.createElement('tr');
    newRow.innerHTML=`
    <td>${email}</td>
       <td>${meetingduration|| '-'}</td>`;
        frag.append(newRow)

    }
}
tableBodyGen.innerHTML ="";
tableBodyGen.append(frag);
}
function updateDom(){
    const frag = new DocumentFragment();

for(let email in meetingRecords){
    for(let record of meetingRecords[email]){
       const newRow = document.createElement('tr');
    newRow.innerHTML=`
    <td>${email}</td>
    <td>${record.joined}</td>
        <td>${record.left || '-' }</td>`;
        frag.append(newRow)

    }
}

tableBody.innerHTML ="";
tableBody.append(frag);
}

