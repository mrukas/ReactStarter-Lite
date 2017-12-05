module.exports = (env) => {
    let isProduction = env === 'production';

    return {
        // This should be the url of the webserver delivering the files.
        publicPathDev: 'http://localhost:8080/',
        publicPathProd: '/',
        baseHrefDev:'/',
        baseHrefProd: '/',

        get publicPath() {
            return isProduction ? this.publicPathProd : this.publicPathDev;
        },

        get baseHref() {
            return isProduction ? this.baseHrefProd : this.baseHrefDev;
        }
    };
};