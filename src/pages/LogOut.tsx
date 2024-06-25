import UnderConstruction from '../components/UnderConstruction'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { postLogOut } from '../api/postLogOut'

export default function LogOut() {
  const{auth, setAuth} = useContext(AuthContext)
  const token = auth?.token || ""
  localStorage.removeItem("url_sharing_token")
  postLogOut({token})
  setAuth(null)
  return (
    <UnderConstruction />
  )
}
