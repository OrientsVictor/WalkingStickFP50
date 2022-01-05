console.log("WalkingStick ready to go!")

txt = document.getElementsByClassName("examples")[0].innerText;
console.log(txt)

function tts()
{
    var msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    window.speechSynthesis.speak(msg);
}

document.addEventListener("keypress", tts);