import os
import re
from flask import Flask, jsonify, render_template, request, url_for
#from flask_jsglue import JSGlue
app = Flask(__name__)

@app.route('/', methods = ['GET','POST'])
def index():
    if request.method == "GET":
        return render_template("index.html")
        
@app.route('/folder', methods = ['GET','POST'])
def folder():
    if request.method == "GET":
        return render_template("folder.html")
