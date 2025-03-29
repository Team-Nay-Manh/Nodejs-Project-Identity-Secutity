import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../PlaceOrder.module.scss';

const cx = classNames.bind(styles);
const SHIPPING_FEE = 30000;

export const CartSummary = ({ cartItems, totalAmount, onSubmit, isSubmitting }) => {
  // Tính subtotal riêng để hiển thị
  const subtotal = cartItems?.reduce((total, item) => {
    if (!item?.productId?.price || !item?.quantity) return total;
    return total + (item.productId.price * item.quantity);
  }, 0) || 0;

  return (
    <div className={cx('place-order-right')}>
      <div className={cx('cart-total')}>
        <h2>Cart Total</h2>
        <div>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => {
                // Kiểm tra item và productId có tồn tại không
                if (!item?.productId?._id || !item?.productId?.name) {
                  return null;
                }

                const itemTotal = (item.productId.price || 0) * (item.quantity || 0);

                return (
                  <div key={item.productId._id} className={cx('cart-item')}>
                    <p>
                      {item.productId.name} x {item.quantity || 0}
                    </p>
                    <p>{itemTotal.toLocaleString('vi-VN')}đ</p>
                  </div>
                );
              })}
              
              <div className={cx('cart-total-details')}>
                <div className={cx('subtotal')}>
                  <p>Subtotal</p>
                  <p>{subtotal.toLocaleString('vi-VN')}đ</p>
                </div>
                {subtotal > 0 && (
                  <div className={cx('shipping')}>
                    <p>Shipping Fee</p>
                    <p>{SHIPPING_FEE.toLocaleString('vi-VN')}đ</p>
                  </div>
                )}
                <div className={cx('total')}>
                  <p>Total</p>
                  <p>{totalAmount.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting || subtotal === 0}
                className={cx('submit-button', { 'submitting': isSubmitting })}
              >
                {isSubmitting ? 'Processing...' : 'Order Now'}
              </button>
            </>
          ) : (
            <p className={cx('empty-cart')}>No items in cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalAmount: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};