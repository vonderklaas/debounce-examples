const initApp = () => {
  const button = document.getElementById('button');
  button.addEventListener('click', debounce(clickLog, 2000));
};

const clickLog = () => {
  console.log('Clicked!');
};

window.addEventListener('DOMContentLoaded', initApp);

const debounce = (fn, delay) => {
  let id;
  console.log(`id, at immediate load: ${id}`);
  return (...args) => {
    console.log(`previous id: ${id}`);
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      // Callback
      fn(...args);
    }, delay);
  };
};
