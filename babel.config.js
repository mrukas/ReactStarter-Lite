const presets = [
    "@babel/preset-react",
    "@babel/preset-stage-3",
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
    "@babel/plugin-proposal-class-properties"
];

module.exports = {
    presets,
    plugins
};