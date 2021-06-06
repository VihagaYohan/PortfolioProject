import {INCREASE_QUANTITY, DECREASE_QUANTITY} from './types';

export const increaseQuantityBy1 = productId => ({
  type: INCREASE_QUANTITY,
  data: productId,
});

export const decreaseQuantityBy1 = productId => ({
  type: DECREASE_QUANTITY,
  data: productId,
});


