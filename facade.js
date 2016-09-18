/**
 * ファサードパターン
 */
var myevent = {
    // ・・・
    stop: function (e) {
        e.preventDefault();
        e.stopPropagetion();
    }
    // ・・・
}
