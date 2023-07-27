/* eslint-disable react/prop-types */
import CustomButton from '../../common/Button/CustomButton'


export default function DeleteButton({ onClick }) {


  return (
    <CustomButton
      type='button'
      classes={'delete-btn'}
      width={'60px'}
      height={'30px'}
      fontSize={'17px'}
      onClick={onClick}
    >
      حذف
    </CustomButton>
  )
}



