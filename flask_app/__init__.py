import importlib.util

from flask import Flask

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from flask_app import ws_routes
from flask_app import views


def load_logic_module(module_path):
    spec = importlib.util.spec_from_file_location("logic", module_path)
    logic = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(logic)
    return logic.Logic()


logic = load_logic_module(app.config["LOGIC_MODULE"])

app.logic = logic
