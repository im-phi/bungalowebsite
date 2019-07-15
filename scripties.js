/* _____________________________________ */
/* _____________________________________ */
/* __________GLOBAL SCRIPTS_____________ */
/* _____________________________________ */

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

/* _____________________________________ */
/* _____________________________________ */
/* __________NAVBAR SCRIPTS_____________ */
/* _____________________________________ */

function requestContent(file) {
    $("#main-content").load(file + " #main-content");
}

window.onload = function(){
    var content = document.querySelector('#main-content'),
        nav_container = document.querySelector('.navbar ul');

    // Pushes the state of the window to browser history and loads content on-click
    nav_container.addEventListener('click', function(e) {
        if (e.target != e.currentTarget) {
            e.preventDefault();
            // e.target is the link inside the navbar we just clicked.

            var data = e.target.getAttribute('id'),
            url = data + ".html";
            requestContent(url);
            window.history.pushState(data, null, url);
        }
        e.stopPropagation();
    }, false);

    // Pops the second to last state on back-button press
    window.addEventListener('popstate', function(e) {
        // e.state is equal to the data-attribute of the last link we clicked
        var instance = e.state;

        // Loads index if no index state is stored
        if (instance == null) {
            requestContent("index.html");
        } else {
            requestContent(instance + ".html");
            document.title = "Bungalo | " + instance;
        }
    });
}


/* _____________________________________ */
/* _____________________________________ */
/* __________ABOUT PAGE SCRIPTS_________ */
/* _____________________________________ */


