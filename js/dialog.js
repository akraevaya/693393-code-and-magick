'use strict';

var dialogHandler = document.querySelector('.setup');

var startCoords = {};
var dragged = false;

var setStartCoords = function (evt) {
  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
};

var onMouseMove = function (moveEvt) {
  moveEvt.preventDefault();
  dragged = true;

  var shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  setStartCoords(moveEvt);

  dialogHandler.style.top = (dialogHandler.offsetTop - shift.y) + 'px';
  dialogHandler.style.left = (dialogHandler.offsetLeft - shift.x) + 'px';
};

var onClickPreventDefault = function (draggedEvt) {
  draggedEvt.preventDefault();
  dialogHandler.removeEventListener('click', onClickPreventDefault);
};

var onMouseUp = function (upEvt) {
  upEvt.preventDefault();

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  if (dragged) {
    dialogHandler.addEventListener('click', onClickPreventDefault);
  }
};

var onMouseDownDialog = function (evt) {
  dragged = false;

  setStartCoords(evt);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

dialogHandler.addEventListener('mousedown', onMouseDownDialog);
