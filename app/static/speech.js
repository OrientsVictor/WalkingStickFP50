// Recognises speech

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

recognition.start();

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    if (command == "")
    {
        document.body.style.backgroundColor = "red";
        location.reload();
    }
    console.log(command);
};

recognition.onspeechend = function() {
    recognition.stop();
    document.body.style.backgroundColor = "green";
    document.getElementById("listenText").innerHTML = "Listened :)";
};

recognition.onerror = function() {
    location.reload();
};