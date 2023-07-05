import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

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

{/* <NavLink to='/1' key={index}>
  <SectionBox boxTitle={box.boxTitle} bodyTitle={box.bodyTitle} bodyInfo={box.bodyInfo} />
</ NavLink > */}



Section.propTypes = {
  title: PropTypes.string.isRequired,
  boxes: PropTypes.array.isRequired,
}
