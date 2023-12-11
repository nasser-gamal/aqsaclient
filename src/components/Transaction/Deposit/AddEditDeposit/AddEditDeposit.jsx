/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateDepositeMutation, useUpdateDepositeMutation } from '../../../../app/features/transaction/depositeApi';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { validateDeposite } from '../../../../utils/validation';
import { notify } from '../../../../utils/notify';
import DropDown from '../DropDown';
import {
  Button,
  Checkbox, Flex, Group, List, NumberFormatter, Stack, Text, TextInput
}
  from '@mantine/core';

import { closeModal, updateFormState } from '../../../../app/features/modal/modalSlice';


export default function AddEditDeposit() {
  const dispatch = useDispatch();
  const { innerProps } = useSelector(state => state.modal);

  // const getCurrentBalanc = () => {
  //   innerProps?.bankAccount?.id == 
  // }

  const [balance, setBalance] = useState({
    before: innerProps?.data?.balanceBefore || innerProps?.bankAccount?.balance || "",
    after: innerProps?.data?.balanceAfter || ""
  });


  const [form, setForm] = useState({
    bankAccountId: innerProps?.data?.bankAccountId || innerProps?.bankAccount?.id || "",
    isPercentage: innerProps?.data?.isPercentage || false,
    date: innerProps?.data?.date?.split(".")[0] || DateTimeInput(),
    number: innerProps?.data?.number || "",
    amount: innerProps?.data?.amount || "",
    providerFees: innerProps?.data?.providerFees || 0,
    providerPercentage: innerProps?.data?.providerPercentage ? innerProps?.data?.providerPercentage : innerProps?.data?.providerRevenue || 0,
    note: innerProps?.data?.note || "",
  });

  function DateTimeInput() {
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = `${now.getMonth() + 1}`.padStart(2, '0');
      const day = `${now.getDate()}`.padStart(2, '0');
      const hours = `${now.getHours()}`.padStart(2, '0');
      const minutes = `${now.getMinutes()}`.padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    return getCurrentDateTime();
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createDeposite, { isLoading: createLoading }] = useCreateDepositeMutation()
  const [updateDeposite, { isLoading: updateLoading }] = useUpdateDepositeMutation()


  useEffect(() => {
    if (createLoading || updateLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, createLoading, updateLoading]);


  const onSubmit = async (e, close) => {
    e.preventDefault();
    try {
      const error = validateDeposite(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.status === 'edit'
          ? await updateDeposite({ transactionId: innerProps?.data?.id, form }).unwrap()
          : await createDeposite(form).unwrap();
        notify('success', response.message);
        console.log(innerProps)
        // dispatch(updateFormState())
        if (close) {
          dispatch(closeModal())
        } else {
          resetData();
        }
      }

    } catch (error) {
      notify('error', error.data.message);
    }
  }

  const resetData = () => {
    const updatebalance = +innerProps?.bankAccount?.balance + +form.amount
    setBalance({
      before: updatebalance,
      after: ''
    });
    setForm({
      ...form,
      isPercentage: false,
      date: DateTimeInput(),
      number: "",
      amount: "",
      providerFees: 0,
      providerPercentage: 0,
      note: "",
    });

  }


  const calcProfit = () => {
    let providerRevenue;
    if (form.isPercentage) {
      providerRevenue = (form.providerPercentage / 100) * form.amountTotal
    } else {
      providerRevenue = form.providerPercentage
    }
    let profit = (+providerRevenue - +form.providerFees).toFixed(2);
    return profit
  }


  return (
    <>
      <div>
        {innerProps?.show &&
          <>
            <div className="balance" style={{ margin: '10px 0' }}>
              <List p={'10px 0'} listStyleType='none' bg={'#4caf5047'} >
                <List.Item>
                  <Group gap={6}>
                    <Text>
                      رصيد قبل
                    </Text>
                    <Text fw={'bold'} color='red'>
                      <NumberFormatter thousandSeparator value={balance.before} />
                    </Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group gap={6}>
                    <Text>
                      رصيد بعد
                    </Text>
                    <Text fw={'bold'} color='red'>
                      <NumberFormatter thousandSeparator value={balance.after || (+balance.before + ((+form.amount + +form.providerFees)))} />
                    </Text>
                  </Group>
                </List.Item>
              </List>
            </div>
            <Stack gap={0} m={'10px 0'} align='center'>
              <Text size="md" fw={'bold'}>
                بواسطة
              </Text>
              <Text size="md" color='red' fw={'bold'}>
                {innerProps?.data?.creator.userName}
              </Text>
            </Stack>
          </>
        }
        <form onSubmit={onSubmit}>
          <div className='deposite-form'>
            {innerProps?.bankAccount || innerProps?.show || innerProps?.status == 'edit' ?
              <TextInput m={'10 0'}
                w={'100%'}
                type='text'
                name='bankAccountId'
                value={innerProps?.bankAccount?.accountName || innerProps?.data?.bankAccount?.accountName}
                label='الحساب'
                onChange={(e) => onChange(e)}
                disabled={innerProps?.show || innerProps?.bankAccount || innerProps?.status == 'edit'}
              />
              :
              <DropDown
                balance={balance}
                setBalance={setBalance}
                form={form}
                setForm={setForm}
                disabled={innerProps?.data?.bankAccountId || innerProps?.data ? true : false}
              />
            }
            <TextInput m={'10 0'}
              w={'49%'}
              type='text'
              label='الرقم'
              name='number'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
              value={form.number}
            />
            <TextInput m={'10 0'}
              w={'49%'}
              type='number'
              label='قيمة الفاتورة'
              name='amount'
              value={form.amount}
              onChange={(e) => {
                setBalance({ ...balance, after: (+e.target.value + +balance.before).toFixed(2) })
                onChange(e)
              }}
              onBlur={(e) => setBalance({ ...balance, after: (+e.target.value + +balance.before).toFixed(2) })}
              disabled={innerProps?.show}
            />
            <Checkbox
              w={'100%'}
              m={'5px 0'}
              name='isPercentage'
              defaultChecked
              color="lime.4"
              iconColor="dark.8"
              size="sm"
              label="نسبة"
              onChange={() => setForm({
                ...form,
                isPercentage: !form.isPercentage
              })}
              checked={form.isPercentage}
              disabled={innerProps?.show}
            />
            <TextInput m={'10 0'}
              w={'49%'}
              label="الرسوم"
              type='number'
              name='providerFees'
              value={form.providerFees}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
            <TextInput m={'10 0'}
              w={'49%'}
              label="العائد"
              type='number'
              name='providerPercentage'
              value={form.providerPercentage}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
            <TextInput
              w={'100%'}
              type='datetime-local'
              name='date'
              value={form.date}
              label='التاريخ'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
            <TextInput m={'10 0'}
              w={'49%'}
              label="الربح"
              type='text'
              name='providerPercentage'
              value={innerProps?.data?.profit || calcProfit()}
              onChange={(e) => onChange(e)}
              disabled={true}
            />
            <TextInput m={'10 0'}
              type='text'
              w={'49%'}
              label="ملحوظة"
              name='note'
              value={form.note}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </div>
          {balance.before && !innerProps?.show &&
            <div className="balance">
              <List listStyleType='none'>
                <List.Item>
                  <Group gap={6}>
                    <Text>
                      رصيد قبل
                    </Text>
                    <Text fw={'bold'} color='red'>
                      <NumberFormatter thousandSeparator value={balance.before} />
                    </Text>
                  </Group>
                </List.Item>
                {balance.after && <List.Item>
                  <Group gap={6}>
                    <Text>
                      رصيد بعد
                    </Text>
                    <Text fw={'bold'} color='red'>
                      <NumberFormatter thousandSeparator value={(+balance.before + ((+form.amount))).toFixed(2)} />
                    </Text>
                  </Group>
                </List.Item>
                }
              </List>
            </div>
          }
          {!innerProps?.show &&
            <Flex p={'20px 0 8px '} gap={10} justify={'center'}>
              <Button
                type='submit'
                variant="filled"
                radius="xl"
              >
                {innerProps?.status === "edit" ? "تعديل" : "حفظ"}
              </Button>
              <Button
                type='button'
                variant="filled"
                onClick={(e) => onSubmit(e, true)}
                radius="xl"
              >
                حفظ والغاء
              </Button>
              <Button
                type='button'
                variant="filled"
                color="gray"
                onClick={() => {
                  dispatch(closeModal())
                }}
                radius="xl"
              >
                إلغاء
              </Button>
            </Flex>
          }
        </form>
      </div>
    </>

    /* </Modal> */
  )
}
