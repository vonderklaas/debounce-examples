const input = document.getElementById('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

function debounce(callback, delay = 500) {
  let timeout;
  return (args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(args);
    }, delay);
  };
}

function throttle(callback, delay = 500) {
  let shouldWait = false;
  let waitingArgs;

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      callback(waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    callback(args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

const updateTextDebounce = debounce(() => {
  incrementCount(debounceText);
});

const updateTextThrottle = throttle(() => {
  incrementCount(throttleText);
});

// Mouse Event
document.addEventListener('mousemove', (e) => {
  incrementCount(defaultText);
  updateTextDebounce();
  updateTextThrottle();
});

function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}
