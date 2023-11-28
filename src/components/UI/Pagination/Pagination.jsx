/* eslint-disable react/prop-types */
import { Flex, Group, Pagination, Text } from "@mantine/core";



export default function CustomPagination({ pagination, features, setFeatures }) {
  return (
    <Flex
      Flex justify="space-between"
      align={'center'}
      m={'10px 0'}
    >
      <Group gap={6}>
        <Text size={'sm'}>
          اجمالي البيانات
        </Text>
        <Text size={'sm'}>
          {pagination?.totalItems}
        </Text>
      </Group>
      {pagination?.hasPagination && <Pagination
        value={pagination?.page}
        total={Math.ceil(pagination?.totalItems / pagination?.limit)}
        siblings={2}
        defaultValue={1}
        onChange={(value) => setFeatures({ ...features, page: value })}
      />}
    </Flex>
  )
}
