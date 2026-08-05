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

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


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

const notes = JSON.parse(
    localStorage.getItem("arkstudy_notes") || "{}"
);


    verses.forEach(v => {


        const verseID = `${book}_${chapter}_${v.verse}`;


        const isHighlighted = highlights.includes(verseID);
const verseNote = notes[verseID] || "";

verseContent.innerHTML += `

<div class="verse ${isHighlighted ? "highlight" : ""}"
data-id="${verseID}"
onclick="showVerseMenu(this)">

    <span class="verse-number">
    ${v.verse}
    </span>

    ${v.text}


    ${
        verseNote
        ?
        `<div class="verse-note">
            📝 ${verseNote}
        </div>`
        :
        ""
    }


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

    console.log("SHOW MENU RUNNING");

    selectedVerse = element;

    const menu = document.getElementById("verseMenu");

    console.log("Menu found:", menu);

    menu.style.display = "flex";

    console.log("Menu display:", menu.style.display);

}



function toggleHighlight(){

    console.log("Highlight button clicked");

    if(!selectedVerse){
        console.log("No verse selected");
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


    const parts = selectedVerse.dataset.id.split("_");

    const book = parts[0];
    const chapter = Number(parts[1]);


    openChapter(book, chapter);


    if(document.getElementById("studyPanel").style.display === "block"){

        loadStudyData();

    }

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
const verse = Number(parts[2]);


    document.querySelector(".layout").style.display = "flex";

    document.getElementById("studyPanel").style.display = "none";


    openBook(book);


    setTimeout(() => {

        openChapter(book, chapter);


setTimeout(()=>{

    const target =
    document.querySelector(`[data-id="${id}"]`);


    if(target){

        target.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

        target.style.outline =
        "3px solid #b8863b";

        setTimeout(()=>{

            target.style.outline="";

        },2000);

    }


},300);

    },100);


}

function loadStudyData(){

    const studyList = document.getElementById("studyList");

    if(!studyList){
        console.log("studyList missing");
        return;
    }


    const highlights = JSON.parse(
        localStorage.getItem("arkstudy_highlights") || "[]"
    );


    const notes = JSON.parse(
        localStorage.getItem("arkstudy_notes") || "{}"
    );


    console.log("Highlights:", highlights);
    console.log("Notes:", notes);


    studyList.innerHTML = "";


    const grouped = {};


    const allVerses = [
        ...new Set([
            ...highlights,
            ...Object.keys(notes)
        ])
    ];


    console.log("Combined verses:", allVerses);



    allVerses.forEach(id => {

        const parts = id.split("_");


        if(parts.length !== 3){
            console.log("Bad ID:", id);
            return;
        }


        const book = parts[0];
        const chapter = Number(parts[1]);
        const verse = Number(parts[2]);


        if(!grouped[book]){
            grouped[book] = [];
        }


        grouped[book].push({

            id,
            chapter,
            verse,

            highlighted:
                highlights.includes(id),

            note:
                notes[id] || null

        });

    });



    Object.keys(grouped)

    .sort((a,b)=>a.localeCompare(b))

    .forEach(book=>{


        const card = document.createElement("div");

        card.className = "study-book-card";


        card.innerHTML = `

            <h3>
                📖 ${book}
            </h3>

        `;



        grouped[book]

        .sort((a,b)=>{

            return (
                a.chapter - b.chapter ||
                a.verse - b.verse
            );

        })


        .forEach(item=>{


            const entry = document.createElement("div");


            entry.className = "study-item";


            entry.onclick = () => {
                openSavedVerse(item.id);
            };



            entry.innerHTML = `

                <div class="study-reference">

                    ${formatReference(item.id)}

                </div>


                ${item.highlighted ? 
                    "<div>🖍 Highlighted</div>" 
                    : ""}



                ${item.note ? 

                    `<div class="study-note">
                        📝 ${item.note}
                    </div>`

                    : ""}


            `;


            card.appendChild(entry);


        });



        studyList.appendChild(card);


    });


}

loadBible();


document
.getElementById("searchButton")
.onclick = searchBible;


document
.getElementById("studyButton")
.onclick = openStudy;


const backButton = document.getElementById("backBibleButton");

if(backButton){

    backButton.onclick = backToBible;

}
