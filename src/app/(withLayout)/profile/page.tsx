'use client'

import { useUserProfileQuery } from "@/redux/api/authApi"
import { getUserInfo } from "@/redux/services/authService"
import { useEffect, useState } from "react"


const Profile = () => {
  const [info, setInfo] = useState({ id: '' })

  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo !== null) {
      const { userId } = userInfo

      setInfo({
        'id': userInfo.userId
      })
    }
  }, [])
  const { data, isLoading } = useUserProfileQuery(info.id)
  if (isLoading) {
    <div>Loading.....</div>
  }
  if (data === undefined) {
    return (
      <div className="w-196 h-96 flex items-center justify-center items-center">
        <h1 className="flex items-center justify-center items-center h-100 w-full text-4xl">
          Loading.....
        </h1>
      </div>
    )
  } else {

    return (
      <div className="w-196 h-96 flex items-center justify-center items-center">
        <h1 className="flex items-center justify-center items-center h-100 w-full text-6xl">Welcome, Mr./Mrs. {data.data.name}</h1>
      </div>
    )
  }


}

export default Profile