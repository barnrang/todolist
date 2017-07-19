import os
import re
from flask import Flask, jsonify, render_template, request, url_for
#from flask_jsglue import JSGlue
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/folder')
def folder():
    return render_template("folder.html")
