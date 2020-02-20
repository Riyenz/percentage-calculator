
const createState = (state) => {
  return new Proxy(state, {
    set(target, property, value) {
      target[property] = value; // default set behaviour
      render(); // updates the view every time the state changes
      return true;
    }
  });
};

const state = createState({
  /* Percentage Calculator A */
  'a-what-is': undefined,
  'a-of': undefined,
  /* Percentage Calculator B */
  'b-portion': undefined,
  'b-amount': undefined,
  /* Percentage Calculator C */
  'c-change-from': undefined,
  'c-change-to': undefined,
});

const render = () => {
  renderA()
  renderB()
  renderC()
};

const listener = (event) => {
  state[event.target.dataset.model] = event.target.value;
};

/* Percentage Calculator A */
const renderA = () => {
  if (!state['a-what-is'] || !state['a-of']) {
    document.querySelector('[data-binding="a-total"]').innerHTML = '0'
    return
  }
  document.querySelector('[data-binding="a-total"]').innerHTML = ((+state['a-what-is'] / 100 * +state['a-of']).toFixed(3)) * 1;
  document.querySelector('[data-model="a-what-is"]').value = state['a-what-is'];
  document.querySelector('[data-model="a-of"]').value = state['a-of'];
}

/* Percentage Calculator B */
const renderB = () => {
  if (!state['b-portion'] || !state['b-amount']) {
    document.querySelector('[data-binding="b-total"]').innerHTML = '0'
    return
  }
  document.querySelector('[data-binding="b-total"]').innerHTML = ((+state['b-portion'] / +state['b-amount'] * 100).toFixed(3)) * 1 + '%';
  document.querySelector('[data-model="b-portion"]').value = state['b-portion'];
  document.querySelector('[data-model="b-amount"]').value = state['b-amount'];
}

/* Percentage Calculator C */
const renderC = () => {
  if (!state['c-change-from'] || !state['c-change-to']) {
    document.querySelector('[data-binding="c-total"]').innerHTML = '0'
    return
  }
  document.querySelector('[data-binding="c-total"]').innerHTML = ((+state['c-change-to'] - +state['c-change-from']) / +state['c-change-from'] * 100).toFixed(3) * 1 + '%';
  document.querySelector('[data-model="c-change-from"]').value = state['c-change-from'];
  document.querySelector('[data-model="c-change-to"]').value = state['c-change-to'];
}

/* Percentage Calculator A */
document.querySelector('[data-model="a-what-is"]').addEventListener('keyup', listener);  
document.querySelector('[data-model="a-of"]').addEventListener('keyup', listener);

/* Percentage Calculator B */
document.querySelector('[data-model="b-portion"]').addEventListener('keyup', listener);  
document.querySelector('[data-model="b-amount"]').addEventListener('keyup', listener);

/* Percentage Calculator C */
document.querySelector('[data-model="c-change-from"]').addEventListener('keyup', listener);  
document.querySelector('[data-model="c-change-to"]').addEventListener('keyup', listener);

render()

const tabsButton = document.querySelectorAll('.tabs__button');
const tabDots = []
const activeTabClass = 'tabs__button--active'
const activeDotClass = 'active'
const clearActiveTabs = () => {
  tabsButton.forEach((e, i) => {
    tabDots[i].classList.remove(activeDotClass);
    e.classList.remove(activeTabClass);
  })
}

const initializeTabs = () => {
  tabsButton.forEach(button => {
    const tabDotSpan = document.createElement('span')
    document.querySelector('.tab-dots').appendChild(tabDotSpan)
    tabDots.push(tabDotSpan)
  })

  tabDots[0].classList.add(activeDotClass);
  tabsButton[0].classList.add(activeTabClass);
}


document.querySelector('.home__cards')
  .addEventListener("scroll", function(e) {
    const deviceWidth = document.querySelector('html').offsetWidth;
    const currentScroll = e.target.scrollLeft

    if (deviceWidth % (currentScroll + deviceWidth) !== deviceWidth) return
    
    clearActiveTabs()
    const selectedTab = parseInt((currentScroll + deviceWidth) / deviceWidth) - 1
    tabDots[selectedTab].classList.add(activeDotClass);
    tabsButton[selectedTab].classList.add(activeTabClass);
  });

initializeTabs()