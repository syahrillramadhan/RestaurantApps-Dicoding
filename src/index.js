import 'regenerator-runtime'; /* for async await transpile */
import './styles/main.css';
import './styles/Navbar.css';
import './styles/hero.css';
import './styles/list-restaurant.css';
import './styles/detail-restaurant.css';
import './styles/footer.css';
import './styles/responsive.css';
import App from './scripts/views/app';
import './scripts/component/Navbar/Navbar';
import './scripts/component/hero/jumbotronElement';
import swRegister from './scripts/utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#menu'),
  content: document.querySelector('#mainContent'),
  drawer: document.querySelector('.nav-list'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
