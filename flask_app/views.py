from flask import render_template, redirect, url_for
from flask_app import app


@app.route("/")
def index():
	title = app.logic.configs.get("title", "Generic LAN Python GUI")
	if app.config.get("CUSTOM_PAGE", False):
		return redirect(url_for("custom.custom_index"))
	else:
		return render_template("index.html", title=title)
