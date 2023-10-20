'use client'
import { getUserInfo } from "@/redux/services/authService"
import { Input } from "antd"
const page = () => {
  const userInfo = getUserInfo()
  

  return (
    <div>
      <div>
        <span>
          <label>Name</label>
          <Input value={'khaled'} placeholder="Basic usage" />
        </span>
      </div>
    </div>
  )
}

export default page