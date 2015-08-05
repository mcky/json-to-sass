var _ = require('lodash');

module.exports = function(data) {
    var scss = '';

    if (!data) {
        return;
    }

    data = JSON.parse(data);

    _.mapKeys(data, function(value, key) {
        var isObject = typeof(value) === 'object',
            isArray = Array.isArray(value);

        if (isObject || isArray) {
            scss+= '$' + key + ': (\n';
            var i = 0;

            _.mapKeys(value, function(value, key, obj) {
                i++;
                var len = Object.keys(obj).length,
                    comma = i !== len ? ',' : '';
                if (isArray) {
                    scss+= '\t' + value + comma + '\r\n';
                } else {
                    scss+= '\t' + key + ': ' + value + comma + '\r\n';
                };
            })

            scss+= ');\n';
        } else {
            scss+= '$' + key + ': ' + value + ';\r\n';
        };

    });

    return scss;
}
