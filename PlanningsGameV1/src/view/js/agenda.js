//Init variables


let selectedDaysArray = [];
let alreadySelectedId = -1;
let currentPatient = "koekje";
let days = ""
const htmlDays = document.querySelector(".days");
let addedWeeksToArrayNr = 0;
let week = 0;

//tableBody = document.getElementById('patientTable');
//let currentPatient = tableBody.rows[1].cells[1].innerHTML;

//Create initial DataArray
addWeekToArray();

renderAgenda();

document.querySelector(".prev").addEventListener("click", () => {
  if(week > 0)
  {
    week -= 1;
  renderAgenda();
  }
  
});

document.querySelector(".next").addEventListener("click", () => {
  week += 1;
  if(week>addedWeeksToArrayNr)
  { 
    addedWeeksToArrayNr += 1;
    addWeekToArray();
  }
  renderAgenda();
  console.log(selectedDaysArray);
});

// Adds week to selectdDaysArray
function addWeekToArray()
{
  selectedDaysArray.push([]);
  for (let i=0; i<=41; i++)
  { 
    
    selectedDaysArray[week].push(false);
    
    //selectedDaysArray[0].push(currentPatient);    
  } 
}

//Display Agenda
function renderAgenda() 
{
  console.log(week);
  days = "";
  

  alreadySelectedId = -1;
  for (let i=0; i<=41; i++)
  {
    if( selectedDaysArray[week][i] == false)
    {
    //days += `<div id=day${i} onClick="selectDay(this.id)">${i}</div>`;
    days += `<div class=day id=d${i}>${i}</div>`;
    }
    else
    {
      days += `<div class="day, selectedDay" id=d${i}>${selectedDaysArray[week][i]}</div>`;
    }  
  }
  console.log(days);
  htmlDays.innerHTML = days;

  addEventlistenerToDays()

  document.getElementById('h2Weeknr').innerHTML= week + 1 ;
  
}

//apType (appointment type): '0' stands for oncollogy and '1' stand for chemo
function addSelectedDay(apType)
{
  tableBody = document.getElementById('patientTable');
  currentPatient = tableBody.rows[1].cells[1].innerHTML;
  let avDay = tableBody.rows[1].cells[3].innerHTML;
  
  //try: check if a slot is selected
  try{
    //get the id from your agenda
    let a = alreadySelectedId.match(/\d+/).input;
    
    //checking the day number and the slot number and type
    /*let idArray = a.split("_")
    let strArray = idArray[0].split("d");*/
    let strArray = a.split("d");
    let dayNr = parseInt(strArray[1],10);
    /*let oID = idArray[1].split("o");
    let cID = idArray[1].split("c");
    let slotType; // '0' stands for oncollogy and '1' stand for chemo
    if(cID == ""){
      let slotNr = oID;
      slotType = 0;
    }
    else{
      let slotNr = cID;
      slotType = 1;
    }

    //check if the patient is allocated to the correct day
    if(avDay == "Monday"){
      if(dayNr == 1 && slotType == apType){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }*/
    if(avDay == "Monday"){
      if([0,7,14,21,28,35].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }
    else if(avDay == "Tuesday"){
      if([1,8,15,22,29,36].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }
    else if(avDay == "Wednesday"){
      if([2,9,16,23,30,37].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }
    else if(avDay == "Thursday"){
      if([3,10,17,24,31,38].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }
    else if(avDay == "Friday"){
      if([4,11,18,25,32,39].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }
    else if(avDay == "Saturday"){
      if([5,12,19,26,33,40].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('The patient has not been allocated to a correct timeslot!');
      }
    }
    else if(avDay == "Sunday"){
      if([6,13,20,27,34,41].includes(dayNr)){
        add(currentPatient, dayNr);
      }
      else{
        window.alert('No timeslot has been selected!\nClick on skip if you are not able to allot a correct timeslot to the patient.');
      }
    }
  }
  catch{
    window.alert('The patient has not been alloted a correct timeslot or no timeslot has been selected!\nClick on skip if you are not able to allot a correct timeslot to the patient.');
  }
}

function add(currentPatient, dayNr){
  let a = nextPatientEvent();
  if(a <= 1){
    document.getElementById(alreadySelectedId).innerHTML= currentPatient;
    selectedDaysArray[week][dayNr] = currentPatient;
    alreadySelectedId = -1;
  }
}

function addEventlistenerToDays()
{
  document.querySelectorAll(".day").forEach
  (day => {
    day.addEventListener("click", event => {
      
      if(event.currentTarget.classList.value == "day")
      {
        if(alreadySelectedId!=-1)
        {
          document.getElementById(alreadySelectedId).classList.remove("selectedDay");
        }

        alreadySelectedId = event.currentTarget.id;
        event.currentTarget.classList.add("selectedDay");
      }
      else
      {

        if(alreadySelectedId != -1)
        {
          event.currentTarget.classList.remove("selectedDay");
        }     
      }            
    });
  });
}
