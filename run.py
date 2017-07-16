import os
import re
from flask import Flask, jsonify, render_template, request, url_for
from flask_jsglue import JSGlue
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello, World"


@app.route('/include/')
def welcome():
    return "welcome"
