from flask import render_template
from flask_app import app


@app.route("/")
def index():
	title = app.logic.configs.get("title", "Generic LAN Python GUI")

	return render_template("index.html", title=title)
