import { NavLink } from 'react-router-dom'
import CustomInput from '../../components/common/FormFields/input/CustomInput'
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  return (
    <div className='d-flex flex-center search'>
      <CustomInput
        type={'text'}
        name={'search'}
        placeholder={'ابحث عن الفاتورة بالاسم او قم الفاتورة'}
        borderRadius={'0 5px 5px 0'}
        width={'calc(100% - 40px)'}
      />
      {/* <NavLink to="/Search"> */}
        <span className='text-white d-flex flex-center search-span'>
          <FaSearch />
        </span>
      {/* </NavLink> */}
    </div>
  )
}
