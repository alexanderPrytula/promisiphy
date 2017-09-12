'use strict';

module.exports = (controller, method, ...args) => {
    if (!(method in controller)) {
        return Promise.reject(new TypeError(`Provided controller has no ${method} method`));
    }

    let ctx = null;
    const i = args.findIndex(arg => arg.ctx);
    if (~i) {
        // apply context if found
        // and remove from args
        ctx = args[i].ctx;
        args.splice(i, 1);
    }

    return new Promise((resolve, reject) => {
        controller[method].apply(ctx, args.concat([(err, result) => {
            err ? reject(err) : resolve(result);
        }]));
    });
}
