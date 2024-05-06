import React from 'react';

import section2Styles from './section2.module.scss';

function renderSection2(props) {
  return (
    <section className={section2Styles.section2}>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image6} src={'/assets/aea99ada115ff3911f9f589ad27ae004.png'} alt="alt text" />

        <div className={section2Styles.flex_col}>
          <input className={section2Styles.content_box} placeholder="Coding For All"/>

          <div className={section2Styles.flex_row1}>
            <img
              className={section2Styles.image3}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle}>Burnaby Campus</h3>
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image3}
              src={'/assets/b736f8b9fc449e59127e240c8a4f7643.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle1}>236 members</h3>
          </div>

          <button className={section2Styles.btn}>SAVE</button>
        </div>
      </div>
    </section>
  );
}

export default renderSection2;
