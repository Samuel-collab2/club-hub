import React from 'react';

import section3Styles from './section3.module.scss';

function renderSection3(props) {
  return (
    <section className={section3Styles.section3}>
      <div className={section3Styles.flex_row}>
        <button className={section3Styles.subtitle1}>About</button>
        <button className={section3Styles.subtitle1}>Events</button>
        <button className={section3Styles.subtitle1}>Members</button>
      </div>
    </section>
  );
}

export default renderSection3;
