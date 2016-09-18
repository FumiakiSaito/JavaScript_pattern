// アンチパターン：暗黙のグローバル
function sum(x, y) {
    result = x + y;
    return result;

sum(1, 2);
console.log(result); // 3


// 単独varパターン
function func() {
    var a = 1,
        b = 2,
        sum = a + b

    // 関数
 }

// ループキャッシュ(一度取得したレングスを使いまわす)
var myarray = [1,2,3,4,5];
for (var i = 0, max = myarray.length; i < max; i++) {
    console.log(myarray[i]); // 1,2,3,4,5
}

// コンスタラクタの頭文字は大文字にする
function MyConstructor() {}

// ECMAScriptのメソッド、プロパティはキャメルケース
// myFunction();
// ignoreCase

// 定数は大文字
var PI = 3.14;


// ドキュメント、タグ

 /**
  * JavaScriptアプリケーション
  *
  * @module myapp
  */
var MYAPP = {}; // 名前空間として使う空のオブジェクト

/**
 * 数学ユーティリティ
 *
 * @namespace MYAPP
 * @class math_stuff
 */
 MYAPP.math_stuff = {

     /**
      * 和を計算
      *
      * @method sum
      * @param {Number} a 数値1
      * @param {Number} b 数値2
      * @return {Number} 2つの数の和
      */
     sum: function (a, b) {
        return a + b;
     },

     /**
      * 籍を計算
      *
      * @method multi
      * @param {Number} a 数値1
      * @param {Number} b 数値2
      * @return {Number} 2つの数の積
      */
     multi: function (a, b) {
        return a * b;
     }
 }
 var a = MYAPP.math_stuff.sum(1,2);
 console.log(a); // 3


 /**
  * Personオブジェクトを作成
  * @class Person
  * @constructor
  * @namespace MYAPP
  * @param {String} first ファーストネーム
  * @param {String} last ラストネーム
  */
 MYAPP.Person = function (first, last) {
    /**
     * ファーストネーム
     * @property first_name
     * @type String
     */
     this.first_name = first;

     /**
      * ラストネーム
      * @property last_name
      * @type String
      */
     this.last_name = last;

    /**
     * 名前を返す
     *
     * @method getName
     * @return {String} 名前
     */
     MYAPP.Person.prototype.getName = function () {
        return this.first_name + ' ' + this.last_name;
     };
 }
var person = new MYAPP.Person('taro', 'yamada');
var name = person.getName();
console.log(name); // taro yamada


// JSON

// json文字列→オブジェクト
var jstr = '{"mykey": "my value"}';
var data = JSON.parse(jstr);
console.log(data.mykey); // my value

var dog = {
    name: "pochi",
    dob: new Date(),
    legs: [1, 2, 3, 4]
};

// jsonオブジェクト→json文字列
var jsonstr = JSON.stringify(dog);
console.log(jsonstr); // {"name":"pochi","dob":"2016-09-17T04:45:48.778Z","legs":[1,2,3,4]}



/**
 * コールバックパターン
 */

// まずはアンチパターン

// DOMノードを巡回する処理
var findNodes = function () {
    var i = 100000,
        nodes = [],
        found;

    while (i) {
        i -= 1;
        // 複雑なロジック・・
        nodes.push(found);
    }
    return nodes;
};

// 隠す処理
var hide = function (nodes) {
    var i = 0, max = nodes.length;
    for (; i < max; i += 1) {
        nodes[i].style.display = "none";
    }
}

// 巡回したノードを隠す
hide(findNodes());


// これはだめ。findNodes()が返した配列を、hide()がまたループするから。
// だけどhide()の処理をfindNodes()で実装すると巡回と変更のロジックが一体になる。。
// そこでコールバック関数として渡し、その実行を任せる！！

var findNodes = function (callback) {
    var i = 100000,
        nodes = [],
        found;

    // callbackが呼び出しできるか検査
    if (typeof callback !== "function") {
        callback = false;
    }

    while (i) {
        i -= 1;

        // 複雑なロジック・・

        // ここでコールバック！！
        if (callback) {
            callback(found);
        }

        nodes.push(found);
    }

    return nodes;
}

// コールバック関数
var hide = function (node) {
    node.style.display = "none";
};

// ノードを見つけたら隠す
findNodes(hide);

// コールバック関数を無名関数にすることもできる
findNodes(function (node) {
    node.style.display = "block";
});





/**
 * 即時関数パターン
 */
(function () {
    alert('watch out!');
}());

(function () {
    alert('watch out');
})();

// 最後のカッコの位置が違うがどっちでも動作する。JSLintは最初の公文を推奨する
// 1回しか実行しないが余計な変数を作って、グローバルに漏れるのを防ぐ為に使う
 

// 即時関数に引数を渡すこともできる
(function (who, when) {
    console.log("I met " + who + " on " + when);
}("Joe Black", new Date())); // I met Joe Black on Sat Sep 17 2016 14:47:12 GMT+0900 (JST)


// 即時関数で戻り値を返す場合はfunctionを()でくくらなくてもよい(くくってもよい)
// ただ最後の()を見落とすとただの関数と勘違いするのでくくったほうがよい？
var result = function () {
    return 2 + 2;
}();
    
var result = (function () {
    return 2 + 2;
}());


/**
 *即時オブジェクト初期化パターン
 *これもグローバル汚染を防ぐ方法のひとつ
 */
({
    maxwidth: 600,
    maxheight: 400,

    // ユーティリティメソッド
    gimmeMax: function () {
        return this.maxwidth +  "x" + this.maxheight;
    },

    // 初期化
    init: function () {
        console.log(this.gimmeMax());
    }
}).init(); // 600x400


/**
 * 設定オブジェクトパターン
 */
var conf = {
    username: "batman",
    first: "Bruce",
    last: "Wayne"
};
addPerson(conf);



/**
 * 名前空間パターン
 */

if (typeof MYAPP === "undefined") {
    var MYAPP = {}
}
// 短いやりかた
var MYAPP = MYAPP || {};



// namespace関数を作ってプロパティを作成
MYAPP.namespace('MYAPP.modules.module2');

// これは以下と等価値
//var MYAPP = {
//    modules: {
//        mdule2: {}
//    }
//};

var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;

    // 冗長なグローバルを取り除く
    if (parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }

    // プロパティが存在しなければ作成する
    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}
MYAPP.namespace('once.upon.a.time');
console.log(MYAPP); // { namespace: [Function], once: { upon: { a: [Object] } } }



 /**
  * プライベートなプロパティとメソッド
  */

// 以下のメンバは全てパブリックになる
var myobj = {
    myprop: 1,
    getProp: function () {
        return this.myprop;
    }
};
console.log(myobj.myprop);    // 1
console.log(myobj.getProp()); // 1

// プライベートメンバ
function MyObj() {
    var myprop = 1;
    this.getProp = function () {
        return myprop;
    };
}
var testObj = new MyObj;
console.log(testObj.myprop);    // undefined
console.log(testObj.getProp()); // 1


/**
 * モジュールパターン
 * 名前空間、即時関数、プライベートメンバ・・の応用
 */

MYAPP.namespace('MyAPP.utilities.array');
MyAPP.utilities.array = (function () {
    return {
        inArray: function (needle, haystack) {
            //・・
        },
        isArray: function (a) {
            //・・
        }
    };
}












