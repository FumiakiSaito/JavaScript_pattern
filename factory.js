/**
 * ファクトリパターン
 */

function CarMaker() {}

// 親メソッド
CarMaker.prototype.drive = function () {
    console.log("Vroom, I have " + this.doors + " doors");
};

CarMaker.factory = function (type) {
    var constr = type,
        newcar;

    // コンストラクタが存在しなければエラー
    if (typeof CarMaker[constr] !== "function") {
        throw {
            name: "Error",
            message: constr + "doesn't exist"
        };
    }

    // この時点でコンストラクタの存在がわかる
    if (typeof CarMaker[constr].prototype.drive !== "function") {
        CarMaker[constr].prototype = new CarMaker();
    }

    // 新しいインスタンスを作成
    newcar = new CarMaker[constr]();
    return newcar;
};

CarMaker.Compact = function () {
    this.doors = 4;
};
CarMaker.Convertible = function () {
    this.doors = 2;
};
CarMaker.SUV = function () {
    this.doors = 17;
};


// クライアント側
var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var cherokke = CarMaker.factory('SUV');
corolla.drive();  // Vroom, I have 4 doors
solstice.drive(); // Vroom, I have 2 doors
cherokke.drive(); // Vroom, I have 17 doors