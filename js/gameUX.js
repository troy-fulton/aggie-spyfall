

function clickableDisplay() {
    $(".player").on("click", function(e) {
        e.preventDefault();
        $(this).hasClass("strikethrough")? $(this).removeClass("strikethrough"): $(this).addClass("strikethrough");
    });

    $(".locationC").on("click", function(e) {
        e.preventDefault();
        $(this).hasClass("strikethrough")? $(this).removeClass("strikethrough"): $(this).addClass("strikethrough");
    });
}
