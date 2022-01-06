/* 
This script reads the definiton of a word provided by the companion web app.
This is WalkingStick.
Final Project for CS50x by Sourjya Sarkar.
*/

// Gets the definitions
txt = document.getElementsByClassName("vg")[0].innerText;

// Text to Speech Function
function tts()
{
    var msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    window.speechSynthesis.speak(msg);
}

// Text to Speech function is executed on any keypress
document.addEventListener("keypress", tts);