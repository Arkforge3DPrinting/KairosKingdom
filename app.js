async function loadBible(){

    const response = await fetch("bible.json");

    const bible = await response.json();

    console.log(bible);

}

loadBible();
