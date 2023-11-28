/* eslint-disable react/prop-types */
import YearDate from './Year'
import MonthDate from './Month'

export default function Date({ query, setQuery, setSkip }) {
  return (
    <>
      <YearDate
        form={query}
        setForm={setQuery}
        setSkip={setSkip}
      />
      <MonthDate
        form={query}
        setForm={setQuery}
        setSkip={setSkip}
      />
    </>
  )
}
