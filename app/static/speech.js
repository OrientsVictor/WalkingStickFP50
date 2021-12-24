// Recognises speech

// This function sends command to python
function sendCommand(command){
    let userCommand = {
        "command": command
    }

    $.ajax({
        type: "POST",
        url: "/command",
        data: JSON.stringify(userCommand),
        contentType: "application/JSON",
        dataType: 'json',
        success: function(){
            var q = command;
            window.open('http://google.com/search?q='+q);

        }        
    })
}

// Initialising 
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

// Start recognisation
recognition.start();

// Get command
recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    if (command == "")
    {
        document.body.style.backgroundColor = "#cc0000";
    }
    console.log(command);
    sendCommand(command);
};

recognition.onspeechend = function() {
    recognition.stop();
    document.getElementById("listenText").innerHTML = "Listened :)";
};