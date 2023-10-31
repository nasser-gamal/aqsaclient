/* eslint-disable react/prop-types */

import SectionTitle from './SectionTitle'
import SectionBox from './SectionBox'

export default function Section({ title, boxes, active }) {


  return (
    <div className='section'>
      <SectionTitle title={title} />
      <div className='sec-boxes'>
        {
          boxes?.map((box, index) => {
            return <SectionBox
              key={index}
              boxTitle={box.boxTitle}
              img={box.img}
              info={box.info}
              click={box.click}
              active={active}
            />
          })
        }
      </div>
    </div>
  )
}
