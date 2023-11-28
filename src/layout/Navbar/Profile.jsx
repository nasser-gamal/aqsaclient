import { useSelector } from "react-redux"
import { Avatar, Flex, Indicator, Text } from "@mantine/core";

export default function Profile() {
  const { user } = useSelector(state => state.user)

  return (
    <Flex gap={10} align={'center'}>
      <Text span  c={'white'} >{user?.userName} </Text>
      <Indicator inline size={16} disabled={true} offset={7} position="bottom-end" color="red" withBorder>
        <Avatar
          size="md"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
        />
      </Indicator>
    </Flex>
  )
}
