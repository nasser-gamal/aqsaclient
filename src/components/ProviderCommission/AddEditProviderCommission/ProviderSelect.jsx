/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import CustomSelect from '../../common/FormFields/Select/CustomSelect';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useFindAllProvidersQuery } from '../../../app/features/provider/providerApi';

export default function ProviderSelect({ form, setForm }) {
  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر المزود');

  const { data, isLoading } = useFindAllProvidersQuery({ page: '', limit: '', order: 'createdAt', sort: 'ASC' });
  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const filterSelectOptions = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  useEffect(() => {
    const providers = data?.provider?.provider.filter(provider => provider.id == form.providerId);
    if (providers && providers.length > 0) {
      setDropHeading(providers[0]?.name);
      setForm({ ...form, providerId: providers[0]?.id });
    }
  }, [data?.provider, data])


  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'اختر المزود'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        setIsClicked(!isClicked)
      }}
    >
      {
        data?.provider?.provider.filter(provider => {
          const value = searchValue;
          return value ? provider.name.includes(value.toLowerCase()) : provider;
        }).map(provider => {
          return <li
            key={provider.id}
            onClick={() => {
              setDropHeading(provider.name);
              setIsClicked(!isClicked);
              setForm({ ...form, providerId: provider.id })
            }}
          >
            {
              provider.name
            }
          </li>
        })
      }
    </CustomSelect>
  )
}
