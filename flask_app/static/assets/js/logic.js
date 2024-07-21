class Logic{
    constructor() {
        this.dispatch_map = {
            clear: window.ui.clear,
            display: window.ui.display
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
}

window.logic = new Logic()