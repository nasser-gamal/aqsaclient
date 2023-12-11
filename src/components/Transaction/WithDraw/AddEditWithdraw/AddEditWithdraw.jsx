/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DropDown from '../../Deposit/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateWithDrawMutation, useUpdateWithDrawMutation } from '../../../../app/features/transaction/withDrawApi';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { validateWithDraw } from '../../../../utils/validation';
import { notify } from '../../../../utils/notify';
import { Button, CheckIcon, Checkbox, Flex, Grid, Group, List, NumberFormatter, Radio, Stack, Text, TextInput } from '@mantine/core';
import { closeModal } from '../../../../app/features/modal/modalSlice';


export default function AddEditWithdraw() {
  const dispatch = useDispatch();
  const { innerProps } = useSelector(state => state.modal);

  const [balance, setBalance] = useState({
    before: innerProps?.data?.balanceBefore || innerProps?.bankAccount?.balance || "",
    after: innerProps?.data?.balanceAfter || ""
  });

  const [form, setForm] = useState({
    date: innerProps?.data?.date?.split(".")[0] || DateTimeInput(),
    isPercentage: innerProps?.data?.isPercentage || false,
    bankAccountId: innerProps?.data?.bankAccountId || innerProps?.bankAccount?.id || "",
    number: innerProps?.data?.number || "",
    amount: innerProps?.data?.amount || "",
    agentDeduction: innerProps?.data?.agentDeduction || 0,
    agentRevenue: innerProps?.data?.agentRevenue || 0,
    providerAmount: 0,
    fees: 0,
    providerPercentage: innerProps?.data?.providerPercentage ? innerProps?.data?.providerPercentage : innerProps?.data?.providerRevenue || 0,
    providerFees: innerProps?.data?.providerFees || 0,
    additionalFees: innerProps?.data?.additionalFees || 0,
    isFeesPercentage: innerProps?.data?.isFeesPercentage || false,
    additionalRevenue: innerProps?.data?.additionalRevenue || 0,
    isTotalRevenue: ((innerProps?.data?.balanceBefore - innerProps?.data?.balanceAfter).toFixed(2) == innerProps?.data?.amountTotal?.toFixed(2)) ? true : (!innerProps?.data ? true : false),
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

  const [createWithDraw, { isLoading: createLoading }] = useCreateWithDrawMutation()
  const [updateWithDraw, { isLoading: updateLoading }] = useUpdateWithDrawMutation()


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
      const error = validateWithDraw(form);
      if (error) {
        notify('error', error);
      } else {

        const response = innerProps?.status === 'edit'
          ? await updateWithDraw({ transactionId: innerProps?.data.id, form }).unwrap()
          : await createWithDraw(form).unwrap();
        notify('success', response.message);
        if (close) {
          dispatch(closeModal())
        } else {
          resetData();
        }      }
    } catch (error) {
      notify('error', error.data.message);
    }
  };


  const resetData = () => {
    let updatebalance = calcBalancAfter()
    console.log(updatebalance)
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
      agentDeduction:  0,
      agentRevenue:  0,
      providerAmount: 0,
      fees: 0,
      additionalFees:  0,
      isFeesPercentage: false,
      additionalRevenue:  0,
      isTotalRevenue: true,
    });

  }



  const calcTotalAmount = () => {
    let amount;
    if (form.isFeesPercentage == true) {
      amount = +form.amount + (+form.amount * (+form.providerFees / 100)) + +form.additionalFees
    } else {
      amount = +form.amount + +form.providerFees + +form.additionalFees
    }
    return +amount.toFixed(2);
  }


  const calcProviderDeduction = () => {
    let amount = calcTotalAmount();
    let totalProviderDeduction = amount
    if (form.isPercentage == true) {
      totalProviderDeduction -= (+form.providerPercentage / 100) * (amount)
    } else {
      totalProviderDeduction -= +form.providerPercentage
    }

    return +totalProviderDeduction.toFixed(2);
  }


  const calcBalancAfter = () => {
    let balanceAfter = balance.before;
    const totalAmount = calcTotalAmount();
    const providerDeduction = calcProviderDeduction()
    if (form.isTotalRevenue) {
      balanceAfter -= totalAmount + +form.additionalFees;
    } else {
      balanceAfter -= providerDeduction;
    }
    return +balanceAfter.toFixed(2);
  }


  const calcProfit = () => {
    // حساب الرسوم
    let fees = form.isFeesPercentage ? (+form.providerFees / 100) * +form.amount : form.providerFees;

    // المخصوم م البنك
    let amountTotal = (+form.amount + +fees).toFixed(2);

    let providerRevenue = +form.isPercentage
      ? (+form.providerPercentage / 100) * amountTotal
      : +form.providerPercentage;

    // المخصوم م المزود
    let totalProviderDeduction = (
      +amountTotal +
      +form.additionalFees -
      +providerRevenue
    ).toFixed(2);

    // المخصوم م المركز
    let totalAgentDeduction = (+form.agentDeduction - +form.agentRevenue).toFixed(2);

    // الربح
    let profit = (
      totalAgentDeduction -
      totalProviderDeduction +
      +form.additionalRevenue
    ).toFixed(2);

    return profit;
  }



  return (
    <div>
      {innerProps?.show && <>
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
                  <NumberFormatter thousandSeparator value={balance.after || calcBalancAfter()} />
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
        <Grid p={"10 10"} justify='space-between' align='center'>
          {innerProps?.bankAccount || innerProps?.show || innerProps.status == 'edit' ?
            <Grid.Col span={{ base: 6, md: 3, lg: 4 }}>
              <TextInput
                type='text'
                name='bankAccountId'
                value={innerProps?.bankAccount?.accountName || innerProps?.data?.bankAccount?.accountName}
                label='الحساب'
                onChange={(e) => onChange(e)}
                disabled={innerProps?.show || innerProps?.bankAccount || innerProps.status == 'edit'}
              />
            </Grid.Col>
            :
            <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
              <DropDown
                balance={balance}
                setBalance={setBalance}
                form={form}
                setForm={setForm}
                disabled={innerProps?.show || innerProps?.bankAccountId || innerProps?.data ? true : false}
              />
            </Grid.Col>
          }
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput

              type='datetime-local'
              name='date'
              value={form.date}
              label='التاريخ'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='text'
              name='number'
              value={form.number}
              label='الرقم'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='number'
              name='amount'
              value={form.amount}
              label='قيمة الفاتورة'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput

              type='number'
              name='providerFees'
              value={form.providerFees}
              label='رسوم المزود'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              width={'30%'}
              type='number'
              value={calcTotalAmount() || 0}
              label='الاجمالي'
              disabled={true}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
            <Checkbox
              mb={10}
              name='isFeesPercentage'
              label='نسبة الرسوم'
              value={form.isFeesPercentage}
              onChange={() => setForm({ ...form, isFeesPercentage: !form.isFeesPercentage })}
              checked={form.isFeesPercentage}
              disabled={innerProps?.show}
            />
            <Checkbox
              label='نسبة العائد'
              name='isPercentage'
              value={form.isPercentage}
              onChange={() => setForm({ ...form, isPercentage: !form.isPercentage })}
              checked={form.isPercentage}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='number'
              name='providerPercentage'
              value={form.providerPercentage}
              label='عائد مزود الخدمة'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='number'
              value={calcProviderDeduction() || 0}
              label='اجمالي المخصوم من المزود'
              disabled={true}
            />
          </Grid.Col>

          <>
            <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
              <TextInput
                type='number'
                name='providerAmount'
                value={form.providerAmount}
                label='قيمة الفاتورة'
                onChange={(e) => {
                  const { value } = e.target
                  setForm({ ...form, providerAmount: value, agentDeduction: (+value + +form.fees).toFixed(2) });
                }
                }
                disabled={innerProps?.show}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
              <TextInput
                width={'30%'}
                type='number'
                name='fees'
                value={form.fees}
                label='تكلفة الخدمة'
                onChange={(e) => {
                  const { value } = e.target
                  setForm({ ...form, fees: value, agentDeduction: (+form.providerAmount + +value).toFixed(2) });
                }}
                disabled={innerProps?.show}
              />
            </Grid.Col>
          </>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='number'
              name='agentDeduction'
              label='المخصوم من المركز'
              disabled={innerProps?.show || !innerProps?.data ? true : false}
              value={!innerProps?.data ? (+form.providerAmount + +form.fees).toFixed(2) : form.agentDeduction}
              onChange={(e) =>
                onChange(e)
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
            <TextInput
              type='number'
              name='agentRevenue'
              label='عمولة المركز'
              value={form.agentRevenue}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              type='number'
              label='اجمالي المخصوم من المركز'
              value={innerProps?.data ? (+form.agentDeduction - +form.agentRevenue).toFixed(2) : ((+form.providerAmount + +form.fees) - form.agentRevenue).toFixed(2)}
              disabled
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
            <Stack>
              <Radio
                label="الاجمالى"
                icon={CheckIcon}
                name='total'
                onChange={() => setForm({ ...form, isTotalRevenue: true })}
                checked={form.isTotalRevenue === true}
                disabled={innerProps?.show || innerProps?.data ? true : false}
              />
              <Radio
                label="المخصوم من مزود الخدمة"
                icon={CheckIcon}
                name='total'
                onChange={() => setForm({ ...form, isTotalRevenue: false })}
                checked={form.isTotalRevenue === false}
                disabled={innerProps?.show || innerProps?.data ? true : false}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='number'
              label='رسوم أخري'
              name='additionalFees'
              value={form.additionalFees}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <TextInput
              type='number'
              label='عمولة أخري'
              name='additionalRevenue'
              value={form.additionalRevenue}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6 }}>
            <TextInput
              type='text'
              value={innerProps?.data?.profit || calcProfit()}
              label='الربح'
              onChange={(e) => onChange(e)}
              disabled={true}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6 }}>
            <TextInput
              type='text'
              name='note'
              value={form.note}
              label='ملحوظة'
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show}
            />
          </Grid.Col>
        </Grid>
        {balance.before && !innerProps?.show && <div className="balance">
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
            <List.Item>
              <Group gap={6}>
                <Text>
                  رصيد بعد
                </Text>
                <Text fw={'bold'} color='red'>
                  <NumberFormatter thousandSeparator value={calcBalancAfter()} />
                </Text>
              </Group>
            </List.Item>
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
              {status === "edit" ? "تعديل" : "حفظ"}
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
  )
}
