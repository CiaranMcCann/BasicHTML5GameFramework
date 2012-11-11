var AssetManager;
(function (AssetManager) {

    // Placing an image url in the below array
    // will make sure its is loaded before the game starts.
    // you can then acess the image by AssetManager.images["placeHolderImage"]
    // no need for the full url or the extenision
    var imagesToLoad = [
       'data/images/placeHolderImage.png',
    ];

    AssetManager.images = [];

    function loadImages(callback) {
        var sources = imagesToLoad;
        var images = [];
        var loadedImages = 0;
        var numImages = 0;
        for(var src in sources) {
            numImages++;
        }
        for(var src in sources) {
            var name = sources[src].match("[a-z,A-Z,0-9,-]+[.]png")[0].replace(".png", "");
            images[name] = new Image();
            images[name].onload = function () {
                Logger.log(" Image " + this.src + " loaded sucessfully ");
                if(++loadedImages >= numImages) {
                    AssetManager.images = images;
                    callback();
                }
            };
            images[name].src = sources[src];
        }
    }
    AssetManager.loadImages = loadImages;
    
})(AssetManager || (AssetManager = {}));

