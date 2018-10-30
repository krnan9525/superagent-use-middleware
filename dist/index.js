"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superAgentMethods = ['get', 'post', 'put', 'delete', 'options'];
exports.default = (function (superAgentInit, methods) {
    if (methods === void 0) { methods = superAgentMethods; }
    var superAgentInternal = Object.assign({}, superAgentInit);
    var uses = [];
    superAgentInternal.use = function (fn) {
        uses.push(fn);
        return this;
    };
    methods.forEach(function (method) {
        switch (method) {
          case 'get':
          case 'post':
          case 'put':
          case 'delete':
          case 'options':
                superAgentInternal[method] = function () {
                    var singleRequest = superAgentInit[method].apply(superAgentInternal, arguments);
                    uses.forEach(function (use) {
                        singleRequest = singleRequest.use(use);
                    });
                    return singleRequest;
                };
        }
    });
    return superAgentInternal;
});
//# sourceMappingURL=index.js.map
