function getNoteTemplate(title, note) {
    return `<table>
<tbody>
<tr>
<td class="table-date"><p id="note"><b class="title-style">${title}:</b></p></td>
</tr>
<tr>
<td class="table-date"><p>${note}</p></td>
<td class="table-date td-button"><img onclick="moveNote(${[i]}, 'notes', 'trashNotes')" class="note-button" src="./assets/icon/icons8-add-trash-50.png" alt="icon"></td>
<td class="table-date td-button"><img onclick="editNote(${[i]})" class="note-button" src="./assets/icon/icons8-edit-50.png" alt="icon"></td>
</tr>
</tbody>
</table>`
}

function getTrashNoteTemplate(trashNotesTitles, trashNotes) {
    return `<table>
<tbody>
<tr>
<td class="table-date"><p id="note"><b class="title-style">${trashNotesTitles}:</b></p></td>
</tr>
<tr>
<td class="table-date"><p>${trashNotes}</p></td>
<td class="table-date td-button"><img onclick="moveNote(${[i]}, 'trashNotes', 'notes')" class="note-button" src="./assets/icon/icons8-note-50.png" alt="icon"></td>
<td class="table-date td-button"><img onclick="deleteNote(${[i]})" class="note-button" src="./assets/icon/icons8-trash-can-50 (1).png" alt="icon"></td>

</tr>
</tbody>
</table>`
}
