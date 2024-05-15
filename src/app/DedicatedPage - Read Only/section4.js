import React from 'react';

import section4Styles from './section4.module.scss';

function renderSection4(props) {
  return (
    <section className={section4Styles.section4}>
      <div className={section4Styles.flex_row}>
        <h5 className={section4Styles.highlight1}>
          We create fusion pieces that we perform several times a year. If you have a passion for singing, or if you
          play an instrument - come join a vibrant community to nurture and share your talent! We welcome people of all
          talents and skill levels.
          <br />
          <br />
          {`Our members particularly enjoy coming together to create exciting compositions. If you have an idea for a performance, we'd love to hear it!`}
          <br />
          <br />
          For more information about Sargam and a contact form for any performance or membership inquiries, feel free to
          check out
        </h5>

        <div className={section4Styles.flex_col}>
          <h4 className={section4Styles.highlight3}>Send Us a Message 📬</h4>

          <div className={section4Styles.content_box1}>
            <textarea className={section4Styles.content_box}/>
            <input type="image" className={section4Styles.image5}
                  src={'/assets/d58a14e2e1e7721ffe1193453276d567.png'}
                  alt="alt text"/>
          </div>

          <div className={section4Styles.flex_row1}>
            <img
              className={section4Styles.image4}
              src={'/assets/8961133439bbbf471da5bd11f08914fc.png'}
              alt="alt text"
            />
            <h5 className={section4Styles.highlight11}>test@gmail.com</h5>
          </div>

          <div className={section4Styles.flex_row2}>
            <img
              className={section4Styles.image4}
              src={'/assets/6922a51e98d3431ae8de16a12e63d27d.png'}
              alt="alt text"
            />
            <h5 className={section4Styles.highlight11}>6133 University Blvd #3500 Vancouver BC V6T 1Z1 Canada</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection4;
