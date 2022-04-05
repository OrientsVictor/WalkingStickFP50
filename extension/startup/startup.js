/* 
This script is executed upon first install.
This is WalkingStick.
Final Project for CS50x by Sourjya Sarkar.
*/

var txt = document.getElementById("txtContent").innerText;

console.log(txt)

// Text to Speech Function
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