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


  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (categoriesLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [categoriesLoading, dispatch]);


  useEffect(() => {
    setCategories(data?.categories)
  }, [data]);


  const filterSelectOptions = (e) => {
    const value = e.target.value;
    const filteredOptions = categories.filter(category => {
      return category.name.includes(value);
    });
    setCategories(filteredOptions)
  }



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
        categories?.map(category => {
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
