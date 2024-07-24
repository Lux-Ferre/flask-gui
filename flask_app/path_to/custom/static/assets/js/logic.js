class Logic{
    constructor() {
        this.dispatch_map = {
            new_game: this.new_game,
            guess_result: this.guess_result
        }
    }

    dispatch(message){
        const command = message.command

        const method = this.dispatch_map[command] || null

        if(method){
            method(message)
        } else {
            console.log(`Invalid command: ${command}`)
        }
    }

    start_new_game(){
        const game_size = $("#new_game_size").val()
        ws.send(JSON.stringify({"command": "new_game", "payload": game_size}))
    }

    new_game(message){
        const num = parseInt(message.data)
        ui.new_game(num)
    }

    submit_guess(){
        const guess_container = ui.guess_row
        const selects = $("select", guess_container)
        let guess = ""
        selects.each((i, select)=>{
            guess += `${$(select).val()}`
        })
        ws.send(JSON.stringify({"command": "guess", "payload": guess}))
    }

    guess_result(message){
        if(message.data.result === "o".repeat(message.data.result.length)){
            ui.game_end(message.data.count)
        } else {
            ui.add_guess(message.data.guess, message.data.result)
        }
    }
}

window.logic = new Logic()