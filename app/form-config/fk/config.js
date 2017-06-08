function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'fk',
    currentRoute: 'OpretLejlighed',
    appRoute: 'fk',
    steps: [
        require('./steps/OpretLejlighed.js'),
        require('./steps/VaelgSkatteordning.js'),
        require('./steps/vsofr.js'),
        require('./steps/vsofl.js'),
        require('./steps/kaofr.js'),
        require('./steps/kaofl.js'),
        require('./steps/Spoergsmaal.js'),
        require('./steps/Salgaflejlighed.js'),
        require('./steps/Indtaegter.js'),
        require('./steps/Omkostninger.js'),
        require('./steps/psofinal.js'),
        require('./steps/vsofrfinal.js'),
        require('./steps/vsoflfinal.js')
    ],
}

module.exports = cfg;
