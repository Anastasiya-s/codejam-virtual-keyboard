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
    default:
      break;
  }
};
  
export const addSymbol = (keyCode, keyboard, textArea) => {
  const keyboardRow = keyboard.keyboardSet.filter((item) => Object.prototype.hasOwnProperty.call(item, `${keyCode}`));
  const symbol = keyboardRow[0][keyCode] || '';
  textArea.insertAdjacentHTML('beforeend', symbol);
}

export const createKeyboardContainer = () => {
  const container = document.querySelector('.container');
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard_container');
  container.append(keyboardContainer);
}


