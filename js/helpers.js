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
    case 'AltRight':
    case 'AltLeft':
        if (event.shiftKey) {
          keyboard.changeLanguage()
        }
        break;
    case 'ShiftLeft':
    case 'ShiftRight':
      if (event.altKey) {
        keyboard.changeLanguage()
      }
      break;
    case 'CapsLock':
      keyboard.isCapsOn = !keyboard.isCapsOn;
    default:
      break;
  }
};
  
export const addSymbol = (keyCode, keyboard, textArea) => {
  const keyboardRow = keyboard.keyboardSet.filter((item) => Object.prototype.hasOwnProperty.call(item, `${keyCode}`));
  const symbol = keyboard.isCapsOn ? keyboardRow[0][keyCode].toUpperCase() || '' : keyboardRow[0][keyCode] || '';
  textArea.insertAdjacentText('beforeend', symbol);
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



