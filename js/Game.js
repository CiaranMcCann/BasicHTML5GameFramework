var Game = (function () {

    function Game() {
 
        Graphics.init();

        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvas);    
    }

    Game.prototype.update = function () {
      
      //update code ...

    };

    Game.prototype.draw = function () {
        
      //draw code ...

      var img = AssetManager.images["placeHolderImage"]; // Get my image from the asset manager

      this.canvasContext.drawImage(
        img,
        this.canvas.width/2 - img.width/2,
        this.canvas.height/2 - img.height/2
      )

    };

    Game.prototype.step = function () {
        
        Physics.world.Step(
              (1 / 60)   
           , 10       //velocity iterations
           , 10       //position iterations
        );
       Physics.world.DrawDebugData();
       Physics.world.ClearForces();

    };

    return Game;
})();
