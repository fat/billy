!function () {

    document.write("<div class='divCanvas'><canvas id='myCanvas' style='display: block;' width="+window.innerWidth+" height="+window.innerHeight+"><img src='sup.jpeg'></canvas></div>");

    document.onmousemove = moveHandler; 

    document.addEventListener('touchmove', function (e) {
        animate(e.touches[0].pageX, e.touches[0].pageY)
    })

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    function moveHandler (e) {
        e = e || window.event;
        animate(e.clientX, e.clientY);
    }

    function animate (xPos, yPos) {
        var imgObj = new Image();
        var w      = window.innerWidth;
        var h      = window.innerHeight;

        imgObj = context.getImageData(0, 0, xPos, yPos);

        var data         = imgObj.data;
        var sourceWidth  = imgObj.width;
        var sourceHeight = imgObj.height;

        var destX = canvas.width / 2 - sourceWidth / 2;
        var destY = canvas.height / 2 - sourceHeight / 2;

        for (var y = 0; y < sourceHeight; y++) { 
            for (var x = 0; x < sourceWidth; x++) {
                data[((sourceWidth * y) + x) * 4]      = data[((sourceWidth * y) + x) * 4 + 4];
                data[((sourceWidth * y) + x) * 4-xPos] = data[((sourceWidth * y) + x) * 4 + 1];
                data[((sourceWidth * y) + x) * 4+xPos] = data[((sourceWidth * y) + x) * 4 + 2 - 4];
            }
        }

        context.putImageData(imgObj, destX, destY);
    }

    window.onload = function () {
        var imgObj = new Image();
        imgObj.onload = function () {
            var sourceWidth  = imgObj.width;
            var sourceHeight = imgObj.height;
            var destX = 0;
            var destY = 0;
            context.drawImage(imgObj, destX, destY);
        }
        imgObj.src = "sup.jpeg";
    }
}();