
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../PlaceOrder.module.scss';

const cx = classNames.bind(styles);

export const CartSummary = ({ cartItems, totalAmount, onSubmit, isSubmitting }) => {
  return (
    <div className={cx('place-order-right')}>
      <div className={cx('cart-total')}>
        <h2>Cart Total</h2>
        <div>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.productId._id} className={cx('cart-item')}>
                  <p>
                    {item.productId.name} x {item.quantity}
                  </p>
                  <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className={cx('cart-total-details')}>
                <p>Subtotal</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
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