class UI{
    constructor() {
        this.output_box = $("#output")
    }

    display(message){
        const output_box = window.ui.output_box
        const payload = message.data
        output_box.append(`<div>> ${payload}</div>`)
        output_box.scrollTop(output_box[0].scrollHeight)
    }

    clear(message){
        window.ui.output_box.empty()
    }
}

window.ui = new UI()