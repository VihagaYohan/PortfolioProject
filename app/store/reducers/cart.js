export {INCREASE_QUANTITY, DECREASE_QUANTITY} from '../actions/types';

// constants
import {images} from '../../constants';

const initialState = {
  cart: [
    {
      menuId: 1,
      name: 'Crispy Chicken Burger',
      photo: images.crispy_chicken_burger,
      description: 'Burger with crispy chicken, cheese and lettuce',
      calories: 200,
      price: 10,
      quantity: 50,
      lineTotal: 10,
    },
    {
      menuId: 2,
      name: 'Crispy Chicken Burger with Honey Mustard',
      photo: images.honey_mustard_chicken_burger,
      description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
      calories: 250,
      price: 15,
      quantity: 50,
      lineTotal: 15,
    },
  ],
  cartTotal: 1250,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOP_ID':
      const shopId = action.data;
      return {
        ...state,
        shopId: shopId,
      };

    case 'INCREASE_QUANTITY':
      manageQuantity(state.cart, action.data, 'increase');
      return {
        ...state,
        cartTotal: getOrderTotal(state.cart),
      };

    case 'DECREASE_QUANTITY':
      manageQuantity(state.cart, action.data, 'decrease');
      return {
        ...state,
        cartTotal: getOrderTotal(state.cart),
      };
    default:
      return state;
  }
};

// manager quantity
const manageQuantity = (cart, id, operationType) => {
  const product = cart.find(i => i.productId === id); // find product in the cart

  let totoal = 0;
  // handle item quantity increase operation
  if (operationType === 'increase') {
    product.quantity = product.quantity + 1;
    const total = getOrderTotal(cart);
    console.log(`cart total : ${total}`);
  } else {
    // handle item quantity decrease operation
    product.quantity = product.quantity - 1;
    const total = getOrderTotal(cart);
    console.log(`cart total : ${total}`);
  }
};

// get cart order total
const getOrderTotal = cart => {
  let total = 0;
  cart.map(c => {
    total = total + i.lineTotal;
  });
  return total;
};
