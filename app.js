async function loadBible(){

    const response = await fetch("bible.json");

    const bible = await response.json();

    const verses = bible.verses;


    const books = [...new Set(
        verses.map(v => v.book_name)
    )];


    const bookGrid = document.getElementById("bookGrid");


    books.forEach(book => {


        const card = document.createElement("div");

        card.className = "book";

        card.textContent = book;


        card.onclick = () => {

            openBook(book, verses);

        };


        bookGrid.appendChild(card);


    });

}



function openBook(book, verses){


    document.getElementById("bookTitle").textContent = book;


    const chapters = [...new Set(

        verses

        .filter(v => v.book_name === book)

        .map(v => v.chapter)

    )];


    const chapterList = document.getElementById("chapterList");

    chapterList.innerHTML = "";


    chapters.forEach(chapter => {


        const button = document.createElement("div");

        button.className = "chapter";

        button.textContent = "Chapter " + chapter;


        chapterList.appendChild(button);


    });


}



loadBible();
