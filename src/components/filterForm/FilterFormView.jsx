import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

import Modal from '../defaultComponents/modal/ModalController';
import Slider from '../defaultComponents/slider/SliderController';
import ButtonRow from './components/buttonRow/ButtonRowController';
import CuisinesFilterListController from './components/cuisinesFilterList/CuisinesFilterListController';
import { recipesShape } from '../../models/propTypesObjects/Recipes';
import styles from './styles/FilterForm.module.scss';

const FilterFormView = React.forwardRef(({
  isModalOpened, handleClose, recipes, handleSliderChange, isFilterChanged, handleBtnApplyClick,
  handleCheckboxChange,
}, ref) => (
  <Modal isOpen={isModalOpened} handleClose={handleClose}>
    <div className={styles.modal_wrapper}>
      <Typography variant="h3">Filter</Typography>
      <CuisinesFilterListController
        recipes={recipes}
        handleCheckboxChange={handleCheckboxChange}
      />

      <Slider
        ref={ref}
        minDistance={50}
        value={recipes.curFilterState.calFilter}
        min={recipes.filterState.calFilter[0]}
        max={recipes.filterState.calFilter[1]}
        className={styles.slider}
        onChange={handleSliderChange}
      />
      <Typography variant="body1" className={styles.p}>Calories, kCal</Typography>

      <ButtonRow
        isFilterChanged={isFilterChanged}
        handleBtnApplyClick={handleBtnApplyClick}
      />
    </div>
  </Modal>
));

FilterFormView.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipes: recipesShape.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  isFilterChanged: PropTypes.bool.isRequired,
  handleBtnApplyClick: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default FilterFormView;
