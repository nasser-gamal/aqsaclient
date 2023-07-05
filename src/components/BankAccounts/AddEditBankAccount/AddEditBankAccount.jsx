import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';

export default function AddEditBankAccount() {
  return (
    <form>
      <CustomInput type='text' label='البنك' />
      <CustomInput type='text' label='اسم الحساب' name={'bankAccount'} />
      <CustomInput type='text' label='رقم الحساب' name={'accountNumber'} />
      <CustomInput type='text' label='الرصيد الافتتاحي' name={'balance'} />
      <CustomInput type='textarea' label='محلوظة' name={'note'} />
      <FormButtons />
    </form>
  )
}
