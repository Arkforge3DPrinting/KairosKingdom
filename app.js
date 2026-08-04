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

        button.textContent = chapter;


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


    verses.forEach(v => {


        verseContent.innerHTML += `

        <div class="verse">

            <span class="verse-number">

            ${v.verse}

            </span>

            ${v.text}

        </div>

        `;


    });


}



loadBible();
