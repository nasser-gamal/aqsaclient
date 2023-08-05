/* eslint-disable react/prop-types */
import YearDate from './yearDate'
import MonthDate from './monthDate'

export default function Date({ query, setQuery, setSkip }) {
  return (
    <> 
      <YearDate query={query} setQuery={setQuery} setSkip={setSkip} />
      <MonthDate query={query} setQuery={setQuery} setSkip={setSkip} />
    </>
  )
}
