import initComment from '../src/index';
// import initComment from '../npm/';
initComment({
    el: '#app',
    urlConfig: {
        host: 'http://localhost:8080',
        get: '/api/comment/cnchar',
        insert: '/api/comment/cnchar',
        reply: '/api/reply/cnchar'
    }
});