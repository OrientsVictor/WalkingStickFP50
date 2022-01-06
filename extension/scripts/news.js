/* 
This script reads the news article provided by the companion web app.
This is WalkingStick.
Final Project for CS50x by Sourjya Sarkar.
*/

// Gets the article 
txt = document.getElementsByTagName("article")[0].innerText;

// This function reads the article
function tts()
{
    var msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    window.speechSynthesis.speak(msg);
}

// Function tts is executed on any keypress
document.addEventListener("keypress", tts);