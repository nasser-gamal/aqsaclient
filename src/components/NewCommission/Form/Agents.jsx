/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomSelect from "../../common/FormFields/Select/CustomSelect";
import { useFindAllAgentsQuery } from "../../../app/features/user/agentApi";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";

export default function Agents({ form, setForm }) {
  const dispatch = useDispatch()

  const [dropHeading, setDropHeading] = useState()
  const [isClicked, setIsClicked] = useState(false);

  const { data, isLoading } = useFindAllAgentsQuery();
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    setUsers(data?.users)
  }, [data]);


  // const filterSelectOptions = (e) => {
  //   const value = e.target.value;
  //   const filteredOptions = users.filter(user => {
  //     return user.userName.includes(value);
  //   });
  //   setUsers(filteredOptions)
  // }


  const handleChange = (agentId) => {
    setForm({ ...form, agentId })
  }

  return (
    <div style={{
      width: "400px",
      maxWidth: "100%",
      margin: "auto",
    }}>
      <CustomSelect
        // searchInput={true}
        // onChange={(e) => filterSelectOptions(e)}
        dropHeading={dropHeading}
        label={'اختر العميل'}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        onClick={() => setIsClicked(!isClicked)}
      >
        {
          users?.map(user => {
            return <li
              key={user.id}
              onClick={() => {
                setDropHeading(user.userName)
                setIsClicked(!isClicked);
                handleChange(user.id);
              }}
            >
              {user.userName}
            </li>
          })
        }
      </CustomSelect>
    </div>
  )
}
