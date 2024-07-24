import importlib.util

from flask import Flask, Blueprint, render_template

from config import Config

app = Flask(__name__, template_folder='templates')
app.config.from_object(Config)

from flask_app import ws_routes
from flask_app import views


def load_logic_module(module_path):
    spec = importlib.util.spec_from_file_location("logic", module_path)
    logic_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(logic_module)
    return logic_module.Logic()


logic = load_logic_module(app.config["LOGIC_MODULE"])

app.logic = logic


if app.logic.configs.get("custom_template", False):
    custom_dir = app.logic.configs["custom_template"]
    custom_bp = Blueprint(
        'custom',
        __name__,
        static_folder=f"{custom_dir}/static",
        template_folder=f"{custom_dir}/templates",
        url_prefix="/custom"
    )


    @custom_bp.route('/')
    def custom_index():
        title = app.logic.configs.get("title", "Generic LAN Python GUI")

        return render_template("custom.html", title=title)

    app.register_blueprint(custom_bp)
    app.config["CUSTOM_PAGE"] = True
