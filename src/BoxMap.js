var BoxMap = cc.Class.extend({
    world: null,
    body: null,
    sprite: null,
    shape: null,
    game: null,
    active:true,
    ctor: function (pos, width, height, static, spriteImage, type) {
        var fixtureDef = new b2FixtureDef;
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.density = 100.0; //khoi luong rieng
        fixtureDef.friction = 0.5;   // ma sat
        fixtureDef.restitution = 0; // dan hoi
        // fixtureDef.filter.groupIndex = CATEGORY_SCENERY;
        fixtureDef.shape.SetAsBox(0.5 * width / worldScale, 0.5 * height / worldScale);
        var bodyDef = new b2BodyDef;
        bodyDef.type = static;
        bodyDef.position.Set(pos.x / worldScale, pos.y / worldScale);
        this.sprite = cc.Sprite.create(spriteImage);
        this.sprite.setPosition(pos.x, pos.y);
        bodyDef.userData = {
            asset: this.sprite,
            type: type
        };

        this.body = world.CreateBody(bodyDef);
        this.body.SetLinearDamping(1.2);
        this.body.SetAngularDamping(0.2);
        this.body.SetFixedRotation(true);
        this.body.CreateFixture(fixtureDef);
    },
    update: function (dt) {
        if (this.active){
            if (this.body.GetUserData().asset.visible == false) {
                // this.destroy();
                // this.active == false;
            }
        }

    },
    destroy: function () {
        world.DestroyBody(this.body);
    }

})