var Destroyer = BoxObject.extend({
    time:0,
    ctor: function (pos) {
        this.makeBoxBody(pos, 135, 135, res.BigBossDown_png,"boss");
          },
    update: function (dt) {
        this.time += dt;
        if (this.time>2){
            var huong=this.generateDirection();
            var pos=this.sprite.getPosition();
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
            var point=cc.pAdd(pos,huong);
            pointBody=this.sprite.getPosition();
            // this.body.ApplyForce(cc.p(huong.x/worldScale,huong.y/worldScale),cc.p(pointBody.x/worldScale,point.y/worldScale));
            this.body.SetLinearVelocity(cc.p(huong.x/worldScale,huong.y/worldScale));
            // this.body.SetAngularVelocity(0);
            this.time=0;
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


    }
});