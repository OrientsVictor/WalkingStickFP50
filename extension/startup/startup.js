/* 
This script is executed upon first install.
This is WalkingStick.
Final Project for CS50x by Sourjya Sarkar.
*/

var txt = document.getElementById("txtContent").innerText;

// Text to Speech Function
function tts()
{
    var msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    window.speechSynthesis.speak(msg);
}

// Text to Speech function is executed on any keypress
document.addEventListener("keypress", tts);