class UI{
    constructor() {
        this.game_size = $("#range_display")
        this.new_game_row = $("#new_game_row")
        this.guess_row = $("#guess_row")
        this.display_container = $("#display_container")
        this.result_row = $("#game_result_row")
        this.result_message = $("#result_message")
        this.result_spacer = $("#result_spacer")
        this.guess_tile = $("#guess_tile")
        this.display_row = $("#display_row")
        this.display_tile = $("#display_tile")
    }

    update_game_size(num){
        this.game_size.text(`${num}`)
    }

    new_game(num){
        this.new_game_row.addClass("d-none")
        this.guess_row.removeClass("d-none")
        this.guess_row.empty()
        this.display_container.empty()
        this.result_row.addClass("d-none")
        this.result_spacer.addClass("d-none")
        for (let i = 0; i < num; i++) {
            const clone = this.guess_tile.prop("content").cloneNode(true)
            this.guess_row.append(clone)
        }
    }

    add_guess(guess, result){
        let new_row = this.display_row.prop("content").cloneNode(true)

        for (let i = 0; i < guess.length; i++) {
            const new_tile = this.display_tile.prop("content").cloneNode(true)
            $("span", $(new_tile)).text(guess[i])
            if(result[i] === "o"){
                $("span", $(new_tile)).addClass("success_tile")
            }
            if(result[i] === "-"){
                $("span", $(new_tile)).addClass("wrong_tile")
            }
            $(".row", $(new_row)).append(new_tile)
        }

        this.display_container.append(new_row)
    }

    game_end(count){
        this.new_game_row.removeClass("d-none")
        this.guess_row.addClass("d-none")
        this.display_container.addClass("d-none")
        this.result_row.removeClass("d-none")
        this.result_spacer.removeClass("d-none")

        this.result_message.text(`Congratulations! You cracked the vault in ${count} tries!`)
    }
}

window.ui = new UI()