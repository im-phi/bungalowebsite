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

window.onload = function(){
    var nav_container = document.querySelector('.navbar ul');
    
    nav_container.addEventListener('click', function(e) {
        if (e.target != e.currentTarget) {
            e.preventDefault();
            // e.target is the link inside the navbar we just clicked.
            var data = e.target.getAttribute('id'),
            url = data + ".html";
            $("#main-content").load(url +" #main-content", function() {
                window.history.pushState(data, null, url);
            });
        }
        e.stopPropagation();
    }, false);

    window.addEventListener('popstate', function(e) {
        // e.state is equal to the data-attribute of the last image we clicked
        var instance = e.state;

        if (instance == null) {
            textWrapper.innerHTML = " ";
            content.innerHTML = " ";
            document.title = defaultTitle;
        } else {
            updateText(instance);
            requestContent(instance + ".html");
            document.title = "Bungalo | " + instance;
        }
    });
}

function requestContent(file) {
    $('.#main-content').load(file + ' #main-content');
}

/* _____________________________________ */
/* _____________________________________ */
/* __________ABOUT PAGE SCRIPTS_________ */
/* _____________________________________ */

// $( document ).ready(function() {
//     $("#about").click(function() {
//             $("#main-content").load( "about.html #main-content", function() {
//                 window.history.pushState('html', 'about', '/about.html');
//             }
//         );
//     });
// });

