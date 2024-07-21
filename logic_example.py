import json


class Logic:
	def __init__(self):
		self.configs = {
			"title": "Example Logic"
		}
		self.dispatch_map = {
			"execute": self.execute
		}

	def dispatch(self, ws, message: dict):
		target_method = self.dispatch_map.get(message["command"], None)
		if target_method is None:
			print(f"Invalid method {message['command']}")
			return

		target_method(ws, message["user_input"])

	def send_ws(self, ws, message: dict):
		response = {
			"command": message["command"],
			"data": message["data"]
		}
		ws.send(json.dumps(response))

	def execute(self, ws, payload):
		if payload == "clear":
			self.send_ws(ws, {"command": "clear", "data": None})
		else:
			self.send_ws(ws, {"command": "display", "data": payload})
