module.exports = (env) => {
    let isProduction = env === 'production';

    return {
        useGitVersions: false,
        buildDirectory: 'dist',
        // This should be the url of the webserver delivering the files.
        //In this case this is the url of the webpack devserver.
        publicPathDev: 'http://localhost:8080/',
        publicPathProd: '/',
        baseHrefDev: '/',
        baseHrefProd: '/',

        get publicPath() {
            return isProduction ? this.publicPathProd : this.publicPathDev;
        },

        get baseHref() {
            return isProduction ? this.baseHrefProd : this.baseHrefDev;
        }
    };
};