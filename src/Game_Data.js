var tiachops = [res.TiaChopDown_png, res.TiaChopLeft_png, res.TiaChopRight_png, res.TiaChopUp_png,res.tiachop1_png];
var bebongs = [res.BebongDown_png, res.BebongLeft_png, res.BebongRight_png, res.BebongUp_png,res.bebong1_png];
var khokhos = [res.KhoKhoDown_png, res.KhoKhoLeft_png, res.KhoKhoRight_png, res.KhoKhoUp_png,res.khoKho1_png];
var arrScorePlayer = [];
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var countSize = 1;
var countSpeed = 1;
var CATEGORY_PLAYER = -1; // 0000000000000001
var CATEGORY_MONSTER = -2; // 0000000000000010
var world = null;
var worldScale = 30;
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