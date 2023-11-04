/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import CustomButton from '../../common/Button/CustomButton'
import { useDispatch } from 'react-redux'
import { notify } from '../../../utils/notify'
import { useRestoreDepositeMutation } from '../../../app/features/transaction/depositeApi'
import { useRestoreWithDrawMutation } from '../../../app/features/transaction/withDrawApi'
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice'

export default function ResotreButton({  type, transactionId }) {
  const dispatch = useDispatch()
  const [restoreDeposite, { isLoading: depositeLoading }] = useRestoreDepositeMutation()
  const [restoreWithdraw, { isLoading: withdrawLoading }] = useRestoreWithDrawMutation()

  const restoreData = async () => {
    try {
      const response = type == 'deposite' ? await restoreDeposite(transactionId).unwrap() : restoreWithdraw(transactionId).unwrap()
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }



  useEffect(() => {
    if (depositeLoading || withdrawLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [depositeLoading, dispatch, withdrawLoading]);




  return (
    <div className='restore-btn'>
      <CustomButton
        classes={'add-btn'}
        width={'60px'}
        height={'30px'}
        fontSize={'16px'}
        onClick={restoreData}
      >
        استرجاع
      </CustomButton>
    </div>
  )
}
