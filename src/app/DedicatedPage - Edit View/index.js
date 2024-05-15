import React from 'react';
import PropTypes from 'prop-types';

import renderSection2 from './section2.js';
import renderSection3 from './section3.js';
import renderSection4 from './section4.js';

import styles from './index.module.scss';

function DedicatedPageEditMode(props) {
  return (
    <main>
      {renderSection2(props)}
      {renderSection3(props)}
      {renderSection4(props)}
    </main>
  );
}

DedicatedPageEditMode.propTypes = {
  className: PropTypes.string
};

export default DedicatedPageEditMode;
