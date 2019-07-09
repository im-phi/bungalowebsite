$( document ).ready(function() {
    $("#about").click(function() {
            $("#main-content").load( "about.html", function() {
        });
    });
});

;(function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle ("scroll", "optimizedScroll");
})();



window.addEventListener("optimizedScroll", function() { 
    if(window.location.href != "/index.html#about"){
        $("#background").css('-webkit-transform','rotate('+($(window).scrollTop()/8)+'deg)');
    }
});

