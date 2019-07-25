var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var countBomb = 1;
var countSize = 1;
var countSpeed = 1;
var CATEGORY_PLAYER = -1; // 0000000000000001
var CATEGORY_MONSTER = -2; // 0000000000000010
var CATEGORY_SCENERY = 3; // 0000000000000100
var world = null;
var worldScale = 30;
var killScore=0;
var arrMaps = [
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 4, 4, 2],
    [2, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 2],
    [2, 4, 4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 2],
    [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1]
];
var gameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new gamelayer();
        layer.init();
        this.addChild(layer);
    }
});
var gamelayer = cc.Layer.extend({
    arrBomb: [],
    arrCreep: [],
    arrItems: [],
    arrMap: [],
    speedX: 0,
    speedY: 0,
    arrLocalItem: [],
    _Boss: null,
    timeCreatBomb: 0,
    _userName: "Thu",
    _score: null,
    init: function () {
        KEYS = [];
        this._super();
        var background = new BackgroundLayer();
        this.addChild(background, 0);

        var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
        world = new Box2D.Dynamics.b2World(gravity, false);
        this.realMap();
        this._player = new Player("thu", world, cc.p(200, 250));
        this.addChild(this._player.sprite, 1);

        this._Boss = new Destroyer(cc.p(475, 435));
        this.addChild(this._Boss.sprite,1);

        this._score = new LayerScore(this._userName);
        this.addChild(this._score);

        this.creatBoss();
        this.creatItem();
        this._enableDebugDraw();
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {

            cc.eventManager.addListener(
                {
                    event: cc.EventListener.KEYBOARD,

                    onKeyPressed: function (key, event) {
                        KEYS[key] = true;
                    },

                    onKeyReleased: function (key, event) {
                        KEYS[key] = false;
                    }
                }, this);
        }
        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = function (contact) {
        }
        listener.EndContact = function (contact) {

        }
        listener.PostSolve = function (contact, impulse) {

        }
        listener.PreSolve = function (contact, oldManifold) {
            var a = contact.GetFixtureA().GetBody().GetUserData().type;
            var b = contact.GetFixtureB().GetBody().GetUserData().type;
            var aBody = contact.GetFixtureA().GetBody();
            var bBody = contact.GetFixtureB().GetBody();
            var spriteA = aBody.GetUserData().asset;
            var spriteB = bBody.GetUserData().asset;
            if ((a == "bombang" && b == "creep") || (b == "bombang" && a == "creep")) {
                if (a == "creep") {
                    spriteA.setVisible(false);
                    killScore+=10;
                }
                if (b == "creep") {
                    spriteB.setVisible(false);
                    killScore+=10;
                }
            }
             if (a == "bombang" && b == "4") {
                console.log("A la " + contact.GetFixtureA().GetBody().GetUserData().type + "   B la " + contact.GetFixtureB().GetBody().GetUserData().type);
                    spriteB.setVisible(false);
            }
            if (b == "bombang" && a == "4") {
                console.log("A la " + contact.GetFixtureA().GetBody().GetUserData().type + "   B la " + contact.GetFixtureB().GetBody().GetUserData().type);
                spriteA.setVisible(false);
            }
             if ((a == "player" && b == "itemBomb")) {
                countBomb += 1;
                spriteB.setVisible(false);
            }
             if (a == "player" && b == "itemShoe") {
                countSpeed += 0.5;
                spriteB.setVisible(false);
            }
             if (a == "player" && b == "itemSize") {
                countSize += 1;
                spriteB.setVisible(false);
            }
            if (a=="player" && b=="bombang"){
                spriteA.setTexture(res.PlayerSax);
            }
        }
        world.SetContactListener(listener);
        this.scheduleUpdate();

    },
    _enableDebugDraw: function () {
        // _world is my Box2d world
        // _worldScale is my PTM ratio used when I setup the world!
        // this._layerName is just for logging and is a local var to this layer
        //

        cc.log(this._layerName + '.' + arguments.callee.name);

        var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

        var oldDebugDrawCanvas = document.getElementById("debugDrawCanvas");
        if (oldDebugDrawCanvas) {
            document.getElementById("Cocos2dGameContainer").removeChild(oldDebugDrawCanvas);
        }
        var testCanvas = document.createElement("canvas");
        var styleString = document.getElementById("gameCanvas").style;

        testCanvas.id = 'debugDrawCanvas';
        testCanvas.height = document.getElementById("gameCanvas").height;
        testCanvas.width = document.getElementById("gameCanvas").width;
        testCanvas.style.height = styleString.height;
        testCanvas.style.width = styleString.width;

        testCanvas.style.position = "absolute";
        testCanvas.style.top = "0px";
        testCanvas.style.outline = "none";
        testCanvas.style.left = "0px";
        testCanvas.style.top = document.getElementById('Cocos2dGameContainer').style.paddingTop;
        testCanvas.style["-webkit-transform"] = "rotate(180deg) scale(-1, 1)";
        testCanvas.style["pointer-events"] = "none";
        document.getElementById("Cocos2dGameContainer").appendChild(testCanvas);
        this._debugDraw = new Box2D.Dynamics.b2DebugDraw();
        this._debugDraw.SetSprite(testCanvas.getContext("2d")); // test is the id of another canvas which debugdraw works on
        var scale = worldScale * cc.EGLView._getInstance().getViewPortRect().width / cc.EGLView._getInstance().getDesignResolutionSize().width;
        this._debugDraw.SetDrawScale(scale);

        this._debugDraw.SetFillAlpha(0.3);
        this._debugDraw.SetLineThickness(1.0);
        this._debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit | b2DebugDraw.e_edgeShape);
        world.SetDebugDraw(this._debugDraw);
    }
    ,

    update: function (dt) {
        // for (var i = 0; i < this.arrBomb.length; i++) {
        //     if ((this.arrBomb[i].isAlive) == false) {
        //         delete  this.arrBomb[i];
        //     }
        //
        // }
        //Update vị trí của Body
        world.Step(dt, 10, 10);
        for (var b = world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData().asset;
                myActor.x = b.GetPosition().x * worldScale;
                myActor.y = b.GetPosition().y * worldScale;
                myActor.rotation = -1 * cc.radiansToDegrees(b.GetAngle());
            }
        }
        //updateBang thong so
        this._score.update(dt);
        this._score.countBomLB.setString(countBomb.toString());
        this._score.countSpeedLB.setString(countSpeed.toString());
        this._score.countBomSizeLB.setString(countSize.toString());
        this._score.countKillBossLB.setString(killScore.toString());
        //Update Creep
        for (var i = 0; i < this.arrCreep.length; i++) {
            if (this.arrCreep[i].active) {
                this.arrCreep[i].update(dt);
            }
        }
        //Update Bomb
        for (var i = 0; i < this.arrBomb.length; i++) {
            if (this.arrBomb[i].active) {
                this.arrBomb[i].update(dt);
            }
        }
        //Update Boss
        this._Boss.update(dt);
        //Update Item
        for (var i = 0; i < this.arrItems.length; i++) {
            this.arrItems[i].update(dt);
        }
        //updateMap
        for (var i = 0; i < this.arrMap.length; i++) {
            if (this.arrMap[i].active) {
                this.arrMap[i].update(dt);
            }
        }
        this.timeCreatBomb += dt;


        world.DrawDebugData();
        if (KEYS[cc.KEY.up]) {
            this.speedY = 1
            this.speedX = 0
            this._player.sprite.setTexture(res.BebongUp_png)
        }
        else if (KEYS[cc.KEY.down]) {
            this.speedY = -1
            this.speedX = 0
            this._player.sprite.setTexture(res.BebongDown_png)
        }
        else this.speedY = 0;
        if (KEYS[cc.KEY.left]) {
            this.speedX = -1;
            this.speedY = 0
            this._player.sprite.setTexture(res.BebongLeft_png)
        }
        else if (KEYS[cc.KEY.right]) {
            this.speedX = 1;
            this.speedY = 0
            this._player.sprite.setTexture(res.BebongRight_png)
        }
        else this.speedX = 0;

        if (KEYS[cc.KEY.up] || KEYS[cc.KEY.down] || KEYS[cc.KEY.left] || KEYS[cc.KEY.right]) {
            this._player.move(this.speedX*countSpeed, this.speedY*countSpeed);
        }
        if (KEYS[cc.KEY.up] == false && KEYS[cc.KEY.down] == false && KEYS[cc.KEY.left] == false && KEYS[cc.KEY.right] == false) {
            // this._player.body.SetLinearVelocity(cc.p(this.speedX * 45 / worldScale, this.speedY * 45 / worldScale));
            this._player.move(0, 0);

        }
        if (KEYS[cc.KEY.space]) {
            var checkBom = true;
            for (var i = 0; i < this.arrBomb.length; i++) {
                if (this._player.sprite.getPosition() == this.arrBomb[i].sprite.getPosition()) {
                    checkBom = false
                }
            }
            if (this.timeCreatBomb > 0.5 && checkBom == true) {
                this.creatBomb(this._player.sprite.getPosition());
                this.timeCreatBomb = 0;
            }

        }

    }
    ,

    creatBomb: function (pos) {
        var count = 0;
        for (var i = 0; i < this.arrBomb.length; i++) {
            if (this.arrBomb[i].active) {
                count += 1;
            }

        }
        if (count <= countBomb) {
            var bomb = new Bomb(pos,countSize);
            this.addChild(bomb.sprite, 0);
            this.addChild(bomb.spriteLeft,0);
            this.addChild(bomb.spriteRight,0);
            this.addChild(bomb.spriteUp,0);
            this.addChild(bomb.spriteDown,0);
            this.arrBomb.push(bomb);
        }

    },
    creatItem: function () {
        var pointBoss = this._Boss.sprite.getPosition();
        var arrPointBoss = [pointBoss, cc.pAdd(pointBoss,cc.p(0,45)),cc.pAdd(pointBoss,cc.p(0,-45)),cc.pAdd(pointBoss,cc.p(45,45)),cc.pAdd(pointBoss,cc.p(-45,45)),cc.pAdd(pointBoss,cc.p(45,-45)),cc.pAdd(pointBoss,cc.p(-45,-45)),cc.pAdd(pointBoss,cc.p(45,0)),cc.pAdd(pointBoss,cc.p(-45,0))]
        var count = this.arrLocalItem.length;
        for (var k = 0; k < 20; k++) {
            var checkLocalcreep = true;
            var n = Math.floor(Math.random() * count);
            for (var i = 0; i < this.arrCreep.length; i++) {
                if (this.arrLocalItem[n] == this.arrCreep[i].sprite.getPosition() ) {
                    checkLocalcreep = false;
                }

            }
            for (var i=0;i<arrPointBoss.length;i++){
                if (this.arrLocalItem[n]==arrPointBoss[i]){
                    checkLocalcreep=false;
                }
            }
            if (checkLocalcreep==true) {
                var item = new Items(this.arrLocalItem[n]);
                this.addChild(item.sprite);
                this.arrItems.push(item);
            }
        }
    },
    creatBoss: function () {
        var creep1 = new Boss(cc.p(115, 75));
        var creep2 = new Boss(cc.p(340, 525));
        var creep3 = new Boss(cc.p(115, 435));
        var creep4 = new Boss(cc.p(790, 525));
        var creep5 = new Boss(cc.p(565, 120));
        var creep6 = new Boss(cc.p(430, 165));
        this.addChild(creep1.sprite,1);
        this.addChild(creep2.sprite,1);
        this.addChild(creep3.sprite,1);
        this.addChild(creep4.sprite,1);
        this.addChild(creep5.sprite,1);
        this.addChild(creep6.sprite,1);
        this.arrCreep.push(creep1);
        this.arrCreep.push(creep2);
        this.arrCreep.push(creep3);
        this.arrCreep.push(creep4);
        this.arrCreep.push(creep5);
        this.arrCreep.push(creep6);

    }
    ,
    realMap: function () {
        var type = null;
        for (var i = 0; i < arrMaps.length; i++) {
            for (var j = 0; j < arrMaps[i].length; j++) {
                var x = 45 * j;
                var y = 45 * i;
                var bit = arrMaps[i][j];
                if (bit != 0) {
                    switch (bit) {
                        case 1:
                            type = res.BoxSatMain_png;
                            var box = new BoxMap(new cc.p(x + 70, y + 30), 44, 44, Box2D.Dynamics.b2Body.b2_staticBody,
                                type, bit);
                            this.addChild(box.sprite);
                            break;
                        case 2:
                            type = res.BoxGo2_png;
                            var box = new BoxMap(new cc.p(x + 70, y + 30), 44, 44, Box2D.Dynamics.b2Body.b2_staticBody,
                                type, bit);
                            this.addChild(box.sprite);
                            break;
                        case 3:
                            type = res.BoxGo2_png;
                            var box = new BoxMap(new cc.p(x + 70, y + 30), 44, 44, Box2D.Dynamics.b2Body.b2_staticBody,
                                type, bit);
                            this.addChild(box.sprite);
                            break;
                        case 4:
                            type = res.BoxGo_png;
                            var box = new BoxMap(new cc.p(x + 70, y + 30), 44, 44, Box2D.Dynamics.b2Body.b2_staticBody,
                                type, bit);
                            this.addChild(box.sprite);
                            break;
                    }
                    this.arrMap.push(box);
                }
                else {
                    this.arrLocalItem.push(cc.p(x + 70, y + 30));
                }

            }
        }
    },
});