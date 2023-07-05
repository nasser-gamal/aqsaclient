import { useSelector } from "react-redux"

export default function Profile() {
  const { user } = useSelector(state => state.user)

  return (
    <div className='nav-acc'>
      <h4 className="text-white">مرحبا {user?.userName} </h4>
    </div>
  )
}
