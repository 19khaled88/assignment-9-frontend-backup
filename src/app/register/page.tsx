'use client'
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from 'react-spinners/PropagateLoader'
import FormInput from '@/form/formInput'
import ReactForm from '@/form/hookForm'
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler } from "react-hook-form"
import SignUpImage from '../../../public/Sign up.svg'
import { useUserRegisterMutation } from '@/redux/api/authApi'
import { isLoggedIn, storeUserInfo } from '@/redux/services/authService'
import styles from '../../css/formInput.module.css'

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const RegisterPage = () => {
    const router = useRouter()
    const [userRegister, { error, isSuccess, isError, isLoading }] = useUserRegisterMutation()
    type FormValues = {
        email: string;
        password: string;
        token: string;
        location: string;
        address: string;
        contactNo: string;
    }

    const userLoggedIn = isLoggedIn()
    if (userLoggedIn) {
        router.push('/profile')
    }

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {


        try {
            const res = await userRegister({ ...data }).unwrap()
            if (!res || res === undefined) {
                router.push('/register')
            }

            if (res && res.token) {
                storeUserInfo({ token: res?.token })
                router.push('/profile')
            }

            if (res && res.statusCode === 200 && res.success === true) {
                toast.success(res.message)
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            }
            
        } catch (error: any) {
            // console.log(error)
            console.log(error)
            toast.error(error?.data.data)
        }
    }

    if (isLoading) {
        return (

            <div className="w-full h-screen flex flex-row justify-center items-center">
                {" "}
                {/* <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> */}
                <PropagateLoader
                    color="#36d7b7"
                    cssOverride={override}

                />
            </div>

        );
    }
    return (
        <div className='w-full'>
            <ToastContainer />
            <Row style={{ width: '95%', height: '100vh', margin: 'auto' }}>
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} xs={2} sm={12} md={16} lg={16} xl={14}>
                    <Image style={{}} src={SignUpImage} alt='No Image' height={500} width={500} />
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '20px' }} xs={20} sm={12} md={8} lg={8} xl={10}>
                    <h1 className='text-2xl font-bold'>Sign Up Form</h1>

                    <ReactForm submitHandler={onSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div >
                                <FormInput name="name" type="text" label='Name' required />
                                <FormInput name='email' type='text' label='Email' required />
                                <FormInput name='password' type='password' label='Password' required />
                                <FormInput name='location' type='text' label='Location' required />
                                <FormInput name='address' type='text' label='Address' required />
                                <FormInput name='contactNo' type='number' label='Contact No' required />
                            </div>
                            <Button style={{ fontSize: '20px', height: '40px' }} type='primary' htmlType='submit'>
                                Register
                            </Button>
                        </div>
                    </ReactForm>
                    <div>
                        <h2>Have Account</h2>
                        <Button onClick={() => router.push('/login')} type='primary'>
                            Go Login
                        </Button>
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default RegisterPage