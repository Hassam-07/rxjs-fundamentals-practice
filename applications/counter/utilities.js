export const count = document.getElementById('count');
export const startButton = document.getElementById('start');
export const setButton = document.getElementById('set');
export const resetButton = document.getElementById('reset');
export const countUpButton = document.getElementById('count-up');
export const countDownButton = document.getElementById('count-down');

export const setCount = (value) => {
  count.innerText = value;
};
