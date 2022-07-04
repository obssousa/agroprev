module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true,
        "commonjs": true,
        "amd": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'vue/multi-word-component-names': 0,
    }
};
