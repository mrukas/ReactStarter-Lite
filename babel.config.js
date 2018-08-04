const presets = [
    "@babel/preset-react",
    [
        "@babel/preset-env",
        {
            "modules": false
        }
    ]
];

const plugins = [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
];

module.exports = {
    presets,
    plugins
};