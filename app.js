async function loadBible(){

    const response = await fetch("bible.json");

    const bible = await response.json();

    console.log("Metadata:");
    console.log(bible.metadata);

    console.log("First verse:");
    console.log(bible.verses[0]);

}

loadBible();
