import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';

export default function AddEditBank() {
  return (
    <form>
      <CustomInput type='text' label='اسم البنك' name={'bankAccount'} />
      <CustomInput type='textarea' label='محلوظة' name={'note'} />
      <FormButtons />
    </form>
  )
}
