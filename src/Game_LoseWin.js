var LayerWinLose = cc.Layer.extend({
    ctor: function (game, size, playername, score,winlose) {
        /**
         * game: gamemain
         * size: winsize
         * playername: its player's name
         * score: Player's score when he die or win
         */
        // cc.audioEngine.playMusic(res.sound_win);
        var staticGame = new cc.LabelTTF(winlose);
        staticGame.setFontSize(30);
        staticGame.setAnchorPoint(cc.p(0.5, 0.5));
        staticGame.setLocalZOrder(5);
        staticGame.setColor(cc.color(0, 0, 0));
        staticGame.setPosition(cc.p(size.width / 2 - 50, size.height / 2 + 60));
        game.addChild(staticGame);


        var player = new cc.LabelTTF("User Name:" + playername);
        player.setAnchorPoint(cc.p(0.5, 0.5));
        player.setFontSize(20);
        player.setLocalZOrder(5);
        player.setPosition(cc.p(size.width / 2 - 50, size.height / 2 + 30));
        player.setColor(cc.color(0, 0, 0));
        game.addChild(player);

        var score = new cc.LabelTTF("Score: " + score);
        score.setFontSize(20);
        score.setAnchorPoint(cc.p(0.5, 0.5));
        score.setLocalZOrder(5);
        score.setPosition(cc.p(size.width / 2 - 50, size.height / 2));
        score.setColor(cc.color(0, 0, 0));
        game.addChild(score);


    },
});
