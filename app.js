
//If use adds a note, add it to the local storage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //console.log(notesObj);
    showNotes();
})

//Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          <button id="delete${index}" onclick="markImp(this.id)" class="btn btn-primary my-2 mark">Mark as Important</button>
        </div>
      </div>`;
    })
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `Nothing to show here! Use "Add a Note" section above to add notes.`;
    }
}

//Function to delete Note
function deleteNote(index) {
    //console.log("Deleted", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Searching
let search = document.getElementById('searchTxt');
search.addEventListener("input", function (e) {
    let inputVal = search.value;
    //console.log("Input Event Fired",inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

//Mark as Important
function markImp(index) {
    let btn = document.getElementById(`${index}`);
    if (btn.innerText == "Remove Bookmark") {
        card = btn.parentElement;
        card = card.parentElement;
        card.style.border = "1px solid rgba(0,0,0,.125)";
        card.style.boxShadow = "none";
        btn.innerText = "Mark as Important";
    }

    else {
        card = btn.parentElement;
        card = card.parentElement;
        card.style.boxShadow = "0px 0px 7px 2px rgb(196 19 19 / 80%)";
        btn.innerText = "Remove Bookmark";
    }
}

//Things to Add
/* 
1. Add Title
2. Search by Title
3. Dates of Notes
4. Separate Notes by user
*/