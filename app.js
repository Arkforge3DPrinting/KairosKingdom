async function loadBible(){

    const response = await fetch("bible.json");

    const bible = await response.json();

    const verses = bible.verses;

    const books = [...new Set(
        verses.map(verse => verse.book_name)
    )];

    console.log("Books found:");
    console.log(books);

    const bookGrid = document.getElementById("bookGrid");

    books.forEach(book => {

        const card = document.createElement("div");

        card.className = "book";

        card.textContent = book;

        bookGrid.appendChild(card);

    });

}

loadBible();
