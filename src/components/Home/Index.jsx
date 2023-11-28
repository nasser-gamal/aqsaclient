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
import { Button, Center, Divider, Flex, Grid, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useGetAllTransactionsQuery, useGetTransactionAggregationsQuery } from '../../app/features/transaction/transactionApi';


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



  // const [balance, setBalance] = useState()

  const [showForm, setShowForm] = useState(false)
  const [skip, setSkip] = useState(true);


  const { data, isLoading, isFetching } = useGetAllTransactionsQuery(features, { skip });
  const { data: transactionReports, isLoading: reportsLoading } = useGetTransactionAggregationsQuery(features, { skip });

  useEffect(() => {
    if (getLoading || getFetching || isLoading || reportsLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [reportsLoading, isFetching, dispatch, getLoading, getFetching, isLoading])



  return (
    <>
      <div>
        <div style={{
          width: '350px',
          maxWidth: '100%',
          margin: 'auto'
        }}>
          <DropDown
            data={bankAccounts}
            form={form}
            setForm={setForm}
            // setBalance={setBalance}
            setSkip={setSkip}
            setShowForm={setShowForm}
            features={features}
            setFeatures={setFeatures}
          />
        </div>
        <Divider color={'#8e94a1'} my="lg" label="الاقصي للدفع الالكتروني" labelPosition="center" />

        <Grid justify='center' align='center' m={'25 0 30'}>
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
              onClick={() => {
                // refetch()
                modals.openContextModal({
                  modal: 'AddEditDeposit',
                  title: 'أضافة ايداع جديد',
                  innerProps: {
                    bankAccount: form.bankAccount,
                  }
                })
              }
              }
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
                modals.openContextModal({
                  modal: 'AddEditWithdraw',
                  title: 'أضافة سحب جديد',
                  innerProps: {
                    bankAccount: form.bankAccount
                  }
                })
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
              <Group>
                <Paper>
                  الايداع {transactionReports?.data?.depositCount}
                </Paper>
                <Paper>
                  السحب {transactionReports?.data?.withdrawalCount}
                </Paper>
              </Group>
              <div style={{
                width: '80px',
              }}>
                <LimitSelect
                  features={features}
                  setFeatures={setFeatures}
                />
              </div>
            </Flex>
            <BankReportTable
              data={data?.data}
              reports={transactionReports?.data}
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


