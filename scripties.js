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
    $("#main-content").fadeIn(1200);
});

/* _____________________________________ */
/* _____________________________________ */
/* ________NAVBAR/AJAX SCRIPTS__________ */
/* _____________________________________ */

function requestContent(file) {
    $("#content-container").load(file + " #main-content", function(){
        switch(file){
            case "about.html":
                $("#main-content").fadeIn(2000, activeAbout());
            default:
                $("#main-content").fadeIn(2000);
        }
    });
}

function animateBackground(data) {
    // Toggles & animates background spiral: on navbar link click
    switch(data){
        case "about":
            $("#background").animate({
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
            $("#background").animate({
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
        // document.title = "Bungalo | " + instance;
    }
});

$(window).on("load", function(){
    var path = window.location.pathname;
    if(path.includes("about")){
        animateBackground("about");
        activeAbout();
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
        btns[i].addEventListener("click", function() {

            // Adds active class to the current button (highlight it)
            var current = document.getElementsByClassName("button-active");
            if($(current[0]).hasClass("button-active")){
                current[0].className = current[0].className.replace(" button-active", "");
            }
            this.className += " button-active";

            // Animates buttons
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

                // This function is fucking spaghetti dont even try to understand this
                // Debugging: Button staying in one place bc index cannot be same for keyframe+locations
                let addAni = () => {
                    for(var j = 0; j < btns.length; j++){
                        if(btns[j] != this){
                            if($(btns[j]).hasClass("loc-left") && kfCounter === 0){
                                btns[j].className += " " + keyframes[kfCounter + 1];
                                console.log(kfCounter + " LEFT");
                                kfCounter--;
                            }
                            // else if($(btns[j]).hasClass("loc-right") && kfCounter === 1){
                            //     btns[j].className += " " + keyframes[kfCounter - 1];
                            //     console.log(btns[j].className + " " + kfCounter + " RIGHT");
                            //     kfCounter -= 1;
                            // }
                            // else if($(btns[j]).hasClass("loc-right") && kfCounter === 1){
                            //     var $element = $(".loc-right").bind("animationend", function(){
                            //         this.style.AnimationName = "";
                            //     });
                                
                            //     $('.btn').click(function(){
                            //         $element.css('AnimationName', 'toRight');
                            //         // you'll probably want to preventDefault here.
                            //     });
                            // }
                            else{
                                btns[j].className += " " + keyframes[kfCounter];
                                console.log(kfCounter + " ??");
                            }
                            kfCounter++;
                        }
                    }
                    this.className += " abt-top";
                }

                await removeAni();
                await addAni();

            })();
        });

        // Deletes previous destination location for animation
        btns[i].addEventListener("animationend", function(){
            for(var j = 0; j < btns.length; j++){
                for(var k = 0; k < keyframes.length; k++){
                    if($(btns[j]).hasClass(locations[k])){
                        btns[j].className = btns[j].className.replace(" "+ locations[k], "");
                    }
                }
            }
        });
    }
}