//store document elements that will change on screen into const variables

const redTotEl = document.getElementById("red-total")
const yelTotEl = document.getElementById("yel-total")
const grnTotEl = document.getElementById("grn-total")
const bluTotEl = document.getElementById("blu-total")
const penTotEl = document.getElementById("pen-total")
const finTotEl = document.getElementById("final-total")
const redBtns = document.getElementsByClassName("red-btn")
const yelBtns = document.getElementsByClassName("yel-btn")
const grnBtns = document.getElementsByClassName("grn-btn")
const bluBtns = document.getElementsByClassName("blu-btn")
const penBtns = document.getElementsByClassName("pen-btn")

//Set up empty arrays that will store selected values of each color, empty counter variables that will keep track of # of selections for each color/penalty

let redArr = []
let yelArr = []
let grnArr = []
let bluArr = []
let penArr = []
let redCount = 0
let yelCount = 0
let grnCount = 0
let bluCount = 0
let penCount = 0

//Call resetBtns() upon reloading program.
resetBtns()
//Function that will reset all buttons to be enabled/disabled and with the correct text color to start the game.
function resetBtns() {
  for (let i = 0; i < redBtns.length; i++) {
    redBtns[i].disabled = false;
    yelBtns[i].disabled = false;
    grnBtns[i].disabled = false;
    bluBtns[i].disabled = false;
  }
  for (let i = 0; i < 4; i++) {
    penBtns[i].disabled = false;
    penBtns[i].style.color = "white";
  }
  document.getElementById("r12").disabled = true;
  document.getElementById("y12").disabled = true;
  document.getElementById("g2").disabled = true;
  document.getElementById("b2").disabled = true;
  document.getElementById("rL").disabled = true;
  document.getElementById("yL").disabled = true;
  document.getElementById("gL").disabled = true;
  document.getElementById("bL").disabled = true;
}
//Function that activates whenever a "value" button is clicked. 
function checkBox(arr,val,id,colorLtr) {
  arr.push(val)
  document.getElementById(`${colorLtr}${val}`).textContent = "X"
  countUpdate()
  checkColorCounterAndCheckFor12or2(colorLtr)
  disablePriorBtns(colorLtr,val,arr)
  finScoreCalc()
}

function countUpdate() {
  redCount = redArr.length
  yelCount = yelArr.length
  grnCount = grnArr.length
  bluCount = bluArr.length
}

function checkFor12or2(cntr,colorLtr) {
  if (cntr >= 5) {
    if (colorLtr === "r" || colorLtr === "y"){
      document.getElementById(`${colorLtr}12`).disabled = false;
      document.getElementById(`${colorLtr}L`).disabled = false;
    } else if (colorLtr === "g" || colorLtr === "b"){
      document.getElementById(`${colorLtr}2`).disabled = false;
      document.getElementById(`${colorLtr}L`).disabled = false;
    }
  } else {
    if (colorLtr === "r" || colorLtr === "y"){
      document.getElementById(`${colorLtr}12`).disabled = true;
      document.getElementById(`${colorLtr}L`).disabled = true;
    } else if (colorLtr === "g" || colorLtr === "b"){
      document.getElementById(`${colorLtr}2`).disabled = true;
      document.getElementById(`${colorLtr}L`).disabled = true;
    }
  }
}

function checkColorCounterAndCheckFor12or2(colorLtr) {
  if (colorLtr === "r"){
    checkFor12or2(redCount,"r")
  } else if (colorLtr === "y"){
    checkFor12or2(yelCount,"y")
  } else if (colorLtr === "g"){
    checkFor12or2(grnCount,"g")
  } else if (colorLtr === "b"){
    checkFor12or2(bluCount,"b")
  } 
}

function disablePriorBtns(colorLtr,btnVal,arr){
  if (colorLtr === "r" || colorLtr === "y"){
    for (let i = 2; i <= btnVal; i++) {
      document.getElementById(`${colorLtr}${i}`).disabled = true;
    } 
    if (btnVal === "12") {
      arr.push("L")
      countUpdate()
      document.getElementById(`${colorLtr}L`).disabled = true;
      document.getElementById(`${colorLtr}L`).textContent = "X"
      document.getElementById(`${colorLtr}L`).style.color = "black"
    }
  } else if (colorLtr === "g" || colorLtr=== "b"){
    for (let i = 12; i >= btnVal; i--) {
      document.getElementById(`${colorLtr}${i}`).disabled = true;
    } 
    if (btnVal === "2") {
      arr.push("L")
      countUpdate()
      document.getElementById(`${colorLtr}L`).disabled = true;
      document.getElementById(`${colorLtr}L`).textContent = "X"
      document.getElementById(`${colorLtr}L`).style.color = "black"
    }
  }
}

function scoreCalc(counter) {
  return (counter * (counter + 1)) / 2
}

function finScoreCalc() {
  let redTot = scoreCalc(redCount)
  let yelTot = scoreCalc(yelCount)
  let grnTot = scoreCalc(grnCount)
  let bluTot = scoreCalc(bluCount)
  let penTot = penCount * 5
  let finTot = redTot + yelTot + grnTot + bluTot - penTot
  redTotEl.textContent = redTot
  yelTotEl.textContent = yelTot
  grnTotEl.textContent = grnTot
  bluTotEl.textContent = bluTot
  penTotEl.textContent = penTot
  finTotEl.textContent = finTot
}

function undoLastMove(arr,colorLtr) {
  if (arr.length > 0){
    let lastMoveStr = arr[arr.length-1]
    let lastMoveInt = parseInt(lastMoveStr)
    let scndToLastMoveInt = parseInt(arr[arr.length-2])
    let thrdToLastMoveInt = parseInt(arr[arr.length-3])
    if (colorLtr === "r" || colorLtr === "y"){
      if (lastMoveInt === 2){
        document.getElementById(`${colorLtr}2`).disabled = false;
        document.getElementById(`${colorLtr}2`).textContent = 2
      } else if (lastMoveInt > 2 && lastMoveInt < 12){
        if (arr.length === 1) {
          for (let i = 2; i <= lastMoveInt; i++){
            document.getElementById(`${colorLtr}${i}`).disabled = false;
          }
          document.getElementById(`${colorLtr}${lastMoveInt}`).textContent = lastMoveInt
        }
        for (let i = scndToLastMoveInt + 1; i <= lastMoveInt; i++) {
          document.getElementById(`${colorLtr}${i}`).disabled = false;
        }
        document.getElementById(`${colorLtr}${lastMoveInt}`).textContent = lastMoveInt
        
      } else if (lastMoveStr === "L") {
        document.getElementById(`${colorLtr}12`).disabled = false;
        document.getElementById(`${colorLtr}L`).disabled = false;
        document.getElementById(`${colorLtr}12`).textContent = 12
        document.getElementById(`${colorLtr}L`).textContent = "";
        for (let i = thrdToLastMoveInt + 1; i <= scndToLastMoveInt; i++) {
          document.getElementById(`${colorLtr}${i}`).disabled = false;
        }
        arr.pop()
      }
    } else if (colorLtr === "b" || colorLtr === "g") {
      if (lastMoveInt === 12){
        document.getElementById(`${colorLtr}12`).disabled = false;
        document.getElementById(`${colorLtr}12`).textContent = 12
      } else if (lastMoveInt > 2 && lastMoveInt < 12){
        if (arr.length === 1) {
          for (let i = 12; i >= lastMoveInt; i--){
            document.getElementById(`${colorLtr}${i}`).disabled = false;
          }
          document.getElementById(`${colorLtr}${lastMoveInt}`).textContent = lastMoveInt
        }
        for (let i = scndToLastMoveInt - 1; i >= lastMoveInt; i--) {
          document.getElementById(`${colorLtr}${i}`).disabled = false;
        }
        document.getElementById(`${colorLtr}${lastMoveInt}`).textContent = lastMoveInt
      } else if (lastMoveStr === "L") {
        document.getElementById(`${colorLtr}2`).disabled = false;
        document.getElementById(`${colorLtr}L`).disabled = false;
        document.getElementById(`${colorLtr}2`).textContent = 2
        document.getElementById(`${colorLtr}L`).textContent = ""
        for (let i = thrdToLastMoveInt - 1; i >= scndToLastMoveInt; i--) {
          document.getElementById(`${colorLtr}${i}`).disabled = false;
        }
        arr.pop()
      }
    }
    arr.pop()
    countUpdate()
    checkColorCounterAndCheckFor12or2(colorLtr)
    finScoreCalc()
  }
}

function clickPenBox(id,val) {
  penArr.push(val)
  penCount = penArr.length
  document.getElementById(id).style.color = "red";
  document.getElementById(id).disabled = true;
  finScoreCalc()
}

function undoPenCheck() {
  if (penCount >=1 && penCount <= 4){
    document.getElementById(`p${penArr[penArr.length-1]}`).style.color = "white";
    document.getElementById(`p${penArr[penArr.length-1]}`).disabled = false;
    penCount--
    penArr.pop()
    finScoreCalc()
  }
}

function resetText(arr,colorLtr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "L"){
      document.getElementById(`${colorLtr}${arr[i]}`).textContent = arr[i]
    } else {
      document.getElementById(`${colorLtr}${arr[i]}`).textContent = ""
    }
  }
}

function clrBox() {
  resetText(redArr,"r")
  resetText(yelArr,"y")
  resetText(grnArr,"g")
  resetText(bluArr,"b")
  redArr = []
  yelArr = []
  grnArr = []
  bluArr = []
  redCount = 0
  yelCount = 0
  grnCount = 0
  bluCount = 0
  penCount = 0
  resetBtns()
  finScoreCalc()
}