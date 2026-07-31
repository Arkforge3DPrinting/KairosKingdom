// Kairos Kingdom App

console.log("Kairos Kingdom loaded");


// Verse of the Day rotation

const verses = [
    {
        text: "Trust in the Lord with all your heart and lean not on your own understanding.",
        reference: "Proverbs 3:5"
    },
    {
        text: "Your word is a lamp for my feet, a light on my path.",
        reference: "Psalm 119:105"
    },
    {
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        reference: "Matthew 11:28"
    },
    {
        text: "I can do all things through Christ who strengthens me.",
        reference: "Philippians 4:13"
    }
];


let verseIndex = 0;


const verseText = document.querySelector(".verse blockquote");
const verseReference = document.querySelector(".verse p");


function changeVerse(){

    verseIndex++;

    if(verseIndex >= verses.length){
        verseIndex = 0;
    }


    verseText.style.opacity = 0;
    verseReference.style.opacity = 0;


    setTimeout(()=>{

        verseText.innerHTML = `"${verses[verseIndex].text}"`;
        verseReference.innerHTML = verses[verseIndex].reference;

        verseText.style.opacity = 1;
        verseReference.style.opacity = 1;

    },400);

}


setInterval(changeVerse,8000);



// Bible Search button

const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");


searchButton.addEventListener("click",()=>{

    let search = searchInput.value.trim();


    if(search === ""){
        alert("Please enter a Bible topic or verse.");
        return;
    }


    alert(
        "Searching Scripture for: " + search
    );

});
