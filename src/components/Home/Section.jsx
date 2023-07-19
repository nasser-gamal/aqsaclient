/* eslint-disable react/prop-types */

import SectionTitle from './SectionTitle'
import SectionBox from './SectionBox'

export default function Section(props) {

  const { title, boxes } = props

  return (
    <div className='section'>
      <SectionTitle title={title} />
      <div className='sec-boxes'>
        {
          boxes?.map((box, index) => {
            return <SectionBox
              key={index}
              boxTitle={box.boxTitle}
              bodyTitle={box.bodyTitle}
              bodyInfo={box.bodyInfo}
            />
          })
        }
      </div>
    </div>
  )
}
