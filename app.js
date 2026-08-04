async function loadBible(){

    const response = await fetch("bible.json");

    const bible = await response.json();

    console.log("FIRST VERSE:");
    console.log(bible.verses[0]);

}

loadBible();
