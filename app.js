// ================================
// Kairos Community
// app.js
// ================================

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', e => {

        e.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));

        if(target){

            target.scrollIntoView({

                behavior: 'smooth'

            });

        }

    });

});


// ======================================
// Fade in sections when scrolling
// ======================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{

    threshold:0.15

});

document.querySelectorAll("section").forEach(section=>{

    observer.observe(section);

});


// ======================================
// Verse Rotator
// ======================================

const verses=[

{
text:"Trust in the Lord with all your heart and lean not on your own understanding.",
ref:"Proverbs 3:5"
},

{
text:"Be strong and courageous. Do not be afraid.",
ref:"Joshua 1:9"
},

{
text:"Come to me, all who are weary and burdened, and I will give you rest.",
ref:"Matthew 11:28"
},

{
text:"Your word is a lamp to my feet and a light to my path.",
ref:"Psalm 119:105"
}

];

const quote=document.querySelector(".verse blockquote");

const reference=document.querySelector(".verse p");

let verseIndex=0;

function changeVerse(){

    verseIndex++;

    if(verseIndex>=verses.length){

        verseIndex=0;

    }

    quote.style.opacity=0;

    reference.style.opacity=0;

    setTimeout(()=>{

        quote.textContent=`"${verses[verseIndex].text}"`;

        reference.textContent=verses[verseIndex].ref;

        quote.style.opacity=1;

        reference.style.opacity=1;

    },400);

}

setInterval(changeVerse,8000);


// ======================================
// Search Button
// ======================================

const searchButton=document.querySelector(".search button");

const searchInput=document.querySelector(".search input");

searchButton.addEventListener("click",()=>{

    const value=searchInput.value.trim();

    if(value===""){

        alert("Enter a Bible topic or verse.");

        return;

    }

    alert("Bible search for: "+value);

});


// Enter key support

searchInput.addEventListener("keypress",e=>{

    if(e.key==="Enter"){

        searchButton.click();

    }

});


// ======================================
// Hero Background Parallax
// ======================================

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero");

    hero.style.backgroundPositionY=
        window.scrollY*0.4+"px";

});


// ======================================
// Dynamic Copyright
// ======================================

const footer=document.querySelector("footer p");

footer.innerHTML=`© ${new Date().getFullYear()} Kairos`;

console.log("Kairos Loaded");
