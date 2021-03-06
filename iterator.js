/**
 * イテレータパターン
 */
var agg = (function () {
    var index = 0,
        data = [1, 2, 3, 4, 5],
        length = data.length;

    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index + 1;
            return element;
        },

        hasNext: function () {
            return index < length;
        },

        rewind: function () {
            index = 0;
        },

        current: function () {
            return data[index];
        }
    };
}());

// クライアント側
while (agg.hasNext()) {
    console.log(agg.next());
} // 1, 2, 3, 4, 5

// 先頭に戻す
agg.rewind();
console.log(agg.current()); // 1