import {
  Button, Checkbox, Divider, FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles/FilterForm.module.scss';
import Modal from '../defaultComponents/Modal/ModalController';
import colors from '../../scssAbstracts/_variables.scss';

// TODO: configure types of props later
// eslint-disable-next-line react/prop-types
function FilterFormView({ isModalOpened, handleClose, recipes }) {
  return (
    <Modal isOpen={isModalOpened} handleClose={handleClose}>
      <div className={styles.modal_wrapper}>
        <h3>Filter</h3>
        {/* eslint-disable-next-line react/prop-types */}
        {recipes.cuisines.map((item) => (
          <div key={item.id}>
            <div className={styles.cuisine_checkbox_wrapper}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={
                      // eslint-disable-next-line react/prop-types
                    recipes.curFilterState.cuisineFilter.length
                      // eslint-disable-next-line react/prop-types
                      ? recipes.curFilterState.cuisineFilter.find((x) => x.id === item.id).status
                      : true
                  }
                    sx={{ color: colors.shade50, '&.Mui-checked': { color: colors.shade50 } }}
                    onChange={() => checkboxOnChange(item.id)}
                  />
              )}
                label={item.title}
                labelPlacement="start"
              />
            </div>
            <Divider />
          </div>
        ))}

        <Slider
          minDistance={50}
          /* eslint-disable-next-line react/prop-types */
          value={recipes.curFilterState.calFilter}
          ref={sliderRef}
          onChange={sliderOnChange}
          min={CAL_SLIDER_MIN_VALUE}
          max={CAL_SLIDER_MAX_VALUE}
          className={styles.slider}
        />
        <p className={styles.p}>Calories, kCal</p>

        <div className={styles.button_row}>
          {
            isFilterChanged()
              ? (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(clearFilter())}
                  sx={{
                    borderColor: colors.shade50,
                    color: colors.shade50,
                    '&:hover': { borderColor: colors.shade50 },
                    float: 'left',
                  }}
                >
                  Clear
                </Button>
              )
              : null
          }
          <Button
            variant="contained"
            onClick={btnApplyOnClick}
            sx={{
              bgcolor: colors.shade50,
              '&:hover': { bgcolor: '#746B5F' },
              float: 'right',
            }}
          >
            Show Recipes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

FilterFormView.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // recipes: PropTypes.arrayOf(PropTypes.shape({ cuisines: PropTypes })).isRequired,
};

export default FilterFormView;
