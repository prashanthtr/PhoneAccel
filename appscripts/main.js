require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        console.log("Yo, I am alive!");

        // Grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
        //---------------------------------------------------------------------

        // assign6.1 Just create a nice black background
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({"fill": "black"});


        // assign7: create var to hold number of elements in your list
        var numDots=40;
        // assign7: initialize array to empty
        var dot = [];
        var i=0;
        while(i<numDots){
            dot[i]=paper.circle(pWidth/2, pHeight/2, 35);

            dot[i].colorString = "hsl(" + Math.random()+ ",1, .75)";
            dot[i].attr({"fill": dot[i].colorString, "fill-opacity" : .5});

            // assign6:5 Add some properties to dot just to keep track of it's "state"
            dot[i].xpos=pWidth/2;
            dot[i].ypos=pHeight/2;
            // assign6.6 Add properties to keep track of the rate the dot is moving
            //assign7: MAPPING of ranges (here, [0,1] -> [-5,5])
            dot[i].xrate= -5+10*Math.random();
            dot[i].yrate= -7+14*Math.random();
            i++;
        }

        // assign7: Put a transparent rect OVER everything to collect mouse clicks
        // assign7: note: must have fill in order to respond to clicks (even tho we make it transparent!)
        // assign7: transRect must be added to paper *after* all dots to be on top.
        var transRect = paper.rect(0,0,pWidth, pHeight);
        transRect.attr({"fill": "white", "fill-opacity": 0});


        // assign6.2: For counting calls to the 'draw' routine
        var count=0;
        //assign7: AVOID creating vars inside loops (eg while) and functions that get called back at high rates.
        var dist; // temp variable used inside loop
        // assign6.2: our drawing routine, will use as a callback for the interval timer


        var draw = function(){

            // Count and keep track of the number of times this function is called
            count++;
            //console.log("count = " + count);
            //console.log("dot pos is ["+dot.xpos + "," + dot.ypos + "]");

            i=0;
            while(i<numDots){


                dot[i].xpos += dot[i].xrate;
                dot[i].ypos += dot[i].yrate;

                // assign6.8: Now actually move the dot using our 'state' variables
                dot[i].attr({'cx': dot[i].xpos, 'cy': dot[i].ypos});

                //assign7: make dots white if with a certain distance, otherwise
                //         use their original colors.
                if (mouseState.pushed){
                    dist = distance(dot[i].xpos,dot[i].ypos, mouseState.x, mouseState.y );
                    //if (i===0){console.log("Mouse-to-dot["+i+"] distance: " + dist);}
                    if (dist<100){
                        dot[i].attr({"fill": "white", "fill-opacity": 1});
                    } else {
                        dot[i].attr({"fill": dot[i].colorString, "fill-opacity": .5});
                    }
                } else {
                    // it would actually be more efficient to do this in the mouseup listener instead of in the draw loop!
                    dot[i].attr({"fill": dot[i].colorString, "fill-opacity": .5});
                }



                // assign6.9: keep the object on the paper
                if (dot[i].xpos > pWidth) {dot[i].xrate = -dot[i].xrate;}
                if (dot[i].ypos > pHeight) {dot[i].yrate = - dot[i].yrate};
                if (dot[i].xpos < 0) {dot[i].xrate = -dot[i].xrate;}
                if (dot[i].ypos < 0) (dot[i].yrate = - dot[i].yrate);



                i++;
            }
        }

        //assign7: Mouse tracking  - used to change graphica feature in vicinty of mouse
        var mouseState = {
            pushed: false,
            x: 0,
            y:0,
        }
        transRect.addEventListener("mousedown", function(ev){
            mouseState.pushed=true;
            mouseState.x=ev.offsetX;
            mouseState.y=ev.offsetY;
            console.log("MOUSE Pushed vvvvvvvvvvv x:" + mouseState.x + ", y" + mouseState.y);
        });
        transRect.addEventListener("mousemove", function(ev){
            mouseState.x=ev.offsetX;
            mouseState.y=ev.offsetY;
        });
        transRect.addEventListener("mouseup", function(ev){
            mouseState.pushed=false;
            console.log("MOUSE Up ^^^^^^^^^^^^^^")
        });

        //assign7: write a distance function of four variables
        var distance=function(x1,y1,x2, y2){
            return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
        }


        // assign6.3: call draw() periodically
        // We do this last thing as the module loads
        //setInterval(draw, 40);


        window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma;

            // beta is the front-to-back tilt in degrees, where front is positive
            var tiltFB = eventData.beta;

            // alpha is the compass direction the device is facing in degrees
            var dir = eventData.alpha

            // call our orientation event handler
            //deviceOrientationHandler(tiltLR, tiltFB, dir);
            console.log(eventData.alpha);

        }, false);


});
