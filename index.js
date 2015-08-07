var _ = require('lodash');

// babelify cli.js?

var indent = function(num, format) {
    var indentation = '';
    for (var i = num - 1; i >= 0; i--) {
        indentation += format || '\t';
    };
    return indentation;
}

var printNested = function(value, key) {
    var scss = '',
        level = 1;
    var printNestedInner = function(key, value) {
        var scss = '';

        if (_.isObject(value)) {
            scss += indent(level) + key + ': (\r\n';
            level++;
             _.mapKeys(value, function(value, key, obj) {
                scss += printNestedInner(key, value);
             })
            level--;
            scss += indent(level) + '),\n';
        } else {
            var str = isNaN(key) ? key + ': ' : '';
            scss += indent(level) + str + value + ',\r\n';
        }
        return scss;
    }

    scss+= '$' + key + ': (\n';
    _.mapKeys(value, function(value, key, obj) {
        scss += printNestedInner(key, value)
    })
    scss += ');\n';

    return scss
}

module.exports = function(data) {
    var scss = '';

    if (!data) {
        return;
    }

    data = JSON.parse(data);

    _.mapKeys(data, function(value, key) {
        if (_.isArray(value)) {
            scss += printNested(value, key)
        } else if (_.isObject(value)) {
            scss += printNested(value, key)
        } else {
            scss+= '$' + key + ': ' + value + ';\r\n';
        };

    });

    return scss;
}
