import React from 'react';

import section2Styles from './section2.module.scss';

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

function renderSection2(props) {
  return (
    <section className={section2Styles.section2}>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image7} src={'/assets/aea99ada115ff3911f9f589ad27ae004.png'} alt="alt text" />

        <div className={section2Styles.flex_col}>
          <div className={section2Styles.flex_row1}>
            <h1 className={section2Styles.hero_title}>{club.name}</h1>
            <input type="image" className={section2Styles.image3}
                src={'/assets/7ca9d58c7e64329a243f5270e4daacc4.png'}
                alt="alt text"/>
            <input type="image" className={section2Styles.image4}
                src={'/assets/5fb51c06444454205dbde50d3c538e97.png'}
                alt="alt text"/>
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image31}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle}>{campus.name}</h3>
          </div>

          <div className={section2Styles.flex_row3}>
            <img
              className={section2Styles.image31}
              src={'/assets/b736f8b9fc449e59127e240c8a4f7643.png'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle1}>236 members</h3>
          </div>

          <button className={section2Styles.btn}>SUBSCRIBE</button>
        </div>
      </div>
    </section>
  );
}

export default renderSection2;
