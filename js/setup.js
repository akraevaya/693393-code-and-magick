'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var DEFAULT_START = {
  top: '80px',
  left: '50%'
};


// Открытие/закрытие окна настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

// Похожие персонажи
var similarWizards = setup.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setup.style.top = DEFAULT_START.top;
  setup.style.left = DEFAULT_START.left;
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Похожие персонажи
similarWizards.classList.remove('hidden');

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * (arr.length - 1));
  return arr[randomIndex];
};

var createRandomWizard = function () {
  var randomWizard = {
    name: getRandomElement(WIZARD_NAMES) + '\n' + getRandomElement(WIZARD_SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
  return randomWizard;
};

var createWizardsArr = function () {
  var wizardsArr = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizardsArr.push(createRandomWizard());
  }
  return wizardsArr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilarWizards = function () {
  var similarList = similarWizards.querySelector('.setup-similar-list');
  var wizards = createWizardsArr();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
};

renderSimilarWizards();

// Валидация
var inputValidation = function (target) {
  var errMsg = '';

  if (target.validity.tooShort) {
    errMsg = 'Имя должно состоять минимум из двух символов';
  } else if (target.validity.tooLong) {
    errMsg = 'Имя не должно быть длиннее 25 символов';
  } else if (target.validity.valueMissing) {
    errMsg = 'Обязательное для заполнения поле';
  }

  target.setCustomValidity(errMsg);
};

// Изменение цветовых параметров
var changeColor = function (target, color, name) {
  setup.querySelector('input[name="' + name + '"').value = color;
  if (name === 'fireball-color') {
    target.style.backgroundColor = color;
  } else {
    target.style.fill = color;
  }
};

// Обработчики параметров персонажа
setup.querySelector('.setup-wizard .wizard-coat').addEventListener('click', function (evt) {
  changeColor(evt.target, getRandomElement(COAT_COLORS), 'coat-color');
});

setup.querySelector('.setup-wizard .wizard-eyes').addEventListener('click', function (evt) {
  changeColor(evt.target, getRandomElement(EYES_COLORS), 'eyes-color');
});

setup.querySelector('.setup-fireball-wrap').addEventListener('click', function (evt) {
  changeColor(evt.target, getRandomElement(FIREBALL_COLORS), 'fireball-color');
});

// Обработчик валидации
setup.querySelector('.setup-user-name').addEventListener('invalid', function (evt) {
  inputValidation(evt.target);
});
