let allNotes = {
    'notesTitles': [],
    'notes': [],
    'trashNotesTitles': [],
    'trashNotes': []
}

function init() {
    getNotesFromLocalStorage();
    getTrashNotesFromLocalStorage();
    renderNotes();
    renderTrashNotes();
    
}

function validateForm() {
    let checkTitleInput = document.getElementById('title_input');
    let checkNoteInput = document.getElementById('note_input');
    if (checkTitleInput.value == '') {
        return false;
    } 

    if (checkNoteInput.value == '') {
        return false;
    }
}

function saveNotesToLocalStorage() {
    localStorage.setItem("notesTitles", JSON.stringify(allNotes.notesTitles));
    localStorage.setItem("notes", JSON.stringify(allNotes.notes));
}

function saveTrashNotesToLocalStorage() {
    localStorage.setItem("trashNotesTitles", JSON.stringify(allNotes.trashNotesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(allNotes.trashNotes));
}

function getNotesFromLocalStorage() {
    let myTitlesArr = JSON.parse(localStorage.getItem("notesTitles"));
    let myNotesArr = JSON.parse(localStorage.getItem("notes"));

    if (myTitlesArr == null) {
        return true;
    }

    if (myNotesArr == null) {
        return true;
    }

    allNotes.notesTitles = myTitlesArr;
    allNotes.notes = myNotesArr;
}

function getTrashNotesFromLocalStorage() {
    let myTrashTitlesArr = JSON.parse(localStorage.getItem("trashNotesTitles"));
    let myTrashNotesArr = JSON.parse(localStorage.getItem("trashNotes"));

    if (myTrashTitlesArr == null) {
        return true;
    }

    if (myTrashNotesArr == null) {
        return true;
    }
    allNotes.trashNotesTitles = myTrashTitlesArr;
    allNotes.trashNotes = myTrashNotesArr;
}

function renderAllNotes() {
    renderNotes();
    renderTrashNotes();
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = '';
    for (i = 0; i < allNotes.notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(allNotes.notesTitles[i], allNotes.notes[i]);
    }
}

function renderTrashNotes() {
    let contentTrashRef = document.getElementById('trash_content');
    contentTrashRef.innerHTML = '';
    for (i = 0; i < allNotes.trashNotes.length; i++) {
        contentTrashRef.innerHTML += getTrashNoteTemplate(allNotes.trashNotesTitles[i], allNotes.trashNotes[i]);
    }
}

function addNote() {
    if (validateForm() == false) {
        return;
    }
    let titleInputRef = document.getElementById('title_input').value;
    let noteInputRef = document.getElementById('note_input').value;
    allNotes.notesTitles.push(titleInputRef);
    allNotes.notes.push(noteInputRef);
    saveNotesToLocalStorage();
    renderAllNotes();
    
}

function moveNote(indexNote, startKey, destinationKey) {
    let titles = allNotes[startKey + 'Titles'].splice(indexNote, 1);
    let notes = allNotes[startKey].splice(indexNote, 1);
    allNotes[destinationKey + 'Titles'].push(titles[0]);
    allNotes[destinationKey].push(notes[0]);
    saveNotesToLocalStorage();
    saveTrashNotesToLocalStorage();
    renderAllNotes();
}

function showNote() {
    showMyTrashNotes = document.getElementById('my_trash_notes');
    hideMyNotes = document.getElementById('my_notes');
    showMyTrashNotes.classList.add('d-none');
    hideMyNotes.classList.remove('d-none');
}

function showTrashNote() {
    showMyTrashNotes = document.getElementById('my_trash_notes');
    hideMyNotes = document.getElementById('my_notes');
    showMyTrashNotes.classList.remove('d-none');
    hideMyNotes.classList.add('d-none');
}

function deleteNote(index) {
    let trashTitleIndex = index;
    let trashNoteIndex = index;
    allNotes.trashNotesTitles.splice(trashTitleIndex, 1);
    allNotes.trashNotes.splice(trashNoteIndex, 1);
    saveTrashNotesToLocalStorage();
    renderAllNotes();
}

function editNote(note) {
    let titleIndex = allNotes.notesTitles[note];
    let noteIndex = allNotes.notes[note];
    document.getElementById('note_input').value = noteIndex;
    document.getElementById('title_input').value = titleIndex;
    allNotes.notes.splice(note, 1);
    allNotes.notesTitles.splice(note, 1);
    saveNotesToLocalStorage();
    renderAllNotes();
}
