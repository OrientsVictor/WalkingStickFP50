# Importing required libraries and functions
from flask import Flask, render_template, request, redirect
import speech_recognition as sr
import json

COMMAND = ""

app = Flask(__name__)

# Route to Command (Index) page
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/processSpeech/<string:userCommand>", methods=['POST'])
def aFunction(userCommand):
    userInput = json.loads(userCommand)
    COMMAND = userInput["command"]
    return redirect("/pross")

@app.route("/pross")
def pross():
    return render_template("temp.html", command=COMMAND)