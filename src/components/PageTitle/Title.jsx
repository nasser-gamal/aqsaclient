import PropTypes from 'prop-types'

import './title.modules.css'

export default function Title({ title }) {
  return (
    <div className='title text-center'>
      <h3 className='page-title'>{title}</h3>
    </div>
  )
}


Title.propTypes = {
  title: PropTypes.string.isRequired,
}