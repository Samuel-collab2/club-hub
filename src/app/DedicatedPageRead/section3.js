import React from 'react';

import section3Styles from './section3.module.scss';

function renderSection3(props) {
  return (
    <section className={section3Styles.section3}>
      <div className={section3Styles.flex_col}>
        <div className={section3Styles.flex_row}>
          <button className={section3Styles.subtitle}>About</button>
          <button className={section3Styles.subtitle}>Events</button>
          <button className={section3Styles.subtitle}>Members</button>
        </div>
      </div>
    </section>
  );
}

export default renderSection3;
