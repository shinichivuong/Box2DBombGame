var BackgroundLayer = cc.Sprite.extend({
    ctor:function () {
        this._super();
        cc.associateWithNative(this,cc.Sprite);
        this.initWithFile(res.Background_png);
        this.setAnchorPoint(cc.p(0,0));
    },
});