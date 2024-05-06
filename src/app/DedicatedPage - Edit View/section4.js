import React from 'react';

import section4Styles from './section4.module.scss';

function renderSection4(props) {
  return (
    <section className={section4Styles.section4}>
      <div className={section4Styles.flex_row}>
        <textarea className={section4Styles.content_box1} placeholder="We create fusion pieces that we perform several times a year. If you have a passion for singing, or if you
            play an instrument - come join a vibrant community to nurture and share your talent! We welcome people of
            all talents and skill levels."></textarea>

        <div className={section4Styles.flex_col}>
          <div className={section4Styles.flex_row1}>
            <img
              className={section4Styles.image4}
              src={'/assets/8961133439bbbf471da5bd11f08914fc.png'}
              alt="alt text"
            />
            <input className={section4Styles.content_box2} placeholder="test@gmail.com"/>
          </div>

          <div className={section4Styles.flex_row2}>
            <img
              className={section4Styles.image41}
              src={'/assets/6922a51e98d3431ae8de16a12e63d27d.png'}
              alt="alt text"
            />
            <textarea className={section4Styles.content_box2} placeholder="6133 University Blvd #3500 Vancouver BC V6T 1Z1 Canada"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection4;
