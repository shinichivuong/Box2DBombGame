var BoxObject = cc.Class.extend({
    body: null,
    sprite: null,
    fixtureDef: null,
    shape: null,
    isAlive: true,
    angle: 0,
    pos: null,
    ctor: function (pos) {
        // this.pos = pos;
    },
    makeBoxBody: function (pos, width, height, spriteImage, type) {
        this.pos = pos;
        this.fixtureDef = new b2FixtureDef;
        this.fixtureDef.density = 1000; //khoi luong rieng
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
            type:type.toString(),
            asset:this.sprite
        }

        this.body = world.CreateBody(bodyDef);
        this.body.CreateFixture(this.fixtureDef);
        this.body.SetFixedRotation(true);
    },
    makePolygonBody: function (verts, bodyType, density, restitution, friction, pos, angle) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = bodyType;
        bodyDef.position.Set(pos.x / PMR, pos.y / PMR);
        bodyDef.angle = cc.degreesToRadians(angle);
        this.body = this.world.CreateBody(bodyDef);
        this.shape = new b2PolygonShape();
        this.shape.SetAsArray(verts);
        var fixDef = new b2FixtureDef();
        fixDef.shape = this.shape;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;
        this.body.CreateFixture(fixDef);
    },

});