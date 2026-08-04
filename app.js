let bibleVerses = [];
let selectedVerse = null;


async function loadBible(){

    const response = await fetch("bible.json");

    const bible = await response.json();

    bibleVerses = bible.verses;


    const books = [...new Set(
        bibleVerses.map(v => v.book_name)
    )];


    const bookGrid = document.getElementById("bookGrid");


    books.forEach(book => {

        const card = document.createElement("div");

        card.className = "book";

        card.textContent = book;


        card.onclick = () => {

            openBook(book);

        };


        bookGrid.appendChild(card);

    });

}



function openBook(book){

    document.getElementById("bookTitle").textContent = book;

    document.getElementById("verseContent").innerHTML =
        "Select a chapter to begin.";


    const chapters = [...new Set(

        bibleVerses

        .filter(v => v.book_name === book)

        .map(v => v.chapter)

    )];


    const chapterList = document.getElementById("chapterList");

    chapterList.innerHTML = "";


    chapters.forEach(chapter => {


        const button = document.createElement("div");

        button.className = "chapter";

        button.textContent = "Chapter " + chapter;


        button.onclick = () => {

            openChapter(book, chapter);

        };


        chapterList.appendChild(button);


    });

}



function openChapter(book, chapter){


    const verses = bibleVerses.filter(v =>

        v.book_name === book &&
        v.chapter === chapter

    );


    const verseContent = document.getElementById("verseContent");


    verseContent.innerHTML = `

        <h3 class="chapter-title">

        ${book} ${chapter}

        </h3>

    `;


    const highlights = JSON.parse(
        localStorage.getItem("arkstudy_highlights") || "[]"
    );


    verses.forEach(v => {


        const verseID = `${book}_${chapter}_${v.verse}`;


        const isHighlighted = highlights.includes(verseID);


        verseContent.innerHTML += `

        <div class="verse ${isHighlighted ? "highlight" : ""}"
        data-id="${verseID}"
        onclick="showVerseMenu(this)">

            <span class="verse-number">
            ${v.verse}
            </span>

            ${v.text}

        </div>

        `;


    });

}



function searchBible(){

    const query = document

        .getElementById("searchInput")

        .value

        .toLowerCase()

        .trim();


    if(!query){
        return;
    }


    const results = bibleVerses.filter(v =>

        v.text.toLowerCase().includes(query)

    );


    const verseContent = document.getElementById("verseContent");


    verseContent.innerHTML = `

        <h3 class="chapter-title">

        Search Results (${results.length})

        </h3>

    `;


    results.slice(0,100).forEach(v => {


        verseContent.innerHTML += `

        <div class="search-result">

            <div class="search-reference">

            ${v.book_name} ${v.chapter}:${v.verse}

            </div>

            <div>

            ${v.text}

            </div>

        </div>

        `;


    });

}



function showVerseMenu(element){

    selectedVerse = element;


    document
    .getElementById("verseMenu")
    .style.display = "flex";

}



function toggleHighlight(){

    if(!selectedVerse){
        return;
    }


    selectedVerse.classList.toggle("highlight");


    const highlights = JSON.parse(
        localStorage.getItem("arkstudy_highlights") || "[]"
    );


    const id = selectedVerse.dataset.id;


    if(selectedVerse.classList.contains("highlight")){


        if(!highlights.includes(id)){

            highlights.push(id);

        }


    } else {


        const index = highlights.indexOf(id);


        if(index > -1){

            highlights.splice(index,1);

        }

    }


    localStorage.setItem(
        "arkstudy_highlights",
        JSON.stringify(highlights)
    );


    hideVerseMenu();

}



function hideVerseMenu(){

    document
    .getElementById("verseMenu")
    .style.display = "none";

}



function copyVerse(){

    if(!selectedVerse){
        return;
    }


    navigator.clipboard.writeText(
        selectedVerse.innerText
    );


    hideVerseMenu();

}



function openNoteBox(){

    if(!selectedVerse){
        return;
    }


    const notes = JSON.parse(
        localStorage.getItem("arkstudy_notes") || "{}"
    );


    document.getElementById("noteInput").value =
        notes[selectedVerse.dataset.id] || "";


    document.getElementById("noteBox").style.display = "block";

}



function saveNote(){

    if(!selectedVerse){
        return;
    }


    const notes = JSON.parse(
        localStorage.getItem("arkstudy_notes") || "{}"
    );


    notes[selectedVerse.dataset.id] =
        document.getElementById("noteInput").value;


    localStorage.setItem(
        "arkstudy_notes",
        JSON.stringify(notes)
    );


    document.getElementById("noteBox").style.display = "none";

}
function formatReference(id){

    const parts = id.split("_");

    return `${parts[0]} ${parts[1]}:${parts[2]}`;

}

function formatReference(id){

    const parts = id.split("_");

    return `${parts[0]} ${parts[1]}:${parts[2]}`;

}



function openStudy(){

    document.querySelector(".layout").style.display = "none";

    document.getElementById("studyPanel").style.display = "block";


    loadStudyData();

}
function backToBible(){

    document.querySelector(".layout").style.display = "flex";

    document.getElementById("studyPanel").style.display = "none";

}

function openSavedVerse(id){

    const parts = id.split("_");


    const book = parts[0];

    const chapter = Number(parts[1]);


    document.querySelector(".layout").style.display = "flex";

    document.getElementById("studyPanel").style.display = "none";


    openBook(book);


    setTimeout(() => {

        openChapter(book, chapter);

    },100);


}

function loadStudyData(){

    const highlightList =
        document.getElementById("highlightList");


    const noteList =
        document.getElementById("noteList");


    const highlights = JSON.parse(
        localStorage.getItem("arkstudy_highlights") || "[]"
    );


    const notes = JSON.parse(
        localStorage.getItem("arkstudy_notes") || "{}"
    );


    highlightList.innerHTML = "";


highlights.forEach(id => {

    highlightList.innerHTML += `

    <div 
        class="study-item"
        onclick="openSavedVerse('${id}')"
    >

        🖍 ${formatReference(id)}

    </div>

    `;

});



    noteList.innerHTML = "";


    Object.entries(notes).forEach(([id,note]) => {


        noteList.innerHTML += `

        <div class="study-item">

            <div class="study-reference">

                ${formatReference(id)}

            </div>


            ${note}

        </div>

        `;


    });

}
loadBible();


document
.getElementById("searchButton")
.onclick = searchBible;


document
.getElementById("studyButton")
.onclick = openStudy;

document
.getElementById("backBibleButton")
.onclick = backToBible;
