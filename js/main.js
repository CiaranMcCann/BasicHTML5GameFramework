$(document).ready(function () {

    // This call back is only fired once all the games assets are loaded
    AssetManager.loadImages(function () {
        
            var game = new Game();
            function gameloop() {
                Graphics.stats.update();
                game.step();
                game.update();
                game.draw();
                window.requestAnimationFrame(gameloop);
            }
            gameloop();

    });
});
