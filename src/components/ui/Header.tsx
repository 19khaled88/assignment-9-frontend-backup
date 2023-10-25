import { AuthTokenKey } from '@/constants/tokenKey';
import { removeUserInfo } from '@/redux/services/authService';
import { Layout,Button } from 'antd';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Header:AntHeader } = Layout;
const Header = () => {
    const rouer = useRouter()
    const logOut=()=>{
        removeUserInfo(AuthTokenKey)
        rouer.push('/login')
    }
  return (
    <AntHeader style={{display:'flex',flexDirection:'row',justifyContent:'end',alignItems:'center'}}>
        <Button onClick={logOut} style={{float:'right'}}>Logout</Button>
        <ToastContainer />
    </AntHeader>
  )
}

export default Header