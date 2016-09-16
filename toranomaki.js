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











