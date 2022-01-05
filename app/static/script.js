// Recognises speech

// Loading the google custom search api and executing search
gapi.load("client", loadClient);

function loadClient() {
    gapi.client.setApiKey("AIzaSyCkkPjwU8KOoxmIf1llcG_Be5OLeTk13Js");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
        .then(function() { console.log("GAPI client loaded for API Google News"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}
    
function execute(searchSTR) {
    return gapi.client.search.cse.list({
        "c2coff": "1",
        "cx": "8b698c9657b23195f",
        "lr": "lang_en",
        "num": 1,
        "q": searchSTR,
        "safe": "off",
        "searchType": "searchTypeUndefined",
        "siteSearchFilter": "siteSearchFilterUndefined",
        "sort": "date"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                const link = response.result.items[0].link;
                window.location.replace(link);
                },
                function(err) { console.error("Execute error", err); });
}

// Loading the google custom search api and executing define
gapi.load("client", loadClientDE);

function loadClientDE() {
    gapi.client.setApiKey("AIzaSyCkkPjwU8KOoxmIf1llcG_Be5OLeTk13Js");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
        .then(function() { console.log("GAPI client loaded for API Google Dictionary"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}
    
function executeDE(searchSTR) {
    return gapi.client.search.cse.list({
        "c2coff": "1",
        "cx": "80dba5ff4342c4ac0",
        "lr": "lang_en",
        "num": 1,
        "q": searchSTR,
        "safe": "off",
        "searchType": "searchTypeUndefined",
        "siteSearchFilter": "siteSearchFilterUndefined",
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                const link = response.result.items[0].link;
                window.location.replace(link);
                },
                function(err) { console.error("Execute error", err); });
}

// Loading the YouTube API and executing play
gapi.load("client", loadClientYT);
  
function loadClientYT() {
    gapi.client.setApiKey("AIzaSyCkkPjwU8KOoxmIf1llcG_Be5OLeTk13Js");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}

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

// This function sends command to python and execute different functions
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
            q = q.toLowerCase();
            q = q
            .replace(/[.,/#!$%^&*;:{}=-_`~()]/g, "")
            .replace(/s{2,}/g, " ");

            // Forks in the road!
            if (q.search("news") != -1)
            {
                q = q.replace("news", "");
                execute(q);
            }
            else if (q.search("define") != -1)
            {
                q = q.replace("define", "");
                executeDE(q);
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

// Initialising speech-to-text
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

// Stoping recognition and giving thumbs up to user
recognition.onspeechend = function() {
    recognition.stop();
    document.getElementById("listenText").innerHTML = "Listened :)";
};