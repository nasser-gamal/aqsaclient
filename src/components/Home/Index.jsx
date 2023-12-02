import './home.modules.css';

import depositeImg from '../../assets/icons/deposit.png';
import withdrawImg from '../../assets/icons/withdraw.png';
import transferImg from '../../assets/icons/transfer.png';
import DropDown from './DropDown';
import { useState } from 'react';
import { getCurrentDateTime } from '../../utils/formatDate';
import BankReportTable from './Table';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import Pagination from '../UI/Pagination/Pagination';
import { useEffect } from 'react';
import { useFindAllBankAccountsQuery } from '../../app/features/bankAccount/bankAccountApi';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import { Button, Center, Divider, Flex, Grid, Image, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useGetAllTransactionsQuery } from '../../app/features/transaction/transactionApi';
import { openModal } from '../../app/features/modal/modalSlice';
import FilterSelect from '../UI/FilterSelect/FilterSelect';


export default function Index() {
  const dispatch = useDispatch();

  const { data: bankAccounts, isLoading: getLoading, isFetching: getFetching } = useFindAllBankAccountsQuery({
    limit: 10000,
    sort: '-createdAt',
  });


  const [form, setForm] = useState({
    bankAccount: '',
    startDate: getCurrentDateTime(),
  });


  const nextDay = new Date(getCurrentDateTime());
  nextDay.setDate(nextDay.getDate() + 1);


  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    'date[gte]': getCurrentDateTime(),
  })



  const [balance, setBalance] = useState()

  const [showForm, setShowForm] = useState(false)
  const [skip, setSkip] = useState(true);


  const { data, isLoading, isFetching } = useGetAllTransactionsQuery(features, { skip });

  useEffect(() => {
    if (getLoading || getFetching || isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isFetching, dispatch, getLoading, getFetching, isLoading])



  return (
    <>
      <div className='home'>
        <div style={{
          width: '350px',
          maxWidth: '100%',
          margin: 'auto'
        }}>
          <DropDown
            data={bankAccounts}
            form={form}
            setForm={setForm}
            balance={balance}
            setBalance={setBalance}
            setSkip={setSkip}
            setShowForm={setShowForm}
            features={features}
            setFeatures={setFeatures}
          />
        </div>
        {/* <Divider color={'#8e94a1'} my="lg" label="الاقصي للدفع الالكتروني" labelPosition="center" /> */}
        <Center mt={25} p={'5 0'} bg={'#002d44'} style={{ borderRadius: '10px' }}>
          <Title order={4} fw={'normal'} c={'white'}>
            العمليات
          </Title>
        </Center>
        <Grid justify='center' align='center' m={'15 0 30'}>
          <Grid.Col
            span={{ base: 12, md: 3 }}
          >
            <Button
              className='box'
              w={'100%'}
              h={'100%'}
              bg={'white'}
              c={'black'}
              p={'15 0'}
              disabled={form.bankAccount ? false : true}
              onClick={() =>
                dispatch(
                  openModal({
                    name: 'AddEditDeposit',
                    modalTitle: 'اضافة عميلة ايداع',
                    innerProps: {
                      bankAccount: form.bankAccount,
                      status: 'حفظ',
                    }
                  }))}
            >
              <Stack gap={5} justify='center'>
                <Image
                  h={60}
                  w="auto"
                  src={depositeImg} />
                <Text span size='lg'>
                  ايداع
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 3 }}
          >
            <Button
              className='box'
              w={'100%'}
              h={'100%'}
              bg={'white'}
              c={'black'}
              p={'15 0'}
              disabled={form.bankAccount ? false : true}
              onClick={() =>
                dispatch(
                  openModal({
                    name: 'AddEditWithdraw',
                    modalTitle: 'اضافة عميلة سحب',
                    innerProps: {
                      bankAccount: form.bankAccount,
                      width: '700px',
                      status: 'حفظ',
                    }
                  }))
              }
            >
              <Stack gap={5} justify='center'>
                <Image
                  h={60}
                  w="auto"
                  src={withdrawImg} />
                <Text span size='lg'>
                  سحب
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 3 }}
          >
            <Button
              className='box'
              w={'100%'}
              h={'100%'}
              bg={'white'}
              c={'black'}
              p={'15 0'}
              disabled={form.bankAccount ? false : true}
              onClick={() =>
                modals.openContextModal({
                  modal: 'AddEditTransfer',
                  innerProps: {
                    data: form.bankAccount
                  }
                })
              }
            >
              <Stack gap={5} justify='center'>
                <Image
                  h={60}
                  w="auto"
                  src={transferImg} />
                <Text span size='lg'>
                  تسوية
                </Text>
              </Stack>
            </Button>
          </Grid.Col>
        </Grid>


        {
          showForm && data &&
          <>
            <Divider my="sm" variant="dashed" />
            <Center m={'20 0'}>
              <Title order={3} fw={'normal'}>
                تقرير شامل
                بتاريخ
                <Text span size='xl' c={'red'} fw={'bold'} display={'inline'} m={'0 5'}>
                  {form.startDate.replaceAll('-', '/')}
                </Text>
              </Title>

            </Center>

          </>
        }
        {showForm && data && data?.data.length > 0 &&
          <>
            <Flex justify={'space-between'}>

              <FilterSelect features={features} setFeatures={setFeatures} />
              <LimitSelect
                features={features}
                setFeatures={setFeatures}
              />
            </Flex>
            <BankReportTable
              data={data?.data}
              reports={data?.meta}
            />
            {data?.meta?.pagination?.hasPagination &&
              <Pagination
                features={features}
                setFeatures={setFeatures}
                pagination={data?.meta?.pagination}
              />
            }
          </>
        }
        {
          showForm && data && data?.data?.length < 1 &&
          <>
            <Center m={'20 0'}>
              <Text size='xl'>
                لا يوجد أي عمليات علي الحساب في هذه الفترة
              </Text>
            </Center>
          </>
        }

      </div>
    </>
  )
}


