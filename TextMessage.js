//module.exports = 'Hello world from TextMessage module';

exports.SimpleMessage = 'Hello world';
//or
//module.exports.SimpleMessage = 'Hello world';

module.exports.log = function (msg) { 
    console.log(msg);
};


