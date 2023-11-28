import { useState } from 'react';
import { useFindAllUsersQuery } from '../../../app/features/user/userApi';
import FormButtons from '../../UI/FormButtons/FormButtons'
import CustomInput from '../../common/FormFields/input/CustomInput'
import './newGroup.css'
export default function AddNewGroup() {

  const [form, setForm] = useState({
    chatName: '',
    users: []
  });

  const { data } = useFindAllUsersQuery();


  const choosenUser = (userId) => {
    let users = [...form.users];

    const findIndex = users.findIndex(user => user == userId)

    if (findIndex >= 0) {
      users = users.filter(user => user !== userId)
    } else {
      users.push(userId);
    }
    setForm({ ...form, users })
  }

  return (
    <div className="new-group">
      <form>
        <CustomInput
          width={'100%'}
          type='text'
          name='chatName'
          value={form.chatName}
          label='اسم الجروب'
          onChange={(e) => setForm({ ...form, chatName: e.target.value })}
        />
        <div className="new-users">
          <h5 style={{ padding: '5px 0' }}>
            اختر اعضاءالجروب
          </h5>
          <ul className='users'>
            {
              data?.users.map(user => {
                return <li
                  className={form.users.includes(user.id) ? 'active' : ''}
                  key={user.id}
                  onClick={() => choosenUser(user.id)} >
                  {user.userName}
                </li>
              })
            }
          </ul>
        </div>
        <FormButtons />
      </form>
    </div>
  )
}
