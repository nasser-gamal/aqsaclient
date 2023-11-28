/* eslint-disable react/prop-types */
import { Button } from '@mantine/core'
import { IconDownload, } from '@tabler/icons-react';

export default function ExportButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      radius={5}
      size='sm'
      rightSection={<IconDownload size={14} />}
    >
      تصدير
    </Button>
  )
}
