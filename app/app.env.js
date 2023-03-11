envConfig.$inject = ['window'];

export default function envConfig(window) {
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'https://api.klusbib.be';

    // Base url
    window.__env.baseUrl = '/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}
