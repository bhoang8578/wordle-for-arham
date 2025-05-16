var height = 6; //number of guesses
var width = 5; //length of the word

//player's current guessing position
var row = 0;
var col = 0;

var gameOver = false;
var word = "LUCKY"; 

window.onload = function()
{
    initialize();
}

function initialize()
{
    //create the game board
    for (let r = 0; r < height; r++)
        {
            for (let c = 0; c < width; c++)
                {
                    let tile = document.createElement("span");
                    tile.id = r.toString() + "-" + c.toString();
                    tile.classList.add("tile");
                    tile.innerText = "";
                    document.getElementById("board").appendChild(tile);

                }
        }
        document.addEventListener("keyup", (e) =>
        {
            if (gameOver)
                return;
            if ("KeyA" <= e.code && e.code <= "KeyZ")
                {
                    if (col < width)
                        {
                            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                            if (currentTile.innerText == "")
                                {
                                    currentTile.innerText = e.code[3];
                                    col += 1;
                                }
                        }
                }
                else if (e.code == "Backspace")
                    {
                        if (0 < col && col <= width)
                            {
                                col -= 1;
                            }
                            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                            currentTile.innerText = "";
                    }
                else if (e.code == "Enter")
                    {
                        if (col == width)
                            {
                                //check the word, if valid word then update, else display error
                            update();
                            row += 1;
                            col = 0;
                            }
                    }
                    if (!gameOver && row == height)
                        {
                            gameOver = true;
                            document.getElementById("answer").innerText = word;
                            playMusic();
                            setTimeout(() => {
                                const element = document.getElementById('popup');
                                element.classList.remove('hidden');
                                element.classList.add('visible');
                                const background = document.getElementById('wordleBody');
                                background.classList.add('dim');
                                const title = document.getElementById('title');
                                title.classList.add('lighten');
                                const answer = document.getElementById('answer');
                                answer.classList.add('lighten');
                                starCursor();
                                //element.addEventListener("click", playMusic());
                            }, 1500);
                        }
                    
        })
}

function update()
{
    let correct = 0;
    let letterCount = {}; //map
    for (let i = 0; i < word.length; i++)
        {
            letter = word[i];
            if (letterCount[letter])
                {
                    letterCount[letter] += 1;
                }
            else
            {
                letterCount[letter] = 1;
            }
        }
    for (let c = 0; c < width; c++)
        {
            let currentTile = document.getElementById(row.toString() + "-" + c.toString());
            let letter = currentTile.innerText;
            if (word[c] == letter)
                {
                    currentTile.classList.add("correct");
                    correct += 1;
                    letterCount[letter] -= 1;
                }
            if (correct == width)
                {
                    gameOver = true;
                    playMusic();
                    setTimeout(() => {
                        const element = document.getElementById('popup');
                        element.classList.remove('hidden');
                        element.classList.add('visible');
                        const background = document.getElementById('wordleBody');
                        background.classList.add('dim');
                        const title = document.getElementById('title');
                        title.classList.add('lighten');
                        starCursor();
                        //element.addEventListener("click", playMusic);
                    }, 1300);
                }
        }
        for (let c = 0; c < width; c++)
            {
                let currentTile = document.getElementById(row.toString() + "-" + c.toString());
                let letter = currentTile.innerText;
                if (!currentTile.classList.contains("correct"))
                    {
                    if (word.includes(letter) && letterCount[letter] > 0)
                        {
                            currentTile.classList.add("present");
                            letterCount[letter] -= 1;
                        }
                    else
                        {
                            currentTile.classList.add("absent");
                        }
                    }
            }
}
function playMusic()
{
    let audio = new Audio("aMillionStars.mp3");
    audio.play();
}
function starCursor()
{
    document.addEventListener('mousemove', function(e)
{
    let body = document.getElementById('wordleBody');
    let star = document.createElement('span');
    star.classList.add('stars');
    let x = e.offsetX;
    let y = e.offsetY;
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    body.appendChild(star);

    let size = Math.random() * 30;
    star.style.width = 10 + size + 'px';
    star.style.height = 10 + size + 'px';

    let transformValue = Math.random() * 360;
    star.style.transform = 'rotate(' + transformValue + 'deg)';
    setTimeout (function()
    {
        star.remove();
    }, 1000)
})
}



