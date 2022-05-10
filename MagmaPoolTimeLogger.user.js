// ==UserScript==
// @name         Magma Pool Time Logger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Saves times visited & if accessable to local storage, per account, & displays last visited time.
// @author       kreotsai
// @match        http://www.neopets.com/magma/pool.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

// Declare Vars
const string = "I'm sorry, only those well-versed in the ways of Moltara are permitted to enter the Pool. Learn more and try again later.";
var time, access, lastCheck, color, newtxt = "";
var username = document.querySelector("#header > table > tbody > tr:nth-child(1) > td.user.medText > a:nth-child(1)").innerText;
var div = document.querySelector("#poolOuter");
var storage;
localStorage.getItem("magmatimes") != null ? storage = JSON.parse(localStorage.getItem("magmatimes")) : storage = {};
if (!storage[username]){
    storage[username] = {};
}

//Functions
function saveStatus(){
    storage[username][time] = access;
    localStorage.setItem("magmatimes", JSON.stringify(storage));
    console.log(storage);
    lastCheck = Object.keys(storage[username])[Object.keys(storage[username]).length-1];

    if (storage[username][time] === false){
        color = "red"
    }
    else{
    color = "green"
    }

    newtxt = `<b><font color="${color}">Last Check: ${lastCheck}</b></font>`

    for (var key in storage[username]) {
    if(storage[username][key] === true){
      newtxt = newtxt + `<br>Your Magma Pool time is <b>${key}</b>`
        break
        }
    }

    div.innerHTML = `${newtxt} <P> ${div.innerHTML} <P>`;

}

function checkStatus(){
    time = document.querySelector("#nst").innerText;
    time = time.replace(time.split(" ")[0].split(":")[2], "").replace(": ", "").replace(" NST", "");

    if (window.document.body.innerText.includes(string)) {
        access = false;

    } else {
        access = false;
    }
   saveStatus();
}

// Check once page loads
window.addEventListener('load', (event) => {
  checkStatus();
});
