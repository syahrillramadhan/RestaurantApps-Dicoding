import ENDPOINT_API from '../globals/endpoint-API';
import CONFIG from '../globals/config';

class restaurantDBSource {
  static async restaurantList() {
    const response = await fetch(ENDPOINT_API.LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(ENDPOINT_API.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addReview(dataInput) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': CONFIG.CONTENT_TYPE,
          'X-Auth-Token': CONFIG.API_KEY,
        },
        body: JSON.stringify(dataInput),
      };
      const response = await fetch(ENDPOINT_API.ADD_REVIEW, options);
      const responseJson = await response.json();
      return responseJson.customerReviews;
    } catch (error) {
      let message = error;
      message = 'Failed add to review, please Check your connection';
      return alert(message);
    }
  }
}

export default restaurantDBSource;
