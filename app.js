async function loadBible() {
    const status = document.getElementById("status");

    try {
        const response = await fetch("bible.json");

        if (!response.ok) {
            throw new Error("Couldn't load bible.json");
        }

        const bible = await response.json();

        console.log(bible);

        status.textContent = "Bible loaded successfully.";
    } catch (error) {
        console.error(error);
        status.textContent = error.message;
    }
}

loadBible();
