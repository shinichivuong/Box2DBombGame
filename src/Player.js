var Player = cc.Class.extend({
    body: null,
    sprite: null,
    shape: null,
    isAlive: true,
    angle:0,
    time:null,
    pos:null,
    countBomb:1,
    countSize:1,
    countSpeed:1,

    ctor: function (spritesheet, world, pos) {
        this.world;
        this.makeBoxBody(pos, 35, 35, res.BebongDown_png, "player");
    },
    makeBoxBody: function (pos, width, height, spriteImage, type) {
        this.pos=pos;
        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0; //khoi luong rieng
        fixtureDef.friction = 0.5;   // ma sat
        fixtureDef.restitution = 0; // dan hoi
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.filter.groupIndex=CATEGORY_PLAYER;
        fixtureDef.shape.SetAsBox(0.5 * width / worldScale, 0.5 * height / worldScale);
        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.Set(pos.x / worldScale, pos.y / worldScale);
        this.sprite = cc.Sprite.create(spriteImage);
        this.sprite.setPosition(pos.x, pos.y);
        bodyDef.userData ={
            type:type,
            asset:this.sprite
        };
        this.body = world.CreateBody(bodyDef);
        this.body.SetFixedRotation(true);
        this.body.CreateFixture(fixtureDef);
    },
    update: function (dt) {
        this.time+=dt;

        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);

        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                myActor.x = b.GetPosition().x * worldScale;
                myActor.y = b.GetPosition().y * worldScale;
                myActor.rotation = -1 * cc.radiansToDegrees(b.GetAngle());
            }
        }

        if (this.body.GetUserData().asset==null){
            this.destroy();
        }
        //----end0----
    },
    move: function (speedX,speedY) {
        // var pos = this.body.GetPosition();

        // this.body.SetPositionAndAngle(cc.p(xR, yR), 0);
        this.body.SetLinearVelocity(cc.p(speedX * 90 / worldScale, speedY * 90 / worldScale));


    },
    destroy:function () {
        world.DestroyBody(this.body);
    }
});