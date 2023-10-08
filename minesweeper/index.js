document.body.classList.add('body');
let startGame = false;
const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);
const header = document.createElement('header');
header.classList.add('header');
container.appendChild(header);
const levelBox = document.createElement('div');
levelBox.classList.add('level-box');
header.appendChild(levelBox);
const easyBtn = document.createElement('input');
easyBtn.classList.add('button-level');
easyBtn.setAttribute('type', 'radio');
easyBtn.setAttribute('name', 'level');
easyBtn.setAttribute('value', '10');
easyBtn.setAttribute('id', '10');
easyBtn.checked = true;
levelBox.appendChild(easyBtn);
const easyLabel = document.createElement('label');
easyLabel.innerHTML = 'Easy';
easyLabel.classList.add('level-text');
easyLabel.htmlFor = '10';
levelBox.appendChild(easyLabel);
const normalBtn = document.createElement('input');
normalBtn.classList.add('button-level');
normalBtn.setAttribute('type', 'radio');
normalBtn.setAttribute('name', 'level');
normalBtn.setAttribute('value', '15');
normalBtn.setAttribute('id', '40');
levelBox.appendChild(normalBtn);
const normalLabel = document.createElement('label');
normalLabel.innerHTML = 'Normal';
normalLabel.classList.add('level-text');
normalLabel.htmlFor = '40';
levelBox.appendChild(normalLabel);
const hardBtn = document.createElement('input');
hardBtn.classList.add('button-level');
hardBtn.setAttribute('type', 'radio');
hardBtn.setAttribute('name', 'level');
hardBtn.setAttribute('value', '25');
hardBtn.setAttribute('id', '99');
levelBox.appendChild(hardBtn);
const hardLabel = document.createElement('label');
hardLabel.innerHTML = 'Hard';
hardLabel.classList.add('level-text');
hardLabel.htmlFor = '99';
levelBox.appendChild(hardLabel);
const audioButton = document.createElement('div');
audioButton.classList.add('audio-button');
header.appendChild(audioButton);
const gameScore = document.createElement('button');
gameScore.classList.add('score-button');
header.appendChild(gameScore);
const resetButton = document.createElement('button');
resetButton.classList.add('reset-button');
header.appendChild(resetButton);
const gameBoard = document.createElement('div');
let levelButtons = document.querySelectorAll('.button-level');
gameBoard.classList.add('game-board');
container.appendChild(gameBoard);
const footer = document.createElement('footer');
footer.classList.add('footer');
container.appendChild(footer);
const remMines = document.createElement('div');
remMines.classList.add('rem-mines');
remMines.innerHTML = 'Mines:';
footer.appendChild(remMines);
const minesRem = document.createElement('span');
minesRem.innerHTML = '--';
remMines.appendChild(minesRem);
const clickCountName = document.createElement('div');
clickCountName.classList.add('click');
clickCountName.innerHTML = 'Click:';
footer.appendChild(clickCountName);
const clickCount = document.createElement('span');
clickCount.innerHTML = '--';
clickCountName.appendChild(clickCount);
const remFlags = document.createElement('div');
remFlags.classList.add('rem-flags');
remFlags.innerHTML = 'Flags:';
footer.appendChild(remFlags);
const flagsRem = document.createElement('span');
flagsRem.innerHTML = '--';
remFlags.appendChild(flagsRem);
const timer = document.createElement('div');
timer.classList.add('timer');
timer.innerHTML = 'Time:';
footer.appendChild(timer);
const timeCount = document.createElement('span');
timeCount.innerHTML = '--:--';
timer.appendChild(timeCount);
const gameOver = document.createElement('div');
gameOver.classList.add('game-over');
gameOver.classList.add('hidden');
gameOver.innerHTML = 'Game Over. Try again.';
container.appendChild(gameOver);
const gameOverSmile = document.createElement('span');
gameOverSmile.classList.add('go-smile');
gameOver.appendChild(gameOverSmile);
const gameWin = document.createElement('div');
gameWin.classList.add('game-win');
gameWin.classList.add('hidden');
container.appendChild(gameWin);
const gameWinSmile = document.createElement('span');
gameWinSmile.classList.add('gw-smile');
const gameResult = document.createElement('ol');
gameResult.classList.add('result');
gameBoard.appendChild(gameResult);
const switchColor = document.createElement('div');
switchColor.classList.add('switch-color');
footer.appendChild(switchColor);
const switchNice = document.createElement('span');
switchNice.classList.add('switch-nice');
switchNice.classList.add('selected');
switchNice.innerHTML = 'Nice';
switchColor.appendChild(switchNice);
const switchButton = document.createElement('div');
switchButton.classList.add('switch-button');
switchColor.appendChild(switchButton);
const switchDay = document.createElement('span');
switchDay.classList.add('switch-day');
switchDay.innerHTML = 'Day';
switchColor.appendChild(switchDay);

let activeCell;
let boardSize = 10;
let cellSize;
let quantityMines = 10;
let quantityCells;
const cellsElement = [];
let board;
let cells;
let mines = [];
let flags = [];
let flagsCount = 0;
let time = 0;
let timerId;
let min;
let sec;
let quantityClicks = 0;
let resultArr = [];
let result = {};
let cellsArr = [];
const clickAudio = new Audio('./assets/audio/click.wav');
const flagAudio = new Audio('./assets/audio/flag.mp3');
const restartAudio = new Audio('./assets/audio/restart.mp3');
const levelAudio = new Audio('./assets/audio/level.wav');
const gameOverAudio = new Audio('./assets/audio/game-over.mp3');
const winAudio = new Audio('./assets/audio/win.wav');
const menuAudio = new Audio('./assets/audio/menu.mp3');

function sizingBoard() {
  console.log(window.innerWidth)
  if (window.innerWidth <= 768) {

    cellSize = 20;
    quantityCells = boardSize ** 2;
    gameBoard.style.width = `${(boardSize * cellSize)}px`;
    header.style.width = gameBoard.style.width;
    container.style.width = gameBoard.style.width;
  }
  if (window.innerWidth > 768) {
    cellSize = 30;
    quantityCells = boardSize ** 2;
    gameBoard.style.width = `${(boardSize * cellSize) + 6}px`;
    header.style.width = gameBoard.style.width;
    container.style.width = gameBoard.style.width;
  }
}


function createBoard() {
  sizingBoard()

  board = [];
  for (let x = 0; x < boardSize; x += 1) {
    const row = [];
    for (let y = 0; y < boardSize; y += 1) {
      const cell = {
        adress: document.createElement('div'),
        x,
        y,
      };
      row.push(cell);
    }
    board.push(row);
  }

  board.forEach((row) => {
    row.forEach((cell) => {
      cell.adress.classList.add('cell');
      if (switchDay.classList.contains('selected')) {
        cell.adress.classList.add('day-cell');
      }
      cell.adress.setAttribute('id', `${cell.x},${cell.y}`);
      gameBoard.appendChild(cell.adress);
    });
  });
  cells = document.querySelectorAll('.cell');
  cellsElement.length = 0;
  board.forEach((element) => {
    cellsElement.push(...element);
  });
  return board;
}
  createBoard()
function clearCell() {
  cells.forEach((cell) => {
    cell.remove();
  });
}
function clearMines() {
  mines.forEach((mine) => {
    delete mine.dataset.flag;
  });
  cells.forEach((cell) => {
    delete cell.dataset.x;
  });
  mines = [];
  flags = [];
  flagsCount = 0;
  console.log(flags);
}
levelButtons.forEach((button) => {
  button.addEventListener('click', setLevel);
});

function setLevel() {
  if (!audioButton.classList.contains('audio-off')) {
    levelAudio.play();
  }

  boardSize = this.value;
  quantityMines = Number(this.id);
  startGame = false;
  clearCell();
  createBoard();
  clearMines();
  minesRem.innerHTML = '--';
  flagsRem.innerHTML = '--';
  timeCount.innerHTML = '--:--';
  clickCount.innerHTML = '--';
  gameBoard.addEventListener('mouseup', openCell);
  if (!gameOver.classList.contains('hidden')) {
    gameOver.classList.add('hidden');
  }
  if (!gameWin.classList.contains('hidden')) {
    gameWin.classList.add('hidden');
  }
}

function random(size) {
  return Math.floor(Math.random() * size);
}

function setMines(cells) {
  let count = 0;
  while (count !== quantityMines) {
    const x = random(boardSize);
    const y = random(boardSize);
    cells.forEach((cell) => {
      if (cell.id === `${x},${y}`) {
        if (cell.dataset.flag !== 'mine') {
          cell.dataset.flag = 'mine';
          count++;
          mines.push(cell);
        }
      }
    });
  }
  mines.forEach((mine) => {
    flags.push('X');
  });
  console.log(mines);
}

function purposeNumber() {
  cells.forEach((cell, i) => {
    if (cell.dataset.flag !== 'mine') {
      const a = cellsElement[i].x;
      const b = cellsElement[i].y;
      const arraySibling = [document.getElementById(`${a - 1},${b - 1}`),
      document.getElementById(`${a - 1},${b}`),
      document.getElementById(`${a - 1},${b + 1}`),
      document.getElementById(`${a},${b - 1}`),
      document.getElementById(`${a},${b + 1}`),
      document.getElementById(`${a + 1},${b - 1}`),
      document.getElementById(`${a + 1},${b}`),
      document.getElementById(`${a + 1},${b + 1}`),
      ];

      let count = 0;
      arraySibling.forEach((el) => {
        if (el !== null) {
          if (el.dataset.flag === 'mine') {
            count++;
          }
        }
      });
      cell.dataset.flag = count;
    }
  });
}

function blockLevel(check) {
  levelButtons.forEach((button) => {
    if (button !== check) {
      button.disabled = true;
    }
  });
}
function unblockLevel(check) {
  levelButtons.forEach((button) => {
    if (button !== check) {
      button.disabled = false;
    }
  });
}
function minutes() {
  if (time < 60) {
    min = '00';
  } else if (min < 10) {
    min = `0${Math.floor(time / 60)}`;
  } else {
    min = Math.floor(time / 60);
  }
  return min;
}
function seconds() {
  if (time < 60) {
    if (time < 10) {
      sec = `0${time}`;
    } else {
      sec = time;
    }
  } else {
    sec = time % 60;
    if (sec < 10) {
      sec = `0${sec}`;
    }
  }

  return sec;
}
function addResult() {
  resultArr.forEach((data) => {
    const resultValue = document.createElement('li');
    resultValue.classList.add('result-value');
    resultValue.innerHTML = `${data.name}, ${data.time}, ${data.clicks} clicks`;
    gameResult.appendChild(resultValue);
  });
}
function clearResult() {
  const resVal = document.querySelectorAll('.result-value');
  resVal.forEach((res) => {
    res.remove();
  });
}
function startTimer() {
  time = 0;
  timerId = setInterval(() => {
    time++;
    minutes();
    seconds();
    timeCount.innerHTML = `${min}:${sec}`;
  }, 1000);
}

gameBoard.addEventListener('mousedown', (event) => {
  if (!startGame) {
    startTimer();
    setMines(cells);
    purposeNumber();
    quantityClicks = 0;
    startGame = true;
    console.log(startGame);
    if (event.target.dataset.flag === 'mine') {
      clearMines();
      setMines(cells);
      purposeNumber();
    }
  }
  activeCell = event.target;
});

gameBoard.addEventListener('mouseup', openCell);
gameBoard.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

function setFlag(event) {
  if (!event.target.classList.contains('open')) {
    if (event.target.classList.contains('flag')) {
      event.target.classList.remove('flag');
      delete event.target.dataset.x;
      flags.push('X');
      flagsCount--;
      console.log(flags);
    } else if (flags.length > 0) {
      event.target.classList.add('flag');
      event.target.dataset.x = 'flag';
      flags.pop('X');
      flagsCount++;
      console.log(flags);
    }
  }
}

function openCell(event) {
  if (!event.target.classList.contains('open')) {
    quantityClicks++;
  }
  if (event.target.classList.contains('cell')) {
    if (event.target === activeCell) {
      let x;
      let y;
      if (event.which === 1) {
        if (!audioButton.classList.contains('audio-off')) {
          clickAudio.play();
        }
        switch (true) {
          case event.target.dataset.flag === '0' && event.target.dataset.x !== 'flag':
            event.target.classList.add('open');
            cellsElement.forEach((element) => {
              if (element.adress === event.target) {
                x = element.x;
                y = element.y;
              }
            });
            openSibling(x, y);
            levelButtons.forEach((button) => {
              button.removeEventListener('click', setLevel);
              blockLevel(button);
            });
            break;

          case event.target.dataset.flag !== '0' && event.target.dataset.x !== 'flag' && event.target.dataset.flag !== 'mine':
            event.target.classList.add('open');
            event.target.innerHTML = event.target.dataset.flag;
            switch (event.target.dataset.flag) {
              case '1':
                event.target.style.color = '#008000';
                break;
              case '2':
                event.target.style.color = '#0000EE';
                break;
              case '3':
                event.target.style.color = '#FF6347';
                break;
              case '4':
                event.target.style.color = '#FF0000';
                break;
              case '5':
                event.target.style.color = '#8B0000';
                break;
              default:
                break;
            }
            levelButtons.forEach((button) => {
              button.removeEventListener('click', setLevel);
              blockLevel(button);
            });
            break;

          case event.target.dataset.flag === 'mine' && event.target.dataset.x !== 'flag':

            if (!audioButton.classList.contains('audio-off')) {
              gameOverAudio.play();
            }
            gameOver.classList.remove('hidden');
            mines.forEach((mine) => {
              if (mine.classList.contains('flag')) {
                mine.classList.remove('flag');
              }
              mine.classList.add('boom');
            });
            if (sec === undefined) {
              min = '00';
              sec = '00';
            }
            result = {};
            result.name = 'Loser';
            result.time = `${min}min ${sec}sec`;
            result.clicks = quantityClicks;
            if (resultArr.length < 10) {
              resultArr.push(result);
            } else {
              resultArr.shift();
              resultArr.push(result);
            }
            clearResult();
            addResult();
            gameBoard.removeEventListener('mouseup', openCell);
            levelButtons.forEach((button) => {
              button.addEventListener('click', setLevel);
              unblockLevel(button);
            });
            clearInterval(timerId);

            console.log(resultArr);
            console.log(startGame);
            console.log(min);
            console.log(sec);
            break;

          default:
            break;
        }
        resultWin();
      }

      if (event.which === 3) {
        if (!audioButton.classList.contains('audio-off')) {
          flagAudio.play();
        }
        setFlag(event);
        levelButtons.forEach((button) => {
          button.removeEventListener('click', setLevel);
          blockLevel(button);
        });
        console.log(flags.length);
        console.log(flagsCount);
      }
    }
  }

  minesRem.innerHTML = flags.length;
  flagsRem.innerHTML = flagsCount;
  clickCount.innerHTML = quantityClicks;
}

function openSibling(x, y) {
  const a = x;
  const b = y;
  const arraySibling = [document.getElementById(`${a - 1},${b - 1}`),
  document.getElementById(`${a - 1},${b}`),
  document.getElementById(`${a - 1},${b + 1}`),
  document.getElementById(`${a},${b - 1}`),
  document.getElementById(`${a},${b + 1}`),
  document.getElementById(`${a + 1},${b - 1}`),
  document.getElementById(`${a + 1},${b}`),
  document.getElementById(`${a + 1},${b + 1}`),
  ];
  arraySibling.forEach((sibling) => {
    if (sibling !== null && !sibling.classList.contains('open') && !sibling.classList.contains('flag')) {
      if (sibling.dataset.flag !== '0') {
        sibling.classList.add('open');
        sibling.innerHTML = sibling.dataset.flag;
        switch (sibling.dataset.flag) {
          case '1':
            sibling.style.color = '	#008000';
            break;
          case '2':
            sibling.style.color = '#0000EE';
            break;
          case '3':
            sibling.style.color = '	#FF6347';
            break;
          case '4':
            sibling.style.color = '	#FF0000';
            break;
          case '5':
            sibling.style.color = '#8B0000';
            break;
          default:
            break;
        }
      }
      if (sibling.dataset.flag === '0') {
        sibling.classList.add('open');
        cellsElement.forEach((element) => {
          if (element.adress === sibling) {
            x = element.x;
            y = element.y;
          }
        });
        openSibling(x, y);
      }
    }
  });
}
resetButton.addEventListener('click', () => {
  if (!audioButton.classList.contains('audio-off')) {
    restartAudio.play();
  }

  if (!gameOver.classList.contains('hidden')) {
    gameOver.classList.add('hidden');
  }
  if (!gameWin.classList.contains('hidden')) {
    gameWin.classList.add('hidden');
  }
  startGame = false;
  clearMines();
  clearCell();
  createBoard(quantityCells);
  gameBoard.addEventListener('mouseup', openCell);

  levelButtons.forEach((button) => {
    button.addEventListener('click', setLevel);
    unblockLevel(button);
  });
  minesRem.innerHTML = '--';
  flagsRem.innerHTML = '--';
  clearInterval(timerId);
  timeCount.innerHTML = '--:--';
  clickCount.innerHTML = '--';
  console.log(min);
  console.log(sec);
});

function resultWin() {
  const openCell = document.querySelectorAll('.open');
  if (openCell.length === cells.length - mines.length) {
    levelButtons.forEach((button) => {
      button.addEventListener('click', setLevel);
      unblockLevel(button);
    });
    gameWin.innerHTML = `Hooray! You found all mines in ${min} min ${sec} sec and ${quantityClicks} moves!`;
    gameWin.appendChild(gameWinSmile);
    gameWin.classList.remove('hidden');
    gameBoard.removeEventListener('mouseup', openCell);
    clearInterval(timerId);
    if (!audioButton.classList.contains('audio-off')) {
      winAudio.play();
    }

    if (sec === undefined) {
      min = '00';
      sec = '00';
    }
    result = {};
    result.name = 'Winner!';
    result.time = `${min}min ${sec}sec`;
    result.clicks = quantityClicks;
    if (resultArr.length < 10) {
      resultArr.push(result);
    } else {
      resultArr.shift();
      resultArr.push(result);
    }
    clearResult();
    addResult();
  }
}

gameScore.addEventListener('click', () => {
  if (!audioButton.classList.contains('audio-off')) {
    menuAudio.play();
  }

  if (gameResult.classList.contains('opened')) {
    gameResult.classList.remove('opened');
    gameResult.classList.add('closed');
    gameBoard.addEventListener('mouseup', openCell);

  } else {
    gameResult.classList.remove('closed');
    gameResult.classList.add('opened');
    gameBoard.removeEventListener('mouseup', openCell);
  }
});
audioButton.addEventListener('click', () => {
  if (switchDay.classList.contains('selected')) {
    audioButton.classList.toggle('day-mute');
  } else {
    audioButton.classList.toggle('mute');
  }
  audioButton.classList.toggle('audio-off');
});

function switchTheme() {
  if (switchButton.classList.contains('switch-on')) {
    switchNice.classList.remove('selected');
    switchDay.classList.add('selected');
  } else {
    switchButton.classList.remove('switch-on');
    switchDay.classList.remove('selected');
    switchNice.classList.add('selected');
  }
  if (switchDay.classList.contains('selected')) {
    container.classList.add('day-theme');
    gameWin.classList.add('day-theme');
    gameOver.classList.add('day-theme');
    gameBoard.classList.add('day-board');
    console.log(cells)
    cells.forEach((cell) => {
      cell.classList.add('day-cell');
    });
    gameResult.classList.add('day-menu');
    switchButton.classList.add('day-switch');
    const levelCheck = document.querySelectorAll('.level-text');
    levelCheck.forEach((button) => {
      button.classList.add('day-level');
      resetButton.classList.add('day-reset');
      audioButton.classList.add('day-volume');
      if (audioButton.classList.contains('mute')) {
        audioButton.classList.remove('mute');
        audioButton.classList.add('day-mute');
      }
      gameScore.classList.add('day-score');
    });
  }
  if (switchNice.classList.contains('selected')) {
    container.classList.remove('day-theme');
    gameWin.classList.remove('day-theme');
    gameOver.classList.remove('day-theme');
    gameBoard.classList.remove('day-board');

    cells.forEach((cell) => {
      cell.classList.remove('day-cell');
    });
    gameResult.classList.remove('day-menu');
    switchButton.classList.remove('day-switch');
    const levelCheck = document.querySelectorAll('.level-text');
    levelCheck.forEach((button) => {
      button.classList.remove('day-level');
      resetButton.classList.remove('day-reset');
      audioButton.classList.remove('day-volume');
    });
    if (audioButton.classList.contains('day-mute')) {
      audioButton.classList.add('mute');
      audioButton.classList.remove('day-mute');
    }
    gameScore.classList.remove('day-score');
  }

}

switchButton.addEventListener('click', () => {
  if (!switchButton.classList.contains('switch-on')) {
    switchButton.classList.add('switch-on');
    switchNice.classList.remove('selected');
    switchDay.classList.add('selected');
  } else {
    switchButton.classList.remove('switch-on');
    switchDay.classList.remove('selected');
    switchNice.classList.add('selected');
  }
  if (switchDay.classList.contains('selected')) {
    container.classList.add('day-theme');
    gameWin.classList.add('day-theme');
    gameOver.classList.add('day-theme');
    gameBoard.classList.add('day-board');
    cells.forEach((cell) => {
      cell.classList.add('day-cell');
    });
    gameResult.classList.add('day-menu');
    switchButton.classList.add('day-switch');
    const levelCheck = document.querySelectorAll('.level-text');
    levelCheck.forEach((button) => {
      button.classList.add('day-level');
      resetButton.classList.add('day-reset');
      audioButton.classList.add('day-volume');
      if (audioButton.classList.contains('mute')) {
        audioButton.classList.remove('mute');
        audioButton.classList.add('day-mute');
      }
      gameScore.classList.add('day-score');
    });
  }
  if (switchNice.classList.contains('selected')) {
    container.classList.remove('day-theme');
    gameWin.classList.remove('day-theme');
    gameOver.classList.remove('day-theme');
    gameBoard.classList.remove('day-board');
    cells.forEach((cell) => {
      cell.classList.remove('day-cell');
    });
    gameResult.classList.remove('day-menu');
    switchButton.classList.remove('day-switch');
    const levelCheck = document.querySelectorAll('.level-text');
    levelCheck.forEach((button) => {
      button.classList.remove('day-level');
      resetButton.classList.remove('day-reset');
      audioButton.classList.remove('day-volume');
    });
    if (audioButton.classList.contains('day-mute')) {
      audioButton.classList.add('mute');
      audioButton.classList.remove('day-mute');
    }
    gameScore.classList.remove('day-score');
  }


});



function setLocalStorageResult() {
  localStorage.setItem('.result-game', JSON.stringify(resultArr));
}

function cellsSet() {
  cellsArr = []
  for (let i = 0; i < cells.length; i++) {
    let cellEl = {}
    cellEl.flag = cells[i].dataset.flag
    cellEl.x = cells[i].dataset.x
    cellEl.position = cells[i].id
    cellEl.class = cells[i].classList
    cellEl.text = cells[i].innerHTML
    cellEl.style = cells[i].style.color
    cellsArr.push(cellEl)
  }

}

function getLocalStorageResult() {
  if (localStorage.getItem('.result-game')) {
    resultArr = JSON.parse(localStorage.getItem('.result-game'));
    addResult();
  }
}


function setLocalStorageAudio() {
  localStorage.setItem('.audio', audioButton.classList);
}
function getLocalStorageAudio() {
  if (localStorage.getItem('.audio')) {
    audioButton.classList = localStorage.getItem('.audio');
  }
}

function setLocalStorageTheme() {
  localStorage.setItem('.color-theme', switchButton.classList);
}
function getLocalStorageTheme() {
  if (localStorage.getItem('.color-theme')) {
    switchButton.classList = localStorage.getItem('.color-theme');
    switchTheme()
  }
}
window.addEventListener('beforeunload', setLocalStorageResult);
window.addEventListener('load', getLocalStorageResult);
window.addEventListener('beforeunload', setLocalStorageAudio);
window.addEventListener('load', getLocalStorageAudio);
window.addEventListener('beforeunload', setLocalStorageTheme);
window.addEventListener('load', getLocalStorageTheme);



window.addEventListener("resize", sizingBoard)



function setLocalStorageLevel() {
  cellsSet()
  
  localStorage.setItem('.easyBTN', easyBtn.checked)
  localStorage.setItem('.normalBTN', normalBtn.checked)
  localStorage.setItem('.hardBTN', hardBtn.checked)
  localStorage.setItem('.board-size', boardSize)
  localStorage.setItem('.cellQ', quantityCells)
  localStorage.setItem('.cellM', quantityMines)
}

function getLocalStorageLevel() {
boardSize = localStorage.getItem('.board-size')


    if (localStorage.getItem('.easyBTN') || localStorage.getItem('.normalBTN') || localStorage.getItem('.hardBTN')) {
      if (localStorage.getItem('.normalBTN') === 'true') {
        normalBtn.checked = true;
       
      }
      if (localStorage.getItem('.easyBTN') === 'true') {
        easyBtn.checked = true;
     
      }
      if (localStorage.getItem('.hardBTN') === 'true') {
        hardBtn.checked = true;
       
      }
    }
  }

 // window.addEventListener('beforeunload', setLocalStorageLevel);
//window.addEventListener('load', getLocalStorageLevel);