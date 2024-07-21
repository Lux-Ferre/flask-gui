$('#submission_form').on("submit", (e) => {
    e.preventDefault()
    const input_field = $("#inputField")
    const user_input = input_field.val()
    if (user_input) {
        const message = JSON.stringify({ command: "execute", user_input: user_input })
        window.ws.send(message)
        input_field.val("")
    }
})

$("#settings_button").on("click", (e) =>{
    $("#settings_modal").modal("show")
})

$("#console_colour_picker").on("input", (e)=>{
    const colour = $(e.target).val()
    document.documentElement.style.setProperty("--console-colour", colour)
})

$("#text_colour_picker").on("input", (e)=>{
    const colour = $(e.target).val()
    document.documentElement.style.setProperty("--text-colour", colour)
})