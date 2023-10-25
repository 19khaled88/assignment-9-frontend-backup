'use client'
import { useUserProfileQuery, useUserUpdateMutation } from '@/redux/api/authApi'
import { getUserInfo } from '@/redux/services/authService'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const UserPage = () => {
  const [form] = Form.useForm()
  const [emailError, setEmailError] = useState('');
  const [info, setInfo] = useState({ id: "" })
  const { id } = info
  // const [data, setData]= useState({})


  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo !== null) {

      setInfo({
        'id': userInfo.userId
      })
    }
  }, [])

  const { data, isLoading } = useUserProfileQuery(id)
  const [updatePost, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUserUpdateMutation()


  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmptyData({
  //     ...emptyData,
  //     [e.target.name]: e.target.value
  //   });
  // }

  const onFinish = (values: any) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (values.email !== undefined && !emailRegex.test(values.email)) {
      setEmailError('Invalid email address');
    } else {
      const emptyData = { ...values }
      updatePost({ id, emptyData })

    }

  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    name?: string;
    email?: string;
    contactNo?: string;
    location?: string;
    address?: string;
  };

  if (updateSuccess === true) {
    toast('Update successful!!')
  }
  if (data === undefined && isLoading === true) {
    return (
      <div>Loading....</div>
    )
  } else if (data !== undefined && isLoading === false)
    return (
      <>
        <Form
          form={form}
          name='nest-messages'
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Name'
            name="name"
            initialValue={data.data.name}
          >
            <Input className='text-base' name='name' />
          </Form.Item>

          <Form.Item<FieldType>
            label='Email'
            name="email"
            initialValue={data.data.email}
          >
            <Input className='text-base' name='email' />
          </Form.Item>
          <Form.Item<FieldType>
            label='Contact No'
            name="contactNo"
            initialValue={data.data.contactNo}
          >
            <Input className='text-base' name='contactNo' />
          </Form.Item>
          <Form.Item<FieldType>
            label='Location'
            name="location"
            initialValue={data.data.location}
          >
            <Input className='text-base' type='text' name='location' />
          </Form.Item>
          <Form.Item<FieldType>
            label='Address'
            name="address"
            initialValue={data.data.address}
          >
            <Input className='text-base' type='text' name='address' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    )
}



export default UserPage