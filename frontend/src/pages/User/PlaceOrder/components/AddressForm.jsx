
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../PlaceOrder.module.scss';

const cx = classNames.bind(styles);

export const AddressForm = ({ formData, errors, handleChange }) => {
  return (
    <div className={cx('place-order-left')}>
      <p className={cx('title')}>Delivery Information</p>

      <div className={cx('form-group')}>
        <input
          type="text"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange('street')}
          className={cx({ 'error': errors.street })}
          required
        />
        {errors.street && <span className={cx('error-message')}>{errors.street}</span>}
      </div>

      <div className={cx('multi-fields')}>
        <div className={cx('form-group')}>
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange('city')}
            className={cx({ 'error': errors.city })}
            required
          />
          {errors.city && <span className={cx('error-message')}>{errors.city}</span>}
        </div>
        <div className={cx('form-group')}>
          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={handleChange('state')}
            className={cx({ 'error': errors.state })}
            required
          />
          {errors.state && <span className={cx('error-message')}>{errors.state}</span>}
        </div>
      </div>

      <div className={cx('form-group')}>
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange('country')}
          className={cx({ 'error': errors.country })}
          required
        />
        {errors.country && <span className={cx('error-message')}>{errors.country}</span>}
      </div>
    </div>
  );
};

AddressForm.propTypes = {
  formData: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};