# Importing required libraries and functions
from flask import Flask, render_template, request, redirect
import speech_recognition as sr
import sys

COMMAND = ""

app = Flask(__name__)

# Route to Command (Index) page
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route('/command', methods=["POST"])
def get_javascript_data():
    if request.method == "POST":
        JSONdict = request.get_json()
        COMMAND = JSONdict["command"]
        print(f'{COMMAND}', file=sys.stdout)
    
        return render_template("temp.html", command=COMMAND)