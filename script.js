var para = document.getElementById("clockTime");
var seasonPara = document.getElementById("buttonTime")
var box = document.getElementById("box1");
var seasonMinusBtn = document.getElementById("button1");
var seasonPlusBtn = document.getElementById("button2");
var breakMinusBtn = document.getElementById("breakMinusBtn");
var breakPlusBtn = document.getElementById("breakPlusBtn");
var breakPara = document.getElementById("breakPara");
var alterClockName = document.getElementById("mainClock");
var flag = true;
var breakFlag = true;
var seasonInterval;
var breakInterval;
var seasonCount=60; //counting second for session
var breakCount = 60; //counting second for break
var seasonParaValue=2;
var breakParaValue = 10;

seasonPara.textContent = seasonParaValue; //Assigning value to button paragraph
para.textContent = seasonParaValue; // Assigning value to clock paragraph
breakPara.textContent = breakParaValue;

//<--------- function for session interval----->

function countDown () {
  seasonCount = seasonCount -1;
  para.textContent = seasonParaValue-1 + ":" + seasonCount; //giving value of min and sec to clock paragraph
  if (para.textContent == "0:0" && seasonParaValue <= 1) {  // setting break interval after finishing time
    breakInterval = setInterval(breakCountDown, 1000);
    breakCount = 60;
    breakParaValue = Number(breakPara.textContent);
    clearInterval(seasonInterval);
    alterClockName.textContent = "Break";
  } else if (seasonCount <= 0) {  
      seasonCount = 60;       // restarting of second
      seasonParaValue  -= 1;  //decreasing of minute value
  } 
}

//<--------function for setting break interval------>

function breakCountDown() {
  breakCount = breakCount -1;
  para.textContent = breakParaValue-1 + ":" + breakCount; //giving value of min and sec to clock paragraph
  if (para.textContent == "0:0" && breakParaValue <= 1) {  // setting season interval after finishing time
    seasonInterval = setInterval(countDown,1000);
    clearInterval(breakInterval);
    seasonCount = 60;
    seasonParaValue = seasonPara.textContent;
    alterClockName.textContent = "Session";
  } else if (breakCount <= 0) {  
      breakCount = 60; // restarting of second
      breakParaValue  -= 1; //decreasing of minute value
  } 
}

box.addEventListener("click", function (e) {
  //<-------pause and resume------>
  
  if (flag) {
      seasonInterval = setInterval(countDown, 1000); //setting interval for session
      flag = false;
  } else if ( flag===false && seasonCount> 0 ) {      // pause for session interval
      clearInterval(seasonInterval);
      flag = true;
  } else if (breakFlag === true && breakCount>= 0 && seasonCount <= 0) {    
      clearInterval(breakInterval); //<-----break pause and resume----->
      breakFlag = false;
  } else if ( breakFlag ===false && breakCount >= 0 ) {
      breakInterval = setInterval(breakCountDown, 1000);
      breakFlag = true;
  } 
});

//<---------decreasing session time with minus button---->

seasonMinusBtn.addEventListener("click",function () {
  seasonParaValue = seasonParaValue - 1;
  seasonPara.textContent = seasonParaValue;
  para.textContent = seasonParaValue + ":00";
  seasonCount = 60;
  if (seasonParaValue <= 1) {
    seasonMinusBtn.disabled = true;
  }
  seasonPlusBtn.disabled = false;
})

//<----increasing session time with plus button----->

seasonPlusBtn.addEventListener("click",function () {
  seasonParaValue = seasonParaValue + 1;
  seasonPara.textContent = seasonParaValue;
  para.textContent = seasonParaValue + ":00";
  seasonCount = 60;
  if (seasonParaValue > 59) {
    seasonPlusBtn.disabled = true;
  }
  seasonMinusBtn.disabled = false;
})

//<----decreasing break time with minus button------>

breakMinusBtn.addEventListener("click" , function () {
  breakParaValue -= 1;
  breakPara.textContent = breakParaValue;
  breakCount = 60;
  if (breakParaValue <= 1) {
    breakMinusBtn.disabled = true;
  }
  breakPlusBtn.disabled = false;
})

//<----- incresing break time with plus button------>

breakPlusBtn.addEventListener("click", function () {
  breakParaValue += 1;
  breakPara.textContent = breakParaValue;
  breakCount = 60;
  if (breakParaValue > 59) {
    breakPlusBtn.disabled = true;
  }
  breakMinusBtn.disabled = false;
})
