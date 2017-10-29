module.exports = (env) => {
    let isProduction = env === 'production';

    return {
        publicPathDev: '/',
        publicPathProd: '/',

        get publicPath() {
            return isProduction ? this.publicPathProd : this.publicPathDev;
        }
    };
};