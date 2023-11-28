/* eslint-disable react/prop-types */
import { Button, CloseButton, Group, NativeSelect, TextInput } from '@mantine/core'
import { useState } from 'react'


export default function Search({ options, features, setFeatures }) {

  const [searchBy, setSearchBy] = useState(options[0].value);
  const [keyword, setKeyword] = useState('');

  const onClick = () => {
    setFeatures({ ...features, [searchBy]: keyword.trim() });
    console.log(features)
    console.log(searchBy)
  }

  return (
    <Group gap={5}>
      <NativeSelect
        defaultValue={options[0]}
        data={options}
        onChange={(e) => setSearchBy(e.target.value)}
      />
      <TextInput m={'10 0'}
        type='text'
        placeholder='ابحث هنا...'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => {
              setKeyword('')
              // setFeatures({ ...features })

              // Create a copy of the features state
              const updatedFeatures = { ...features };

              // Remove the key associated with the current searchBy value
              delete updatedFeatures[searchBy];

              // Update the features state with the modified object
              setFeatures(updatedFeatures);
            }}
            style={{ display: keyword ? undefined : 'none' }}
          />
        }
      />
      <Button
        disabled={keyword == '' ? true : false}
        type='button'
        onClick={onClick}>
        بحث
      </Button>
    </Group>
  )
}
