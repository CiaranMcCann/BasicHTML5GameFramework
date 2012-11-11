// Just some short-cut renaming
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var Physics;
(function (Physics) {
    Physics.worldScale;
    Physics.world;
    Physics.debugDraw;
    Physics.contactFunctionsList = [];
    function init(canvas) {
        Physics.worldScale = 30;
        Physics.world = new b2World(new b2Vec2(0, 10), true);
        Physics.debugDraw = new b2DebugDraw();
        Physics.debugDraw.SetSprite(canvas.getContext("2d"));
        Physics.debugDraw.SetDrawScale(Physics.worldScale);
        Physics.debugDraw.SetFillAlpha(0.3);
        Physics.debugDraw.SetLineThickness(1);
        Physics.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        Physics.world.SetDebugDraw(Physics.debugDraw);

		        //setup bounds of the world

		  // Create static ground
		  var bounds = 10;
		  var fixDef = new b2FixtureDef;
		  fixDef.density = 1.0;
		  fixDef.friction = 1.0;
		  fixDef.restitution = 0.2;
		  fixDef.shape = new b2PolygonShape;

		  var bodyDef = new b2BodyDef;
		  bodyDef.type = b2Body.b2_staticBody;

		  //bottom wall
		  fixDef.shape.SetAsBox(canvas.width / Physics.worldScale, 0);
		  bodyDef.position.x = 0;
		  bodyDef.position.y = canvas.height / Physics.worldScale;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

		  //left wall
		  fixDef.shape.SetAsBox(bounds / Physics.worldScale, canvas.height / Physics.worldScale);
		  bodyDef.position.x = bounds*-1/Physics.worldScale;
		  bodyDef.position.y = 0;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

		  //right wall
		  fixDef.shape.SetAsBox(0, canvas.height / Physics.worldScale);
		  bodyDef.position.x = canvas.width / Physics.worldScale;
		  bodyDef.position.y = 0;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);

		   //top wall
		  fixDef.shape.SetAsBox(canvas.width / Physics.worldScale, bounds / Physics.worldScale);
		  bodyDef.position.x = 0;
		  bodyDef.position.y = bounds*-1/Physics.worldScale;
		  Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);


      var fixDef = new b2FixtureDef;
      fixDef.density = 1.0;
      fixDef.friction = 1.0;
      fixDef.restitution = 0.0;
      fixDef.shape = new b2PolygonShape;

        //create some objects
      var bodyDef = new b2BodyDef;
      bodyDef.type = b2Body.b2_dynamicBody;
      for (var i = 0; i < 30; ++i) {
        if (Math.random() > 0.5) {
          fixDef.shape = new b2PolygonShape;
          fixDef.shape.SetAsBox(
          Math.random() + 0.1 //half width
          ,
          Math.random() + 0.1 //half height
          );
        } else {
          fixDef.shape = new b2CircleShape(
          Math.random() + 0.1 //radius
          );
        }
        bodyDef.position.x = Math.random() * 25;
        bodyDef.position.y = Math.random() * 10;
        Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
    }
}

    Physics.init = init;
    function addContactListener(func) {
        Physics.contactFunctionsList.push(func);
        var listener = new b2ContactListener();
        var removalList = [];
        listener.BeginContact = function (contact) {
            var lenght = Physics.contactFunctionsList.length;
            for(var i = 0; i < lenght; i++) {
                var removefunc = Physics.contactFunctionsList[i](contact);
                if(removefunc) {
                    removalList.push(i);
                }
            }
            for(var i = 0; i < removalList.length; i++) {
                Utilies.deleteFromCollection(Physics.contactFunctionsList, removalList[i]);
            }
            removalList = [];
        };
        Physics.world.SetContactListener(listener);
    }
    Physics.addContactListener = addContactListener;

    function pixelToMeters(pixels) {
        return pixels / Physics.worldScale;
    }
    Physics.pixelToMeters = pixelToMeters;

    function metersToPixels(meters) {
        return meters * Physics.worldScale;
    }
    Physics.metersToPixels = metersToPixels;

})(Physics || (Physics = {}));




