/* eslint-disable react/prop-types */

import { Table, Text } from '@mantine/core'
export default function CustomTable({ theads, rows, tFoot, props }) {

  const ths = (
    <Table.Tr >
      {
        theads?.map((thead, index) => {
          return <Table.Th p={'10 0'} key={index}>{thead.title}</Table.Th>
        })
      }
    </Table.Tr>
  )

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover  withColumnBorders>
        <Table.Thead  c='white' bg={'#0f4662'}>{ths}</Table.Thead>
        <Table.Tbody>
          {!rows || rows?.length < 1 ?
            <Table.Tr>
              <Table.Td colSpan={20} style={{ textAlign: 'center' }} p={'20 0'} >
                <Text size='lg'>
                  لا يوجد بيانات
                </Text>
              </Table.Td>
          </Table.Tr>
            :
            rows
          }
        </Table.Tbody>
        {
          tFoot && <Table.Tfoot bg={'#45829d'} c={'white'} {...props}>{tFoot}</Table.Tfoot>
        }
      </Table>
    </Table.ScrollContainer>
  )
}
