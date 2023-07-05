import { useState } from 'react';
import CustomInput from '../../../common/FormFields/input/CustomInput';
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import FormButtons from '../../../UI/FormButtons/FormButtons';

export default function AddEditDeposit() {
  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الحساب');

  return (
    <div>
      {/* <div className="balance">
        <ul>
          <li>
            رصيد قبل
            <span>12000</span>
          </li>
          <li>
            رصيد بعد
            <span>13000</span>
          </li>
        </ul>
      </div> */}
      <form>
        <div >
          <CustomSelect
          dropHeading={dropHeading}
          label={'اختر الحساب'}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          onClick={() => setIsClicked(!isClicked)}
          >
            <li
              onClick={() => {
                setDropHeading("البنك الاهلي");
                setIsClicked(!isClicked);
              }}
            >
              البنك الاهلي 
            </li>
            <li
              onClick={() => {
                setDropHeading("بنك مصر");
                setIsClicked(!isClicked);
              }}
            >
               بنك مصر
            </li>
          </CustomSelect>
          <CustomInput type='text' name='number' label='الرقم' />
          <CustomInput type='text' name='bankAccount' label='قيمة الفاتورة' />
          <CustomInput type='text' name='bankAccount' label='رسوم المزود' />
          <CustomInput type='text' name='bankAccount' label='الاجمالي' disabled={true} />
          <CustomInput type='text' name='bankAccount' label='عائد مزود الخدمة' />
          <CustomInput type='text' name='bankAccount' label='المخصوم من المركز' />
          <CustomInput type='text' name='bankAccount' label='عائد المركز' />
          <CustomInput type='text' name='bankAccount' label='صافي الربح' />
          <CustomInput type='textarea' name='note' label='ملحوظة' />
        </div>
        <FormButtons />
      </form>
    </div>
  )
}
