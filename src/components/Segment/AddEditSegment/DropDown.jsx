/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import CustomSelect from '../../common/FormFields/Select/CustomSelect';
import { useDispatch } from 'react-redux';
import { useFindAllCategoriesQuery } from '../../../app/features/category/categoryApi';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function DropDown({ form, setForm }) {
  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الخدمة');

  const { data, isLoading: categoriesLoading } = useFindAllCategoriesQuery();

  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    if (categoriesLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [categoriesLoading, dispatch]);



  const filterSelectOptions = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }



  useEffect(() => {
    const service = data?.categories?.filter(category => category.id == form.serviceId);
    if (service && service.length > 0) {
      setDropHeading(service[0]?.name);
      setForm({ ...form, serviceId: service[0]?.id });
    }
  }, [data?.categories, data])

  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'اختر الخدمة'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => setIsClicked(!isClicked)}
    >
      {
        data?.categories?.filter(category => {
          const value = searchValue;
          return value ? category.name.includes(value.toLowerCase()) : category;
        }).map(category => {
          return <li
            key={category.id}
            onClick={() => {
              setDropHeading(category.name);
              setIsClicked(!isClicked);
              setForm({ ...form, serviceId: category.id })
            }}
          >
            {
              category.name
            }
          </li>
        })
      }
    </CustomSelect>
  )
}
