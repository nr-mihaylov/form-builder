function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'budget',
    currentRoute: 'prev',
    appRoute: 'budget',
    steps: [
        require('./steps/previous.js'),
        require('./steps/previousPercent.js'),
        require('./steps/current.js'),
    ],
}

module.exports = cfg;
