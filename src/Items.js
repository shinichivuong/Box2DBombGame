var Items = cc.Class.extend({
    body: null,
    sprite: null,
    fixtureDef: null,
    shape: null,
    active: true,
    angle: 0,
    time: null,

    type: null,
    ctor: function (pos) {

        this.makeBoxBody(pos, 40, 40, this.randomItem(), this.type);
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
        if(this.active){
            if (this.body.GetUserData().asset.visible==false){
                this.destroy();
                this.active==false;
            }
        }

    },
    randomItem: function () {
        var a = 0;
        var i = Math.floor((Math.random() * 4));
        if (i == 0) {
            a = res.ItemBoom_png;
            this.type = "itemBomb"
        }
        if (i == 1) {
            a = res.ItemSize_png;
            this.type = "itemSize";
        }
        if (i == 2) {
            a = res.ItemBoomSize_png;
            this.type = "itemSize";
        }
        if (i == 3) {
            a = res.ItemShoe_png;
            this.type = "itemShoe";
        }
        return a;
    },
    destroy:function () {
        world.DestroyBody(this.body);
    }

});