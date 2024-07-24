class Websocket{
    constructor() {
        const socket_url = `ws://${window.location.host}/ws`
        this.socket = new WebSocket(socket_url)

        this.socket.onopen = function () {
            console.log('WebSocket connection established')
        }

        this.socket.onmessage = function (event) {
            const message = JSON.parse(event.data)
            window.logic.dispatch(message)
        }

        this.socket.onerror = function (error) {
            console.error('WebSocket error:', error)
        }

        this.socket.onclose = function (event) {
            console.log('WebSocket connection closed:', event)
        }
    }

    send(message){
        this.socket.send(message)
    }
}

window.ws = new Websocket()