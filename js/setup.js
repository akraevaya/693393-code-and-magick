'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Открытие/закрытие окна настройки персонажа

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

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

var similarWizards = setup.querySelector('.setup-similar');
similarWizards.classList.remove('hidden');

var similarList = similarWizards.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
  var wizards = createWizardsArr();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
};

renderSimilarWizards();

// Валидация

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (_evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из двух символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно быть длиннее 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное для заполнения поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Изменение цвета мантии персонажа по нажатию

var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatValue = setup.querySelector('input[name="coat-color"]');

setupWizardCoat.addEventListener('click', function () {
  var coatColorRandom = getRandomElement(COAT_COLORS);
  setupWizardCoat.style.fill = coatColorRandom;
  wizardCoatValue.value = coatColorRandom;
});

// Изменение цвета глаз персонажа по нажатию

var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesValue = setup.querySelector('input[name="eyes-color"]');

setupWizardEyes.addEventListener('click', function () {
  var eyesColorRandom = getRandomElement(EYES_COLORS);
  setupWizardEyes.style.fill = eyesColorRandom;
  wizardEyesValue.value = eyesColorRandom;
});

// Изменение цвета фаерболов по нажатию

var setupFireballColor = setup.querySelector('.setup-fireball-wrap');
var fireballValue = setup.querySelector('input[name="fireball-color"]');

setupFireballColor.addEventListener('click', function () {
  var fireballColorRandom = getRandomElement(FIREBALL_COLORS);
  setupFireballColor.style.backgroundColor = fireballColorRandom;
  fireballValue.value = fireballColorRandom;
});
