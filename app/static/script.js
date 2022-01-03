// Recognises speech

// Loading the google custom search api
gapi.load("client", loadClient);

function loadClient() {
    gapi.client.setApiKey("AIzaSyCkkPjwU8KOoxmIf1llcG_Be5OLeTk13Js");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
        .then(function() { console.log("GAPI client loaded for API Google Search"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
    }
    
function execute(searchSTR) {
    return gapi.client.search.cse.list({
        "c2coff": "1",
        "cx": "e52b1341a05b9d03a",
        "num": 1,
        "q": searchSTR,
        "safe": "off",
        "searchType": "searchTypeUndefined",
        "siteSearchFilter": "siteSearchFilterUndefined"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                const link = response.result.items[0].link;
                window.location.replace(link);
                },
                function(err) { console.error("Execute error", err); });
    }

// Loading the YouTube API
gapi.load("client", loadClientYT);
  
function loadClientYT() {
    gapi.client.setApiKey("AIzaSyCkkPjwU8KOoxmIf1llcG_Be5OLeTk13Js");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}

// Execute function for the YouTube API
function executePlay(SearchString) {
    const searchString = SearchString;
    const maxresult = 1;
    const orderby = "relevance";
  
    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "order": orderby,
        "maxResults": maxresult,
        "q": searchString
    };
  
    return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        const listItems = response.result.items;
        if (listItems) {  
            listItems.forEach(item => {
                const videoId = item.id.videoId;
                window.location.replace("https://www.youtube.com/watch?v="+videoId);
            });
        }
    },
    function(err) { console.error("Execute error", err); });
}

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
            if (q.search("news") != -1)
            {
                q = q.replace("news", "");
                execute(q);
            }
            else if (q.search("play") != -1)
            {
                q = q.replace("play", "");
                executePlay(q);
            }
            else
            {
                window.location.reload();
            }

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