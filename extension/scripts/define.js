/* 
This script reads the definiton of a word provided by the companion web app.
This is WalkingStick.
Final Project for CS50x by Sourjya Sarkar.
*/

// Gets the definitions

txt = document.getElementsByClassName("pseg")[0].innerText;

txt = txt.replace(/(\r\n|\n|\r)/gm, "");

console.log(txt);

// This function reads the article
function tts()
{
    window.speechSynthesis.cancel();
    myTimeout = setTimeout(myTimer, 10000);
    var utt = new SpeechSynthesisUtterance(txt);

    utt.onend =  function() { clearTimeout(myTimeout); }
    window.speechSynthesis.speak(utt);
}

function myTimer() {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
        myTimeout = setTimeout(myTimer, 10000);
}

// Text to Speech function is executed on any keypress
document.addEventListener("keypress", tts);