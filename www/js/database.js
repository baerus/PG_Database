var database = {
    init: function() {
        database.openDB().transaction(database.populateDB);
    },

    openDB: function() {
        return window.openDatabase("Database", "1.0", "PhoneGap Database", 200000);
    },

    populateDB: function(tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS names (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'name TEXT)');
    },

    addName: function(name) {
        database.openDB().transaction(function(tx) {
            tx.executeSql('INSERT INTO names (name) VALUES (?)', [name]);
        });
    },

    deleteName: function (id) {
        database.openDB().transaction(function(tx) {
            tx.executeSql('DELETE FROM names WHERE id = ?', [id]);
        });
    },

    updateName: function (newName, id) {
        database.openDB().transaction(function(tx) {
            tx.executeSql('UPDATE names SET name = ? WHERE id = ?', [newName, id]);
        });
    },

    getAllNames: function (callback) {
        database.openDB().transaction(
            function (tx) {
                tx.executeSql('SELECT id, name FROM names', [], function (tx, results) {
                    var result = [];
                    for (var i=0; i<results.rows.length; i++) {
                        result.push(results.rows.item(i));
                    }
                    callback(result);
                }, queryError);
            }, queryError
        );
    }
};

function queryError(tx, error) {
    console.log("error");
}
