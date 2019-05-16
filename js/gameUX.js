

$(".player").on("click", function(e) {
    $(this).hasClass("strikethrough")? $(this).removeClass("strikethrough"): $(this).addClass("strikethrough");
});

$(".locationC").on("touchstart click", function(e) {
    $(this).hasClass("strikethrough")? $(this).removeClass("strikethrough"): $(this).addClass("strikethrough");
});