let realm = require('../services/Storage').realm
let User = require('../services/Storage').User

describe('Database', () => {
    let startLength = realm.objects('User').length;

    it('write', async () => {
        realm.write(() => {
              realm.create('User', { email: 'test@test.de',
                                                key: '1239048wejkiof4ihv323d1231'})
        });
        expect(realm.objects('User').length).toBe(startLength+1);
    });

    it('read', async () => {
        let users = realm.objects('User');
        let myUser = users.filtered('email = "test@test.de"')[0];
        expect('1239048wejkiof4ihv323d1231').toBe(myUser.key);
    });

    it('update', async () => {
        realm.write(() => {
                    let items = realm.objects('User');
                    let item = items.filtered('email = "test@test.de"')[0];
                    item.key = 'fjshnfkwejnfcw123412311239292';
                });
        let users = realm.objects('User');
        let myUser = users.filtered('email = "test@test.de"')[0];
        expect(myUser.key).toBe('fjshnfkwejnfcw123412311239292');
    });

    it('delete', async () => {
        realm.write(() => {
            let user = realm.objectForPrimaryKey('User', 'test@test.de');
            realm.delete(user);
        });
        expect(realm.objects('User').length).toBe(startLength);
    });
});