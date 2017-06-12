var context = require.context('./collection', true, /\.(js)$/);
var widgets = [];

context.keys().forEach(function(path) {
    widgets.push(context(path));
});

export default (type) => widgets.find((widget) => {return widget.type === type});
