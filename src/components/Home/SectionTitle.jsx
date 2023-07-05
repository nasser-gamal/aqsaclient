import PropTypes from 'prop-types'
import Title from '../PageTitle/Title'

export default function SectionTitle(props) {
  const { title } = props
  return (
    <Title title={title} />
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}