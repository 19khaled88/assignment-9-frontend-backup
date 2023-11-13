'use client'
import { useUserProfileQuery, useUserUpdateMutation } from "@/redux/api/authApi"
import { getUserInfo } from "@/redux/services/authService"
import { Button, Form, Input } from 'antd'
import { CSSProperties, useEffect, useState } from "react"
import PropagateLoader from 'react-spinners/PropagateLoader';
import { toast } from 'react-toastify'


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const AdminPage = () => {
  const [form] = Form.useForm()
  const [info, setInfo] = useState({ id: "" })
  const [emailError, setEmailError] = useState('');
  const { id } = info


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
      <div
        className={`text-2xl flex flex-row h-80 justify-center items-center shadow-2xl mx-10 p-10 rounded-md`}
      >
        <PropagateLoader
          color="#36d7b7"
          cssOverride={override}

        />
      </div>
    )
  } else if (data !== undefined && isLoading === false) {
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
export default AdminPage