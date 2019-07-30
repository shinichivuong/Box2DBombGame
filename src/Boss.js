var Destroyer = BoxObject.extend({
    time: 0,
    heart: 10,
    heartSprite: null,
    pos: 0,
    arrHeartBoss: [],
    countHeartBoss:10,
    ctor: function (pos) {
        this.makeBoxBody(pos, 130, 130, res.BigBossDown_png, "boss");
        this.pos = pos;
    },
    update: function (dt) {
        this.time += dt;
        if (this.time > 2) {
            var huong = this.generateDirection();
            var pos = this.sprite.getPosition();
            if (huong.x == 0 && huong.y == 45) {
                this.sprite.setTexture(res.BigBossUp_png);

            }
            if (huong.x == 45 && huong.y == 0) {
                this.sprite.setTexture(res.BigBossRight_png);
            }
            if (huong.x == (-45) && huong.y == 0) {

                this.sprite.setTexture(res.BigBossLeft_png);

            }
            if (huong.x == 0 && huong.y == (-45)) {


                this.sprite.setTexture(res.BigBossDown_png);

            }
            var point = cc.pAdd(pos, huong);
            pointBody = this.sprite.getPosition();
            // this.body.ApplyForce(cc.p(huong.x/worldScale,huong.y/worldScale),cc.p(pointBody.x/worldScale,point.y/worldScale));
            this.body.SetLinearVelocity(cc.p(huong.x / worldScale, huong.y / worldScale));
            // this.// this.body.SetAngularVelocity(0);

            this.time = 0;
        }
        for (
            var i = 0;
            i < this.arrHeartBoss.length;
            i++
        )
        {
            this.arrHeartBoss[i].setPosition(this.sprite.getPosition().x - 135 / 3 + i * 10, this.sprite.getPosition().y + 90);
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
    bossHeart: function (game) {
        for (var i = 0; i < this.heart; i++) {
            var heartSprite = new cc.Sprite(res.BigBossHeart_png);
            heartSprite.setAnchorPoint(cc.p(0.5, 0.5));
            heartSprite.setLocalZOrder(2);
            heartSprite.setPosition(this.pos.x - 135 / 3 + i * 10, this.pos.y + 50);
            game.addChild(heartSprite);
            this.arrHeartBoss.push(heartSprite);
        }
    },
    destroy: function () {
        world.DestroyBody(this.body);
        this.sprite.setVisible(false);
    }
});
