const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.see('Your Liked Catalogue Kuliner-an', '.explore-label');
  I.see('', '#restaurants');
});

Scenario('unliking restaurant catalogue', async ({ I }) => {
  I.see('', '#restaurants');

  I.amOnPage('/');

  const firstRestaurant = locate('.explore-tittle a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.explore-item');

  const unlikedRestaurantName = await I.grabTextFrom('.explore-tittle');

  assert.strictEqual(firstRestaurantName, unlikedRestaurantName);

  I.seeElement('.explore-tittle a');
  await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('', '#restaurants');
});
