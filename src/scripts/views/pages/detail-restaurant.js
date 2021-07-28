import restaurantDBSource from '../../data/restaurantDB-source';
import UrlParser from '../../routes/url-parser';
import {
  restaurantDetailTemplate,
  categoriesMenuList,
  foodsListTemplated,
  drinkListTemplated,
  customerReviewsList,
} from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant"> </div>  
         <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await restaurantDBSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML += restaurantDetailTemplate(restaurant);
    // looping list kategori Menu
    const categoriesMenu = document.querySelector('#category_menu');
    restaurant.categories.forEach((category) => {
      categoriesMenu.innerHTML += categoriesMenuList(category);
    });
    // end------------------------------------------

    // looping list Daftar Menu
    const foodList = document.querySelector('#Food');
    restaurant.menus.foods.forEach((food) => {
      foodList.innerHTML += foodsListTemplated(food);
    });

    const drinkList = document.querySelector('#Drink');
    restaurant.menus.foods.forEach((drink) => {
      drinkList.innerHTML += drinkListTemplated(drink);
    });
    // end -----------------------------------------

    // looping Customer Review
    const customerReviewer = document.querySelector('.reviews');
    restaurant.customerReviews.forEach((customerReview, index) => {
      if (index < 5) {
        customerReviewer.innerHTML += customerReviewsList(customerReview);
      }
    });

    // add new review
    const modals = document.querySelectorAll('[data-modal]');
    const nameInput = document.querySelector('#inputName');
    const reviewInput = document.querySelector('#inputReview');
    modals.forEach((trigger) => {
      trigger.addEventListener('click', async (e) => {
        e.preventDefault();
        if ((await nameInput.value) === '' || reviewInput.value === '') {
          alert('Form name atau review tidak boleh kosong');
          nameInput.value = '';
          reviewInput.value = '';
        } else {
          const dataInput = {
            id: url.id,
            name: nameInput.value,
            review: reviewInput.value,
          };
          const modal = document.getElementById(trigger.dataset.modal);
          if (await restaurantDBSource.addReview(dataInput)) {
            nameInput.value = '';
            reviewInput.value = '';
            modal.classList.add('open');
          }
          const exits = modal.querySelectorAll('.modal-exit');
          exits.forEach((exit) => {
            exit.addEventListener('click', (event) => {
              event.preventDefault();
              modal.classList.remove('open');
            });
          });
        }
      });
    });
    // icon like restaurant
    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        pictureId: restaurant.pictureId,
        name: restaurant.name,
        city: restaurant.city,
        rating: restaurant.rating,
        description: restaurant.description,
      },
    });
  },
};

export default Detail;
