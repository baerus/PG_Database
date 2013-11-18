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
            var editButton = createIconButton('edit');
            div.appendChild(editButton);
            var deleteButton = createIconButton('delete');
            div.appendChild(deleteButton);

            editButton.onclick = editButtonFunction(data[i].id);
            deleteButton.onclick = deleteButtonFunction(data[i].id);

            var text = document.createElement('span');
            div.appendChild(text);
            text.innerHTML = "ID: " + data[i].id + " - Name: " + data[i].name;
        }
    });
}

function editButtonFunction(id) {
    return function() {
        navigator.notification.prompt('Howdy', myCallBack, 'TITEL', ['Okii', 'Abbruch!'], 'NICHTS haha!');

//        $('<div>').simpledialog2({
//            mode: 'button',
//            headerText: 'Änderung',
//            headerClose: true,
//            buttonPrompt: 'Geben Sie den neuen Namen ein',
//            buttonInput: true,
//            buttons : {
//                'Speichern': {
//                    click: function () {
//                        database.updateName($.mobile.sdLastInput, id);
//
//                        showViews();
//                    }
//                }
//            }
//        });
    };
}

function myCallBack(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}

function deleteButtonFunction(id) {
    return function() {
        database.deleteName(id);
        showViews();
    };
}

function createIconButton(fileName) {
    var button = document.createElement('input');
    button.type = 'image';
    button.src = 'img/' + fileName + '.png';
    button.style.width = 'auto';
    button.style.height = 'auto';
    button.style.padding = '10px 10px 0 10px';

    return button;
}

function updateName(id) {

}
