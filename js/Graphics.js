var Graphics;
(function (Graphics) {
   
    Graphics.stats;
    function init() {
        Graphics.stats = new Stats();
        Graphics.stats.domElement.style.position = 'absolute';
        Graphics.stats.domElement.style.left = '0px';
        Graphics.stats.domElement.style.top = '0px';
        document.body.appendChild(Graphics.stats.domElement);
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    }

    Graphics.init = init;
    function createCanvas(name) {
        var canvas = document.createElement('canvas');
        canvas.id = name;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        window.document.body.appendChild(canvas);
        window.onload = window.onresize = function () {
        };
        return canvas;
    }
    Graphics.createCanvas = createCanvas;

})(Graphics || (Graphics = {}));

