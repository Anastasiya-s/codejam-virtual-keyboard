export const handleSpecialKeys = (keyCode, keyboard, textArea) => {
  switch (keyCode) {
    case 'ContextMenu':
      keyboard.changeLanguage();
      break;
    case 'Space':
      textArea.insertAdjacentHTML('beforeend', ' ');
      break;
    case 'Enter':
      textArea.insertAdjacentText('beforeend', '\n');
      break;
    case 'ControlRight':
    case 'ControlLeft':
      keyboard.isCtrlPressed = true;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      keyboard.isShiftPressed = true;
      break
    default:
      break;
  }
  if (keyboard.isCtrlPressed && keyboard.isShiftPressed) {
    keyboard.changeLanguage();
    keyboard.isCtrlPressed = false;
    keyboard.isShiftPressed = false;
  }
};
  
export const addSymbol = (keyCode, keyboard, textArea) => {
  const keyboardRow = keyboard.keyboardSet.filter((item) => Object.prototype.hasOwnProperty.call(item, `${keyCode}`));
  const symbol = keyboardRow[0][keyCode] || '';
  textArea.innerHTML('beforeend', symbol);
}

export const createKeyboardContainer = () => {
  const container = document.querySelector('.container');
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard_container');
  container.append(keyboardContainer);
}

export const createContainer = () => {
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.classList.add('container');
  body.prepend(container);
};

export const createTextArea = () => {
  const textAreaContainer = document.querySelector('.container');
  const textArea = document.createElement('textarea');
  textArea.placeholder = 'Write something here... \nChange language by pressing Menu button or Shift + Ctrl';
  textArea.classList.add('textarea');
  textAreaContainer.append(textArea);
};

export const appInit = (keyboard) => {
  createContainer();
  createTextArea();
  keyboard.init();
};  



