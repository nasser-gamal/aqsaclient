
import { ToastContainer } from "react-toastify";
import Portal from "../../../utils/Portal";


function ResponseMsg() {
  return (
    <Portal>
      <ToastContainer
        position="bottom-left"
        // limit={1}
        rtl
        theme="dark"
      />
    </Portal>
  )
}

export default ResponseMsg;
