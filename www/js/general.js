function saveName() {
    var name = document.getElementById('nameInput').value;
    database.addName(name);
    showViews();
}

function showViews() {
    //remove everything (all views) before adding new ones
    document.getElementById('nameListView').innerHTML = '';

    database.getAllNames(function (data) {
        for(var i=0; i<data.length; i++) {
            // Neue View
            var div = document.createElement('div');
            document.getElementById('nameListView').appendChild(div);
            var deleteButton = createIconButton('delete');
            div.appendChild(deleteButton);
            var editButton = createIconButton('edit');
            div.appendChild(editButton);

            editButton.onclick = editButtonFunction(data[i].id, data[i].name);
            deleteButton.onclick = deleteButtonFunction(data[i].id);

            var text = document.createElement('span');
            div.appendChild(text);
            text.innerHTML = "ID: " + data[i].id + " - Name: " + data[i].name;
        }
    });
}

function editButtonFunction(id, oldName) {
    return function() {
        navigator.notification.prompt('Geben Sie einen neuen Namen für ' + oldName + ' ein.',
            function(results) {
                if(results.buttonIndex == 2) {
                    database.updateName(results.input1, id);
                    showViews();
                }
            },
            'Namen ändern',
            ['Abbrechen', 'Speichern'],
            ' ');
    };
}

function deleteButtonFunction(id) {
    return function() {
        database.deleteName(id);
        showViews();
    };
}

function createIconButton(fileName) {
    var button = document.createElement('input');
    button.type = 'button';
    button.className = fileName + 'Button';
    return button;
}
