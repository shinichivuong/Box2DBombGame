/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    HelloWorld_png : "res/HelloWorld.png",

    Background_png : "res/background/background_Play3.png",

    BebongDown_png: "res/bebong/bebong_down.png",
    BebongUp_png: "res/bebong/bebong_up.png",
    BebongRight_png: "res/bebong/bebong_right.png",
    BebongLeft_png: "res/bebong/bebong_left.png",

    Bomb_png:"res/Bomb/bomb.gif",
    BomBang_png:"res/Bomb/bombbang.png",

    //Boss
    Creepleft_png: "res/creeps/quaivat 3_left.png",
    Creepright_png: "res/creeps/quaivat 3_right.png",
    Creepup_png: "res/creeps/quaivat 3_up.png",
    Creepdown_png: "res/creeps/quaivat 3_down.png",

    BigBossDown_png: "res/Boss/boss_down.png",
    BigBossLeft_png: "res/Boss/boss_left.png",
    BigBossRight_png: "res/Boss/boss_right.png",
    BigBossUp_png: "res/Boss/boss_up.png",
    BigBossHeart_png: "res/Boss/heart_boss.png",
    //map
    BoxGo_png: "res/Maps/boxgo.png",
    BoxGo2_png: "res/Maps/boxgo2.png",
    BoxSat_png: "res/Maps/boxsat.png",
    BoxCot_png: "res/Maps/boxcot.png",
    BoxSatMain_png: "res/Maps/boxsatmain.png",

    //items
    ItemBoom_png: "res/items/item_bomb.gif",
    ItemSize_png: "res/items/item_bombsize.gif",
    ItemShoe_png: "res/items/item_shoe.gif",
    ItemBoomSize_png: "res/items/item_bombsize.gif",
//
    PlayerSax: "res/other/bebong_dead.png",



};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
