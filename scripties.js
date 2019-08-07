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
        // Added spin class just for rotating the spiral 
        $(".spin").css('-webkit-transform','rotate('+($(window).scrollTop()/8)+'deg)');
    }
});


// Fade in content on landing 
$(document).ready(function(){
    $("#main-content").fadeIn(1000);
});

/* _____________________________________ */
/* _____________________________________ */
/* ________NAVBAR/AJAX SCRIPTS__________ */
/* _____________________________________ */

function requestContent(file) {
    $("#content-container").load(file + " #main-content", function(){
        switch(file){
            case "about.html":
                activeAbout();
                $("#main-content").fadeIn(500);

            default:
                $("#main-content").fadeIn(500);
        }
    });
}

function animateBackground(data) {
    // Toggles & animates background spiral: on navbar link click
    switch(data){
        case "about":
            $("#background").velocity({
                width: "465px",
                // width: "1600px",
                left: "50%",
                top: "57%",
            }, { 
                duration: 900, 
                easing: "swing", 
            });
            $("#background").attr("class", "about-clicked");
        break;
        
        case "index":
            $("#background").velocity({
                width: "90%",
                left: "-26%",
                top: "-13%",
            }, { 
                duration: 900, 
                easing: "swing", 
            });
            $("#background").attr("class", "spin");
        // default:
        //     $("#background").attr("class", "");
    }
}

var content = document.querySelector('#content-container'),
    navContainer = document.querySelector('.navbar ul');

// Pushes the state of the window to browser history and loads content on-click
navContainer.addEventListener('click', function(e) {
    if (e.target != e.currentTarget) {

        // Deletes .spin class to replace with animation
        $('html,body').scrollTop(0);

        var rotateStyle = document.getElementById('background');
        rotateStyle.style.removeProperty("-webkit-transform");
        
        // e.target is the link inside the navbar we just clicked.
        e.preventDefault();

        var data = e.target.getAttribute('id'),
            url = data + ".html";
        
        // Will edit if statement as we work on the other nav links
        if(data === "about"){
            // $("#main-content").fadeOut(900, requestContent(url));
            requestContent(url);
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
        // document.title = "Bungalo | " + instance;
    }
});

// Reanimates in case of refresh on about.html
$(window).on("load", function(){
    var path = window.location.pathname;
    if(path.includes("about")){
        activeAbout();
        animateBackground("about");
    }
});

/* _____________________________________ */
/* _____________________________________ */
/* __________ABOUT PAGE SCRIPTS_________ */
/* _____________________________________ */

// About page is currently active
function activeAbout(){
    var header = document.getElementById("about-button-container");
    var btns = header.getElementsByClassName("btn");
    var keyframes = ["abt-left", "abt-right", "abt-top"];
    var locations = ["loc-left", "loc-right", "loc-top"];
    
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(e) {

            // Adds active class to the current button (highlight it)
            var current = document.getElementsByClassName("button-active");
            if($(current[0]).hasClass("button-active")){
                current[0].className = current[0].className.replace(" button-active", "");
            }
            this.className += " button-active";
            
            // Animates buttons
            if(!$(e.currentTarget).hasClass("abt-top")){

                (async () => {
                    var kfCounter = 0;

                    let removeAni = () => {
                        for(var j = 0; j < btns.length; j++){
                            for(var k = 0; k < keyframes.length; k++){
                                if($(btns[j]).hasClass(keyframes[k])){
                                    btns[j].className = btns[j].className.replace(" " + keyframes[k], "");
                                    btns[j].className += " " + locations[k];
                                }
                            }
                        }
                    }

                    let loadContent = () => {
                        $(".iframe-center").fadeOut(500, function(){
                            // Loads in content
                            if($(e.currentTarget).hasClass("music")){
                                var iframes = document.getElementsByClassName("deferred-iframe");
                                iframes[0].onload = function(){
                                    iframes[1].onload = $(".iframe-center").fadeIn(800);
                                }
                                iframes[0].src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/20292982&color=%23fca3fc&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
                                iframes[1].src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/516171873&color=%23fca3fc&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
                                // $(".iframe-center").fadeIn(800);
                            }
                        });
                    }

                    // This function is fucking spaghetti dont even try to understand this
                    // Cycles through each button to figure out new positioning
                    let addAni = () => {
                        for(var j = 0; j < btns.length; j++){
                            if(btns[j] != this){
                                if($(btns[j]).hasClass("loc-left") && kfCounter === 0){
                                    btns[j].className += " " + keyframes[kfCounter + 1];
                                    // console.log(kfCounter + " LEFT");
                                    kfCounter--;
                                }
                                else if($(btns[j]).hasClass("loc-right") && kfCounter === 1){
                                    // vv This line triggers reflow to restart animation
                                    void btns[j].offsetWidth;
                                    btns[j].className += " " + keyframes[kfCounter];
                                    // console.log(btns[j].className + " " + kfCounter + " RIGHT");
                                }
                                else{
                                    btns[j].className += " " + keyframes[kfCounter];
                                    // console.log(kfCounter + " ??");
                                }
                                kfCounter++;
                            }
                        }
                        this.className += " abt-top";
                    }
                    
                    await loadContent();
                    await removeAni();
                    await addAni();

                })();
            }
            animateBackgroundAbout();

            e.currentTarget.addEventListener("animationend", function(e){
                // Deletes previous destination location for animating
                for(var j = 0; j < btns.length; j++){
                    for(var k = 0; k < keyframes.length; k++){
                        if($(btns[j]).hasClass(locations[k])){
                            btns[j].className = btns[j].className.replace(" "+ locations[k], "");
                        }
                    }
                }
            });
        });
    }
}

function animateBackgroundAbout(){
    $("#background").velocity({
        width: "259px",
    }, { 
        duration: 875, 
        easing: "swing", 
        start: function(){
            $('#background').className += " rotate";
        }
    });
    $("#background").velocity({
        width: "1600px",
    }, { 
        duration: 375, 
        easing: "swing", 
    });
}