# Importing required libraries and functions
from flask import Flask, render_template, request, redirect
import speech_recognition as sr
import json
import sys

# Initiating Flask
app = Flask(__name__)

# Route to Command (Index) page
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

# Processing Command
@app.route('/command', methods=["POST"])
def get_javascript_data():
    if request.method == "POST":
        JSONdict = request.get_json()
        COMMAND = JSONdict["command"]
        return json.dumps({'success' : True}), 200, {'ContentType' : 'application/json'}

@app.route("/redirect")
def redirect():
    return render_template("redirect.html")