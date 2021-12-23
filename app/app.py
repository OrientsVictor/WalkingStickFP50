# Importing required libraries and functions
from flask import Flask, render_template, request, redirect
import speech_recognition as sr


app = Flask(__name__)

# Route to Command (Index) page
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")