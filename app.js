let bibleVerses = [];


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

document.getElementById("verseContent").innerHTML =
    "Select a chapter to begin.";


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

    verseContent.scrollTop = 0;

    verseContent.innerHTML = `

        <h3 class="chapter-title">

        ${book} ${chapter}

        </h3>

    `;


    verses.forEach(v => {


     const savedHighlights = JSON.parse(
    localStorage.getItem("arkstudy_highlights") || "[]"
);


const verseText = `${v.verse} ${v.text}`;


const isHighlighted = savedHighlights.includes(verseText);


verseContent.innerHTML += `

<div class="verse ${isHighlighted ? "highlight" : ""}"
onclick="highlightVerse(this)">

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

        v.text

        .toLowerCase()

        .includes(query)

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

function highlightVerse(element){

    element.classList.toggle("highlight");


    const highlights = JSON.parse(
        localStorage.getItem("arkstudy_highlights") || "[]"
    );


    const text = element.innerText;


    if(element.classList.contains("highlight")){


        if(!highlights.includes(text)){

            highlights.push(text);

        }


    }
    else{


        const index = highlights.indexOf(text);


        if(index > -1){

            highlights.splice(index,1);

        }

    }


    localStorage.setItem(
        "arkstudy_highlights",
        JSON.stringify(highlights)
    );

}

loadBible();



document

    .getElementById("searchButton")

    .onclick = searchBible;
