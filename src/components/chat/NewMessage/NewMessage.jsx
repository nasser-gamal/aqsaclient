import CustomInput from "../../common/FormFields/input/CustomInput";
import { IoSend } from 'react-icons/io5'
export default function NewMessage() {
  return (
    <footer className="footer" style={{
      borderTop: '1px solid #61616124',
      marginRight: '361px',
      padding: '0 10px'
    }}>
      <form>
        <div style={{display:'flex', gap: '10px', alignItems: 'center'}}>
          <CustomInput
            type='text'
            width={'94%'}
            height={'40px'}
            name={'content'}
            placeholder={'اكتب رسالتك هنا...'}
          // value={form.content}
          // onChange={(e) => onChange(e)}
          />
          <button style={{ color: 'black', fontSize:'30px' , transform: 'rotate(180deg)', display:"flex"}} type="submit">
            <IoSend />
          </button>
        </div>
      </form>
    </footer>
  )
}
