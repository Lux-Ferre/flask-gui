import json

from flask_app import app
from flask_sock import Sock

sock = Sock(app)


@sock.route('/ws')
def websocket(ws):
	while True:
		data = json.loads(ws.receive())
		app.logic.dispatch(ws, data)
