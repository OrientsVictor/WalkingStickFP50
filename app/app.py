"""
    This is the flask web app.
    This is WalkingStick.
    Final Project for CS50X by Sourjya Sarkar.
"""

# Importing required libraries and functions
from flask import Flask, render_template, request, redirect
import json

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