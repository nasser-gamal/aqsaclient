/* eslint-disable react/prop-types */

import './form-btns.modules.css';
import { Button, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';

export default function FormButtons({ status, close }) {

  // const btnTitle = {
  //   CREATE: 'حفظ',
  //   EDIT: 'تعديل',
  //   DELETE: 'تأكيد'
  // }

  return (
    <Flex p={'20px 0 8px '} gap={10} justify={'center'}>
      <Button
        type='submit'
        variant="filled"
        radius="xl"
      >
        {status === "edit" ? "تعديل" : "حفظ"}
      </Button>
      <Button
        type='button'
        variant="filled"
        color="gray"
        onClick={() => {
          if (close) {
            close()
          } else {
            modals.closeAll()
          }
        }}
        radius="xl"
      >
        إلغاء
      </Button>
    </Flex>
  )
}
