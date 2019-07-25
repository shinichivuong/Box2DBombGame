var Boss = cc.Class.extend({
    body: null,
    sprite: null,
    fixtureDef: null,
    shape: null,
    isAlive: true,
    angle: 0,
    time: null,
    timeBomBang: 0,
    pos: null,
    active: true,
    ctor: function (pos) {
        this.makeBoxBody(pos, 40, 40, res.Creepdown_png, "creep");
    },
    makeBoxBody: function (pos, width, height, spriteImage, type) {
        this.pos = pos;
        this.fixtureDef = new b2FixtureDef;
        this.fixtureDef.density = 1; //khoi luong rieng
        this.fixtureDef.friction = 1;   // ma sat
        this.fixtureDef.restitution = 0; // dan hoi
        this.fixtureDef.shape = new b2PolygonShape;
        this.fixtureDef.filter.groupIndex = CATEGORY_MONSTER;
        this.fixtureDef.shape.SetAsBox(0.5 * width / worldScale, 0.5 * height / worldScale);
        var bodyDef = new b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.Set(pos.x / worldScale, pos.y / worldScale);
        this.sprite = cc.Sprite.create(spriteImage);
        this.sprite.setPosition(pos.x, pos.y);
        bodyDef.userData = {
            type: type,
            asset: this.sprite
        };
        this.body = world.CreateBody(bodyDef);
        this.body.CreateFixture(this.fixtureDef);
        this.body.SetFixedRotation(true);

    },
    update: function (dt) {
        if (this.active) {
            this.time += dt;
            if (this.time > 2) {
                var huong = this.generateDirection();
                var pos = this.sprite.getPosition();
                if (huong.x == 0 && huong.y == 45) {
                    this.sprite.setTexture(res.Creepup_png);

                }
                if (huong.x == 45 && huong.y == 0) {
                    this.sprite.setTexture(res.Creepright_png);
                }
                if (huong.x == (-45) && huong.y == 0) {

                    this.sprite.setTexture(res.Creepleft_png);

                }
                if (huong.x == 0 && huong.y == (-45)) {


                    this.sprite.setTexture(res.Creepdown_png);

                }
                var point = cc.pAdd(pos, huong);
                if ((point.x) >= 0 && (point.x) <= 800 && (point.y) >= 0 && (point.y) <= 675) {
                    pointBody = this.sprite.getPosition();
                    this.body.SetLinearVelocity(cc.p(huong.x / worldScale, huong.y / worldScale));
                    // this.body.SetPositionAndAngle(cc.p(point.x/worldScale,point.y/worldScale),0);
                }

                this.time = 0;
            }
            if (this.active == false) {
                world.DestroyBody(this.body);
            }
            if (this.body.GetUserData().asset.visible == false) {
                this.destroy();
                this.active == false;
            }
        }

    },
    generateDirection: function () {
        /**
         * create a original Direction of creep
         */
        var v = 45;
        var i = Math.floor((Math.random() * 4));
        switch (i) {
            case 0:
                return cc.p(0, v);
                break;
            case 1:
                return cc.p(0, -v);
                break;
            case 2:
                return cc.p(v, 0);
                break;
            case 3:
                return cc.p(-v, 0);
                break;
        }
        return cc.p(0, 0);


    },
    destroy: function () {
        world.DestroyBody(this.body);
    }

});