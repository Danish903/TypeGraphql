"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
const resolver_metadata_1 = require("../helpers/resolver-metadata");
const decorators_1 = require("../helpers/decorators");
const errors_1 = require("../errors");
function Subscription(returnTypeFuncOrOptions, maybeOptions) {
    const { options, returnTypeFunc } = decorators_1.getTypeDecoratorParams(returnTypeFuncOrOptions, maybeOptions);
    return (prototype, methodName) => {
        const metadata = resolver_metadata_1.getResolverMetadata(prototype, methodName, returnTypeFunc, options);
        const subscriptionOptions = options;
        if (Array.isArray(options.topics) && options.topics.length === 0) {
            throw new errors_1.MissingSubscriptionTopicsError(metadata.target, metadata.methodName);
        }
        getMetadataStorage_1.getMetadataStorage().collectSubscriptionHandlerMetadata(Object.assign({}, metadata, { topics: subscriptionOptions.topics, filter: subscriptionOptions.filter }));
    };
}
exports.Subscription = Subscription;
