(() => {
"use strict";
const timeEl=document.getElementById("time");
const ampmEl=document.getElementById("ampm");
const dateEl=document.getElementById("date");
const dayEl=document.getElementById("day");
const shortDateEl=document.getElementById("shortDate");
const tzEl=document.getElementById("tz");
const themeBtn=document.getElementById("theme");
const formatBtn=document.getElementById("format");
const secondsBtn=document.getElementById("seconds");

let is24Hour=localStorage.getItem("clock24")==="true";
let showSeconds=localStorage.getItem("showSeconds")!=="false";

function updateClock(){
 const now=new Date();
 let hours=now.getHours();
 const minutes=String(now.getMinutes()).padStart(2,"0");
 const seconds=String(now.getSeconds()).padStart(2,"0");
 const ampm=hours>=12?"PM":"AM";
 if(!is24Hour) hours=hours%12||12;
 const hourText=String(hours).padStart(2,"0");
 let timeText=`${hourText}:${minutes}`;
 if(showSeconds) timeText+=`:${seconds}`;
 timeEl.textContent=timeText;
 ampmEl.textContent=is24Hour?"":ampm;
 dateEl.textContent=now.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 dayEl.textContent=now.toLocaleDateString("en-IN",{weekday:"long"});
 shortDateEl.textContent=now.toLocaleDateString("en-IN");
 tzEl.textContent=Intl.DateTimeFormat().resolvedOptions().timeZone;
 formatBtn.textContent=is24Hour?"12-HOUR":"24-HOUR";
 secondsBtn.textContent=showSeconds?"SECONDS: ON":"SECONDS: OFF";
}
formatBtn.addEventListener("click",()=>{is24Hour=!is24Hour;localStorage.setItem("clock24",is24Hour);updateClock();});
secondsBtn.addEventListener("click",()=>{showSeconds=!showSeconds;localStorage.setItem("showSeconds",showSeconds);updateClock();});
themeBtn.addEventListener("click",()=>{document.body.classList.toggle("light");themeBtn.textContent=document.body.classList.contains("light")?"☾":"☀";});
updateClock();
setInterval(updateClock,1000);
})();
