let titles = [];
let notes = [];
let trashTitles = [];
let trashNotes = [];

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
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("notes", JSON.stringify(notes));
}

function saveTrashNotesToLocalStorage() {
    localStorage.setItem("trashTitles", JSON.stringify(trashTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function getNotesFromLocalStorage() {
    let myTitlesArr = JSON.parse(localStorage.getItem("titles"));
    let myNotesArr = JSON.parse(localStorage.getItem("notes"));

    if (myTitlesArr == null) {
        return true;
    }

    if (myNotesArr == null) {
        return true;
    }

    titles = myTitlesArr;
    notes = myNotesArr;
}

function getTrashNotesFromLocalStorage() {
    let myTrashTitlesArr = JSON.parse(localStorage.getItem("trashTitles"));
    let myTrashNotesArr = JSON.parse(localStorage.getItem("trashNotes"));

    if (myTrashTitlesArr == null) {
        return true;
    }

    if (myTrashNotesArr == null) {
        return true;
    }
    trashTitles = myTrashTitlesArr;
    trashNotes = myTrashNotesArr;
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = '';
    for (i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(titles[i], notes[i]);
    }
}

function renderTrashNotes() {
    let contentTrashRef = document.getElementById('trash_content');
    contentTrashRef.innerHTML = '';
    for (i = 0; i < trashNotes.length; i++) {
        contentTrashRef.innerHTML += getTrashNoteTemplate(trashTitles[i], trashNotes[i]);
    }
}

function addNote() {
    if (validateForm() == false) {
        return;
    }
    let titleInputRef = document.getElementById('title_input');
    let noteInputRef = document.getElementById('note_input');
    let titleInput = titleInputRef.value;
    let noteInput = noteInputRef.value;
    titles.push(titleInput);
    notes.push(noteInput);
    saveNotesToLocalStorage();
    renderNotes();
    
}

function takeToTrashNote(trashNote) {
    let trashTitleIndex = titles[trashNote];
    let trashNoteIndex = notes[trashNote];
    notes.splice(trashNote, 1);
    titles.splice(trashNote, 1);
    saveNotesToLocalStorage();
    trashTitles.push(trashTitleIndex);
    trashNotes.push(trashNoteIndex);
    saveTrashNotesToLocalStorage();
    renderNotes();
    renderTrashNotes();
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

function getNoteFromTrash(note) {
    let titleIndex = trashTitles[note];
    let noteIndex = trashNotes[note];
    trashNotes.splice(note, 1);
    trashTitles.splice(note, 1);
    saveTrashNotesToLocalStorage();
    titles.push(titleIndex);
    notes.push(noteIndex);
    saveNotesToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function deleteNote(index) {
    let trashTitleIndex = index;
    let trashNoteIndex = index;
    trashTitles.splice(trashTitleIndex, 1);
    trashNotes.splice(trashNoteIndex, 1);
    saveTrashNotesToLocalStorage();
    renderTrashNotes();
}

function editNote(note) {
    let titleIndex = titles[note];
    let noteIndex = notes[note];
    document.getElementById('note_input').value = noteIndex;
    document.getElementById('title_input').value = titleIndex;
    notes.splice(note, 1);
    titles.splice(note, 1);
    saveNotesToLocalStorage();
}
