var Bomb = cc.Class.extend({
    body: null,
    sprite: null,
    spriteUp: null,
    spriteDown: null,
    spriteRight: null,
    spriteLeft: null,
    fixtureDef: null,
    shape: null,
    active: true,
    angle: 0,
    time: null,
    timeBomBang: 0,
    pos: null,
    bombang: true,
    bombSize: 0,
    sizeLeft: 0,
    sizeRight: 0,
    sizeUp: 0,
    sizeDown: 0,
    bodyRight:null,
    bodyLeft:null,
    bodyUp:null,
    bodyDown:null,
    ctor: function (pos, bombSize) {
        if (bombSize > 10) {
            bombSize = 10
        }
        this.bombSize = bombSize;
        this.sizeUp = bombSize;
        this.sizeDown = bombSize;
        this.sizeLeft = bombSize;
        this.sizeRight = bombSize;

        pos = cc.p(this.changePointX(pos.x), this.changePointY(pos.y));
        this.pos = pos;
        // this.makeBoxBody(pos, 45, 45, res.Bomb_png, "player");
        this.fixtureDef = new b2FixtureDef;
        this.fixtureDef.shape = new b2PolygonShape;
        this.fixtureDef.filter.groupIndex = CATEGORY_PLAYER;
        this.fixtureDef.shape.SetAsBox(0.5 * 30 / worldScale, 0.5 * 30 / worldScale);
        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        bodyDef.position.Set(pos.x / worldScale, pos.y / worldScale);
        this.sprite = cc.Sprite.create(res.Bomb_png);
        this.sprite.setPosition(pos.x, pos.y);

        this.spriteUp = cc.Sprite.create("res/Bomb/bombbang_up" + this.sizeUp + ".png");
        this.spriteUp.setAnchorPoint(0.5, 0);
        this.spriteUp.setPosition(pos.x, pos.y);
        this.spriteDown = cc.Sprite.create("res/Bomb/bombbang_down" + this.sizeDown + ".png");
        this.spriteDown.setAnchorPoint(0.5, 1);
        this.spriteDown.setPosition(pos.x, pos.y);
        this.spriteLeft = cc.Sprite.create("res/Bomb/bombbang_right" + this.sizeRight + ".png");
        this.spriteLeft.setAnchorPoint(1, 0.5);
        this.spriteLeft.setPosition(pos.x, pos.y);
        this.spriteRight = cc.Sprite.create("res/Bomb/bombbang_left" + this.sizeLeft + ".png");
        this.spriteRight.setAnchorPoint(0, 0.5)
        this.spriteRight.setPosition(pos.x, pos.y);


        this.spriteUp.setVisible(false);
        this.spriteRight.setVisible(false);
        this.spriteLeft.setVisible(false);
        this.spriteDown.setVisible(false);
        bodyDef.userData = {
            type: "bomb",
            asset: this.sprite,
            spriteUp: this.spriteUp,
            spriteDown: this.spriteDown,
            spriteLeft: this.spriteLeft,
            spriteRight: this.spriteRight,
            hitBoss: true,
            sizeBombUp: this.sizeUp,
            sizeBombRight: this.sizeRight,
            sizeBombLeft: this.sizeLeft,
            sizeBombDown: this.sizeDown,
        };
        this.body = world.CreateBody(bodyDef);
        this.body.CreateFixture(this.fixtureDef);
        this.body.SetFixedRotation(true);
    },
    makeBoxLeft: function (size) {
        //left
        var fixtureLeft = new b2FixtureDef;
        var polygonShapeLeft = new b2PolygonShape
        polygonShapeLeft.SetAsOrientedBox(0.5 * 45 * (size + 1) / worldScale, 0.5 * 20 / worldScale, cc.p(-0.5 * 45 * (size + 1) / worldScale, 0), 0)
        fixtureLeft.shape = polygonShapeLeft;

        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        bodyDef.position.Set(this.pos.x / worldScale, this.pos.y / worldScale);
        bodyDef.userData = {
            type: "bombangLeft",
            asset: this.spriteLeft,
            sizeBombLeft: size,
            hitBoss: true,
            live:true,
        };
        this.bodyLeft = world.CreateBody(bodyDef);
        this.bodyLeft.CreateFixture(fixtureLeft);
        this.bodyLeft.SetFixedRotation(true);
    },
    makeBoxRight: function (size) {
        var fixtureLeft = new b2FixtureDef;

        var polygonShapeLeft = new b2PolygonShape
        polygonShapeLeft.SetAsOrientedBox(0.5 * 45 * (size + 1) / worldScale, 0.5 * 20 / worldScale, cc.p(0.5 * 45 * (size + 1) / worldScale, 0), 0)
        fixtureLeft.shape = polygonShapeLeft;

        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        bodyDef.position.Set(this.pos.x / worldScale, this.pos.y / worldScale);
        bodyDef.userData = {
            type: "bombangRight",
            asset: this.spriteRight,
            sizeBombRight: size,
            hitBoss: true,
            live:true,
        };
        this.bodyRight = world.CreateBody(bodyDef);
        this.bodyRight.CreateFixture(fixtureLeft);
        this.bodyRight.SetFixedRotation(true);
    },
    makeBoxUp: function (size) {
        var fixtureLeft = new b2FixtureDef;

        var polygonShapeLeft = new b2PolygonShape
        polygonShapeLeft.SetAsOrientedBox(0.5 * 20 / worldScale, 0.5 * 45 * (size + 1) / worldScale, cc.p(0, 0.5 * 45 * (size + 1) / worldScale), 0)
        fixtureLeft.shape = polygonShapeLeft;


        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        bodyDef.position.Set(this.pos.x / worldScale, this.pos.y / worldScale);
        bodyDef.userData = {
            type: "bombangUp",
            asset: this.spriteUp,
            sizeBombUp: size,
            hitBoss: true,
            live:true,
        };
        this.bodyUp = world.CreateBody(bodyDef);
        this.bodyUp.CreateFixture(fixtureLeft);
        this.bodyUp.SetFixedRotation(true);
    },
    makeBoxDown: function (size) {
        var fixtureLeft = new b2FixtureDef;

        var polygonShapeLeft = new b2PolygonShape
        polygonShapeLeft.SetAsOrientedBox(0.5 * 20 / worldScale, 0.5 * 45 * (size + 1) / worldScale, cc.p(0, -0.5 * 45 * (size + 1) / worldScale), 0)
        fixtureLeft.shape = polygonShapeLeft;

        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
        bodyDef.position.Set(this.pos.x / worldScale, this.pos.y / worldScale);
        bodyDef.userData = {
            type: "bombangDown",
            asset: this.spriteDown,
            live:true,
            sizeBombDown: size,
            hitBoss: true,
        };
        this.bodyDown = world.CreateBody(bodyDef);
        this.bodyDown.CreateFixture(fixtureLeft);
        this.bodyDown.SetFixedRotation(true);
    },
    update: function (dt) {
        this.timeBomBang += dt;
        this.time += dt;
        // var velocityIterations = 8;
        // var positionIterations = 1;
        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        // this.world.Step(dt, velocityIterations, positionIterations);
        //
        // //Iterate over the bodies in the physics world
        // for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
        //     if (b.GetUserData() != null) {
        //         //Synchronize the AtlasSprites position and rotation with the corresponding body
        //         var myActor = b.GetUserData();
        //         myActor.x = b.GetPosition().x * worldScale;
        //         myActor.y = b.GetPosition().y * worldScale;
        //         myActor.rotation = -1 * cc.radiansToDegrees(b.GetAngle());
        //     }
        // }

        if (this.timeBomBang > 2) {
            if (this.bombang) {
                var fixtureDef1 = this.body.GetFixtureList();
                if (fixtureDef1 != null) {
                    // this.body.SetLinearVelocity(cc.p(0,0));

                    this.body.DestroyFixture(fixtureDef1);
                    this.spriteDown.setVisible(true);
                    this.spriteLeft.setVisible(true);
                    this.spriteRight.setVisible(true);
                    this.spriteUp.setVisible(true);
//                     this.body.GetUserData().type = "bombang";
//                     // var vertices = [];
//                     // vertices[0] = new b2Vec2(-60 / worldScale, -5 / worldScale);
//                     // vertices[1] = new b2Vec2(-60 / worldScale, 5 / worldScale);
//                     //
//                     // vertices[2] = new b2Vec2(-5 / worldScale, 5 / worldScale);
//                     //
//                     // vertices[3] = new b2Vec2(-5 / worldScale, 60 / worldScale);
//                     // vertices[4] = new b2Vec2(5 / worldScale, 60 / worldScale);
//                     //
//                     // vertices[5] = new b2Vec2(5 / worldScale, 5 / worldScale);
//                     //
//                     // vertices[6] = new b2Vec2(60 / worldScale, 5 / worldScale);
//                     // vertices[7] = new b2Vec2(60 / worldScale, -5 / worldScale);
//                     //
//                     // vertices[8] = new b2Vec2(5 / worldScale, -5 / worldScale);
//                     //
//                     // vertices[9] = new b2Vec2(5 / worldScale, -60 / worldScale);
//                     // vertices[10] = new b2Vec2(-5 / worldScale, -60 / worldScale);
//                     //
//                     // vertices[11] = new b2Vec2(-5 / worldScale, -5 / worldScale);
// //Right
//                     var fixtureNew = new b2FixtureDef;
//                     polygonShape = new b2PolygonShape;
//                     fixtureNew.shape = polygonShape;
//                     polygonShape.SetAsOrientedBox(0.5 * 45 * (this.bombSize + 1) / worldScale, 0.5 * 20 / worldScale, cc.p(0.5 * 45 * (this.bombSize + 1) / worldScale, 0), 0)
//                     fixtureNew.shape = polygonShape;
// //UP
//                     var fixtureUp = new b2FixtureDef;
//                     fixtureUp.restitution = 0; // dan hoi
//
//                     var polygonShapeUp = new b2PolygonShape
//                     polygonShapeUp.SetAsOrientedBox(0.5 * 20 / worldScale, 0.5 * 45 * (this.bombSize + 1) / worldScale, cc.p(0, 0.5 * 45 * (this.bombSize + 1) / worldScale), 0)
//                     fixtureUp.shape = polygonShapeUp;
// //Left
//                     var fixtureLeft = new b2FixtureDef;
//                     fixtureLeft.restitution = 0; // dan hoi
//
//                     var polygonShapeLeft = new b2PolygonShape
//                     polygonShapeLeft.SetAsOrientedBox(0.5 * 45 * (this.bombSize + 1) / worldScale, 0.5 * 20 / worldScale, cc.p(-0.5 * 45 * (this.bombSize + 1) / worldScale, 0), 0)
//                     fixtureLeft.shape = polygonShapeLeft;
// //Down
//                     var fixtureDown = new b2FixtureDef;
//
//                     fixtureDown.restitution = 0; // dan hoi
//                     var polygonShapeDown = new b2PolygonShape
//
//                     polygonShapeDown.SetAsOrientedBox(0.5 * 20 / worldScale, 0.5 * 45 * (this.bombSize + 1) / worldScale, cc.p(0, -0.5 * 45 * (this.bombSize + 1) / worldScale), 0)
//                     fixtureDown.shape = polygonShapeDown;
//
//                     this.body.CreateFixture(fixtureNew);
//                     this.body.CreateFixture(fixtureUp);
//                     this.body.CreateFixture(fixtureLeft);
//                     this.body.CreateFixture(fixtureDown);
                    this.makeBoxDown(this.sizeDown);
                    this.makeBoxLeft(this.sizeLeft);
                    this.makeBoxRight(this.sizeRight);
                    this.makeBoxUp(this.sizeUp);
                    if (this.bodyLeft.GetUserData().live==false){
                        cc.log("NONO")
                        world.DestroyBody(this.bodyLeft);
                    this.bombang = false;

                }

                }

            }
        }
        if (this.timeBomBang > 2.2) {
            // world.DestroyBody(this.body);
            world.DestroyBody(this.bodyRight);
            world.DestroyBody(this.bodyDown);
            world.DestroyBody(this.bodyUp);
            world.DestroyBody(this.bodyLeft);
            this.sprite.setVisible(false);
            this.spriteRight.setVisible(false);
            this.spriteUp.setVisible(false);
            this.spriteDown.setVisible(false);
            this.spriteLeft.setVisible(false);

            this.active = false;
        }

        //----end0----
    },

    changePointX: function (x) {
        var n = (x - 70) % 45;
        var result = 0;
        if (n > 0 && n < 22.5) {
            result = x - n;
        }
        else if (n > 0 && n > 22.5) {
            result = x - n + 45;
        }
        else {
            result = x;
        }
        return result;
    },
    changePointY: function (y) {
        var n = (y - 30) % 45;
        var result = 0;
        if (n > 0 && n < 22.5) {
            result = y - n;
        }
        else if (n > 0 && n > 22.5) {
            result = y - n + 45;
        }
        else {
            result = y;
        }
        return result;
    },
});