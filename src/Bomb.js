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
    ctor: function (pos, bombSize) {
        this.bombSize = bombSize;
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
        this.spriteUp = cc.Sprite.create();
        this.spriteUp.setAnchorPoint(0.5, 0);
        this.spriteUp.setPosition(pos.x, pos.y);
        this.spriteDown = cc.Sprite.create();
        this.spriteDown.setAnchorPoint(0.5, 1);
        this.spriteDown.setPosition(pos.x, pos.y);
        this.spriteLeft = cc.Sprite.create();
        this.spriteLeft.setAnchorPoint(1, 0.5);
        this.spriteLeft.setPosition(pos.x, pos.y);
        this.spriteRight = cc.Sprite.create();
        this.spriteRight.setAnchorPoint(0, 0.5)
        this.spriteRight.setPosition(pos.x, pos.y);
        bodyDef.userData = {
            type: "bomb",
            asset: this.sprite,
            spriteUp: this.spriteUp,
            spriteDown: this.spriteDown,
            spriteLeft: this.spriteLeft,
            spriteRight: this.spriteRight,
        };
        this.body = world.CreateBody(bodyDef);
        this.body.CreateFixture(this.fixtureDef);
        this.body.SetFixedRotation(true);
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
                    cc.log("this.bom" + this.bombSize)
                    this.spriteUp.setTexture("res/Bomb/bombbang_up" + this.bombSize + ".png");
                    this.spriteDown.setTexture("res/Bomb/bombbang_down" + this.bombSize + ".png");
                    this.spriteRight.setTexture("res/Bomb/bombbang_right" + this.bombSize + ".png");
                    this.spriteLeft.setTexture("res/Bomb/bombbang_left" + this.bombSize + ".png");
                    this.body.DestroyFixture(fixtureDef1);

                    // this.sprite.setTexture(res.BomBang_png);
                    this.body.GetUserData().type = "bombang";
                    var vertices = [];
                    vertices[0] = new b2Vec2(-60 / worldScale, -5 / worldScale);
                    vertices[1] = new b2Vec2(-60 / worldScale, 5 / worldScale);

                    vertices[2] = new b2Vec2(-5 / worldScale, 5 / worldScale);

                    vertices[3] = new b2Vec2(-5 / worldScale, 60 / worldScale);
                    vertices[4] = new b2Vec2(5 / worldScale, 60 / worldScale);

                    vertices[5] = new b2Vec2(5 / worldScale, 5 / worldScale);

                    vertices[6] = new b2Vec2(60 / worldScale, 5 / worldScale);
                    vertices[7] = new b2Vec2(60 / worldScale, -5 / worldScale);

                    vertices[8] = new b2Vec2(5 / worldScale, -5 / worldScale);

                    vertices[9] = new b2Vec2(5 / worldScale, -60 / worldScale);
                    vertices[10] = new b2Vec2(-5 / worldScale, -60 / worldScale);

                    vertices[11] = new b2Vec2(-5 / worldScale, -5 / worldScale);

                    var fixtureNew = new b2FixtureDef;
                    // fixtureNew.restitution = 0; // dan hoi
                    polygonShape = new b2PolygonShape;
                    fixtureNew.shape = polygonShape;
                    // fixtureNew.filter.groupIndex = CATEGORY_PLAYER;
                    polygonShape.SetAsOrientedBox(0.5 * 45*(this.bombSize+1) / worldScale, 0.5 * 20 / worldScale, cc.p(0.5 * 45*(this.bombSize+1) / worldScale, 0), 0)
                    fixtureNew.shape = polygonShape;
//UP
                    var fixtureUp = new b2FixtureDef;
                    fixtureUp.restitution = 0; // dan hoi
                    // fixtureUp.filter.groupIndex = CATEGORY_PLAYER;

                    var polygonShapeUp = new b2PolygonShape
                    polygonShapeUp.SetAsOrientedBox(0.5 * 20 / worldScale, 0.5 *45*(this.bombSize+1) / worldScale, cc.p(0, 0.5 *45*(this.bombSize+1) / worldScale), 0)
                    fixtureUp.shape = polygonShapeUp;
//Left
                    var fixtureLeft = new b2FixtureDef;
                    fixtureLeft.restitution = 0; // dan hoi
                    // fixtureLeft.filter.groupIndex = CATEGORY_PLAYER;

                    var polygonShapeLeft = new b2PolygonShape
                    polygonShapeLeft.SetAsOrientedBox(0.5 * 45*(this.bombSize+1) / worldScale, 0.5 * 20 / worldScale, cc.p(-0.5 * 45*(this.bombSize+1) / worldScale, 0), 0)
                    fixtureLeft.shape = polygonShapeLeft;
//Down
                    var fixtureDown = new b2FixtureDef;

                    fixtureDown.restitution = 0; // dan hoi
                    var polygonShapeDown = new b2PolygonShape
                    // fixtureDown.filter.groupIndex = CATEGORY_PLAYER;

                    polygonShapeDown.SetAsOrientedBox(0.5 * 20 / worldScale, 0.5 * 45*(this.bombSize+1) / worldScale, cc.p(0, -0.5 * 45*(this.bombSize+1) / worldScale), 0)
                    fixtureDown.shape = polygonShapeDown;

                    // fixtureNew.shape = new b2PolygonShape;
                    // fixtureNew.shape.SetAsArray(vertices, vertices.length);

                    // fixtureNew.shape.SetAsBox(0.5 * 30 / worldScale, 0.5 * 30 / worldScale);
                    this.body.CreateFixture(fixtureNew);
                    this.body.CreateFixture(fixtureUp);
                    this.body.CreateFixture(fixtureLeft);
                    this.body.CreateFixture(fixtureDown);
                    // this.body.CreateFixture(fixtureNew);
                    this.bombang = false;
                }


            }
        }
        // if (this.timeBomBang > 2.2) {
        //     world.DestroyBody(this.body);
        //     this.sprite.setVisible(false);
        //     this.spriteRight.setVisible(false);
        //     this.spriteUp.setVisible(false);
        //     this.spriteDown.setVisible(false);
        //     this.spriteLeft.setVisible(false);
        //
        //     this.active = false;
        // }
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