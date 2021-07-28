const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.see('Your Liked Catalogue Kuliner-an', '.explore-label');
  I.see('', '#restaurants');
});

Scenario('liking one restaurant catalogue', async ({ I }) => {
  I.see('', '#restaurants');

  I.amOnPage('/');

  const firstRestaurant = locate('.explore-tittle a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.explore-item');
  const likedRestaurantName = await I.grabTextFrom('.explore-tittle');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
