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


// Fade in content on landing 
$(document).ready(function(){
    $("#main-content").fadeIn(1200);
});

/* _____________________________________ */
/* _____________________________________ */
/* __________NAVBAR SCRIPTS_____________ */
/* _____________________________________ */

function requestContent(file) {
    $("#content-container").load(file + " #main-content", function(){
        $("#main-content").fadeIn(2000);
    });
}

function animateBackground(data) {
    // Toggles & animates background spiral: on navbar link click
    switch(data){
        case "about":
            $("#background").animate({
                width: "465px",
                left: "50%",
                top: "57%",
            }, { 
                duration: 900, 
                easing: "swing", 
            });
            $("#background").attr("class", "about-clicked");
        break;
        
        case "index":
            $("#background").animate({
                width: "90%",
                left: "-26%",
                top: "-13%",
            }, { 
                duration: 900, 
                easing: "swing", 
            });
            $("#background").attr("class", "");
        // default:
        //     $("#background").attr("class", "");
    }
}

var content = document.querySelector('#content-container'),
    nav_container = document.querySelector('.navbar ul');

// Pushes the state of the window to browser history and loads content on-click
nav_container.addEventListener('click', function(e) {
    if (e.target != e.currentTarget) {

        // ATTEMPTS TO DELETE TRANSLATE PROPERTY BUT IT'S NOT WORKING.....
        $('html,body').scrollTop(0);

        var rotateStyle = document.getElementById('background');
        rotateStyle.style.removeProperty("-webkit-transform");
        
        // e.target is the link inside the navbar we just clicked.
        e.preventDefault();

        // Scroll to top on click
        // $('html, body').animate({
        //     scrollTop: $("#Bungalo").offset().top
        // });

        var data = e.target.getAttribute('id'),
            url = data + ".html";
        
        // Will edit if statement as we work on the other nav links
        if(data === "about"){
            $("#main-content").fadeOut(900, requestContent(url));
            window.history.pushState(data, null, url);
        }
    }
    e.stopPropagation();
    
    animateBackground(data);

}, false);

// Pops the second to last state on back-button press
window.addEventListener('popstate', function(e) {
    // e.state is equal to the data-attribute of the last link we clicked
    var instance = e.state;

    // Loads index if no index state is stored
    if (instance == null) {
        $("#main-content").fadeOut(900, requestContent("index.html"));
        animateBackground("index");
    } else {
        $("#main-content").fadeOut(900, requestContent(instance + ".html"));
        animateBackground(instance);
        document.title = "Bungalo | " + instance;
    }
});

$(window).on("load", function(){
    var path = window.location.pathname;
    if(path.includes("about")){
        animateBackground("about");
    }
})
/* _____________________________________ */
/* _____________________________________ */
/* __________ABOUT PAGE SCRIPTS_________ */
/* _____________________________________ */
