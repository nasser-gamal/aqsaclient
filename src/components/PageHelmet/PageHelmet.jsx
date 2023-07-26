/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async'

export default function PageHelmet({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
