import React, { useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

import SliderView from './SliderView';

const SliderController = React.forwardRef(({
  value, onChange, min, max, className, minDistance,
}, ref) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      setLocalValue(newValue);
      return;
    }

    if (activeThumb === 0) {
      setLocalValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setLocalValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }

    onChange();
  };

  useImperativeHandle(ref, () => ({
    getState: () => localValue,
  }), [localValue]);

  return (
    <SliderView
      value={localValue}
      min={min}
      max={max}
      className={className}
      handleChange={handleChange}
    />
  );
});

SliderController.defaultProps = {
  className: '',
  onChange: null,
};

SliderController.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  minDistance: PropTypes.number.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default SliderController;
