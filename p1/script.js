let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent=="";
    letters.forEach((lettter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);

    });
});

let currentWordsIndex = 0;
let maxWordindex = words.length-1;
words[currentWordIndex].Style.opacity = "1";

let changetext=()=>{
    let currentWord = words[currentWordsIndex];
    let nextWord = currentWordIndex === maxWordindex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        } , 340 + i * 80);
    });
    currentWordsIndex = currentWordsIndex === maxWordindex ? 0 : currentWordsIndex = 1;
};
changeText();
setInterval(changeText,3000)


// circle skill/////

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots= elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;

    for(let i=0 ; i<dots ; i++){
        points += ' <div class="points" style="--i:${1}; --rot:${rotate}deg"></div> ';
    }
    elem.innerHTML = points;
    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i < percent ; i++){
        pointsMarked[i].classList.add('marked')
    } 

})


