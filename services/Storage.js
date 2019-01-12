const Realm = require('realm');

class Profile {}

Profile.schema = {
    name: 'Profile',
    primaryKey: 'email',
    properties: {
        key: 'string',
        email: 'string',
        username: 'string',
        firstname: 'string',
        lastname: 'string',
        role: 'string'
    },
};

Settings.schema = {
    isNotification: {type: 'bool', default: true},
    isTracking: {type: 'bool', default: true},
    visibility: {type: 'string', default: 'everyone'},
    faculty: {type: 'string', optional: true},
    department: {type: 'string', optional: true}
}
const realm = new Realm({schema: [Profile]});


module.exports = {
    realm,
    User
}

