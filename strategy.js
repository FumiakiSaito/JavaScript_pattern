/**
 * ストラテジーパターン
 */

// バリデーションコア
var validator = {

    // 利用できる全ての検査
    types: {},

    // 現在の検証セッションでのエラーメッセージ
    messages: [],

    // 現在の検証の設定
    // 名前：検証の種類
    config: {},

    // インターフェイスメソッド
    validate: function (data) {

        var i, msg, type, checker, result_ok;

        this.messages = [];

        for (i in data) {
        	
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];

                if (!type) {
                    continue; // 検証する必要なし
                }

                if (!checker) {
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }

                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    // ヘルパー
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};



// 空の値でないか検査
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "the value cannot be empty"
}

// 値が数字か検査
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: "the value can only be a valid number, e.g. 1, 3.14 or 2010"
};

// 値が英数字か検査
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instrunctions: "the value can only contain characters and numbers, no special symbols"
};




// クライアント側
var data = {
    first_name: "Super",
    last_name: "Man",
    age: "unknown",
    username: "o_0"
};

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}
// Invalid value for *age*, the value can only be a valid number, e.g. 1, 3.14 or 2010
// Invalid value for *username*, undefined

