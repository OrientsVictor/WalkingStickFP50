# Importing required libraries and functions
from flask import Flask, render_template, request, redirect
import speech_recognition as sr


app = Flask(__name__)

# Route to Command (Index) page
@app.route("/", methods=["GET", "POST"])
def index():
    """ 
    Initializing the transcript where speech recognized text 
    is present. Then recognising the audio.
    """
    transcript = ""

    # Checking method
    if request.method == "POST": 

        # Error checking
        if "file" not in request.files:
            return redirect(request.url)
            
        file = request.files["file"]
        if file.filename == "":
            return redirect(request.url)

        # Actually recognising the audio
        if file:
            recognizer = sr.Recognizer()
            audioFile = sr.AudioFile(file)
            with audioFile as source:
                data = recognizer.record(source)
            transcript = recognizer.recognize_google(data, key=None)

    return render_template("index.html", transcript=transcript)


# 2nd method for speech rec
@app.route("/speech")
def speech():
    return render_template("speech.html")