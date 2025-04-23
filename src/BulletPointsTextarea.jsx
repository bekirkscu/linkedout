import React from 'react';

const BulletPointsTextarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="bulletpoints-textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default BulletPointsTextarea;
