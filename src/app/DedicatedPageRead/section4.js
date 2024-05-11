import React from 'react';

import section4Styles from './section4.module.scss';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gtmtrddwcdkwtcqkabfr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bXRyZGR3Y2Rrd3RjcWthYmZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDI2MzI3NywiZXhwIjoyMDI5ODM5Mjc3fQ.b1HSvxxQtUjVEUnMHCNlkW66AqRYtUlZIRx2GR88qgg"
const supabase = createClient(supabaseUrl, supabaseKey)

const user_id = 3;

let { data: club} = await supabase
  .from('club')
  .select('description, name, campus_id, website')
  .eq('id', user_id)
  .single()

const campusId = club.campus_id;

let { data: campus} = await supabase
  .from('campus')
  .select('name, address')
  .eq('id', campusId)
  .single()

function renderSection4(props) {
  return (
    <section className={section4Styles.section4}>
      <div className={section4Styles.flex_row}>
        <h5 className={section4Styles.highlight1}>
          {club.description}
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
            <h5 className={section4Styles.highlight11}>{campus.address}</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection4;
