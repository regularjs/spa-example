
module.exports = function() {
    return function*(next) {
        try {
            yield next;
        } catch(e) {
            console.error(e.stack);
            this.body = 'errored';
        }
    };
};
