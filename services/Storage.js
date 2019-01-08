const Realm = require('realm');

class User {}

User.schema = {
    name: 'User',
    primaryKey: 'email',
    properties: {
        key: 'string',
        email: 'string',
        lastLogin: {type: 'date', default: new Date()},
        hasNotification: {type: 'bool', default: true},
        hasTracking: {type: 'bool', default: true},
        isSeenBy: {type: 'string', default: 'everyone'},
        faculty: {type: 'string', optional: true},
        department: {type: 'string', optional: true}
    },
};

const realm = new Realm({schema: [User]});


module.exports = {
    realm,
    User
}

