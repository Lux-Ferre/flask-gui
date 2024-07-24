import json
import random


class Logic:
	def __init__(self):
		self.configs = {
			"title": "Vault Cracker",
			"custom_template": r"path_to\custom",
		}
		self.dispatch_map = {
			"new_game": self.new_game,
			"guess": self.guess
		}

		self.answer = ""
		self.counter = 0

	def dispatch(self, ws, message: dict):
		target_method = self.dispatch_map.get(message["command"], None)
		if target_method is None:
			print(f"Invalid method {message['command']}")
			return

		target_method(ws, message["payload"])

	def send_ws(self, ws, message: dict):
		response = {
			"command": message["command"],
			"data": message["data"]
		}
		ws.send(json.dumps(response))

	def new_game(self, ws, payload):
		self.counter = 0
		game_size = int(payload)
		max_val = int("9" * game_size)
		answer = str(random.randint(0, max_val)).zfill(game_size)
		self.answer = answer
		print(answer)
		self.send_ws(ws, {"command": "new_game", "data": payload})

	def guess(self, ws, payload):
		self.counter += 1
		result = ""
		unfound_digits = ""
		for i in range(len(payload)):
			if payload[i] == self.answer[i]:
				result += "o"
			else:
				result += "x"
				unfound_digits += self.answer[i]

		for i in range(len(payload)):
			if result[i] == "o":
				continue
			if payload[i] in unfound_digits:
				result = result[:i] + "-" + result[i+1:]
				unfound_digits.replace(payload[i], "", 1)

		response = {
			"guess": payload,
			"result": result,
			"count": self.counter
		}
		self.send_ws(ws, {"command": "guess_result", "data": response})
