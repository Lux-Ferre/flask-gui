$("#new_game_size").on("input", e =>{
    const num = $(e.target).val()
    ui.update_game_size(num)
})

$("#new_game_button").on("click", e =>{
    logic.start_new_game()
})

$("#guess_button").on("click", e=>{
    logic.submit_guess()
})