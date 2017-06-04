var context = require.context('./collection', false, /\.(js)$/);
var rules = [];

context.keys().forEach(function(path) {
    rules.push(context(path));
});

export default (type) => rules.find((rule) => {return rule.type === type}).ruleFunc;
