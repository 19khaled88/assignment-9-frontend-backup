import { useCreateBookingMutation } from '@/redux/api/bookingApi';
import { useAllOffersQuery } from '@/redux/api/offerApi';
import { decodedToken } from '@/utils/jwt';
import { getTokenFromLocalStorage } from '@/utils/localstorage';
import { Button, Input, Select, Space } from 'antd';
import AOS from 'aos';
import { format } from 'date-fns';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import styles from '../../css/offer.module.css';

const OfferPage = () => {
    const ref = useRef(null)
    const router = useRouter()
    const isInView = useInView(ref)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userId, setUserId] = useState('')
    const [bookingData, setBookingData] = useState({
        "id": "",
        "start_time": "",
        "end_time": "",
        "gameOfferId": "",
        "userId": "",
        "turfId": "",
        "fieldId": "",
        "gameTypeId": "",

    })

    useEffect(() => {
        AOS.init({
            delay: 30,
            duration: 400,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
            offset: 120,
            debounceDelay: 50,
            throttleDelay: 99
        });
        AOS.refresh();
    }, [isInView]);
    const options = [
        {
            // value: 'zhejiang',
            // label: 'Zhejiang',
        },
        // {
        //     value: 'jiangsu',
        //     label: 'Jiangsu',
        // },
    ];
    const query: Record<string, any> = {}
    const { data: offers, isLoading, isError, error } = useAllOffersQuery({ ...query })
    const [createBooking, { error: bookingError, isLoading: bookingLoading }] = useCreateBookingMutation();
    // const format = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''

    console.log(offers)
    
    const showBookingHandler = (item: any, mod: any) => {
        const token = getTokenFromLocalStorage('validateToken')
        const userInfo = token != null && decodedToken(token)
        if (userInfo === false || userInfo === undefined || userInfo === null) {
            router.push('/login')
            toast('User not logged in!!')
        } else if (userInfo.role === 'ADMIN' || userInfo.role === 'SUPER_ADMIN') {
            toast.info('Only customer or user can book')
        } else {
            (document.getElementById(mod) as HTMLFormElement).showModal()
            setUserId(userInfo.userId)
            setBookingData(item)
        }
    }

    const bookingHandler = async () => {
        // const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
        const start_time = (format(startDate, "yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'"))
        const end_time = (format(endDate, "yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'"))

        const store = {
            "start_time": start_time,
            "end_time": end_time,
            "gameOfferId": bookingData?.id,
            "userId": userId,
            "turfId": bookingData?.turfId,
            "fieldId": bookingData?.fieldId,
            "gameTypeId": bookingData?.gameTypeId
        }
        

        try {
            const res = await createBooking({ ...store }).unwrap();
            // console.log(res)
            if (res) {
                toast.success('booking completed')
            }
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.data?.message)
        }
    }


    const showOffers = (offers: any): ReactNode => {
        let array: any[] = []
        offers != undefined && offers?.data.map((item: any, index: number) => {
            array.push(
                <div key={index} className={`${styles.hoverItem} max-w-sm p-6 w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
                    <div data-aos="fade-up">
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text">Turf : {item.turfId
                        }</h5>
                        <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Location : Fields : {item.fieldId}</p>
                        <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Game : {item.gameTypeId}</p>
                        <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Pay per hour : {item.price_per_hour} {'\u09f3'}</p>
                        <button
                            className="btn inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                        text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => showBookingHandler(item, 'my_modal_1')}>
                            Book
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                        <dialog id="my_modal_1" className="modal mx-auto">
                            <div className="modal-box pb-10 pt-5 pr-10 pl-10 m-5 w-96 h-96 relative">
                                <h3 className="font-bold text-lg ">Select game onboard date</h3>
                                <div className="modal-action">
                                    <form method="dialog" className='flex flex-col'>
                                        <div className='flex flex-row justify-between'><label>Start Time</label>
                                            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} showTimeSelect dateFormat="Pp" /></div>
                                        <div className='flex flex-row justify-between'><label>End Time</label>
                                            <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} showTimeSelect dateFormat="Pp" /></div>
                                        <div className='absolute -bottom-4 right-5 flex flex-row gap-4'>
                                            <button onClick={() => bookingHandler()} className="btn btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">Submit</button>
                                            <button className="btn btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg">Closes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>
            )
        })
        return array
    }

   

    if (isLoading) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center ">
                <h1 className="text-center py-5 text-2xl font-bold text-gray-500">Book you slot here</h1>
                <div role="status" className="max-w-sm animate-pulse ">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    } else if (offers === undefined) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center ">
                <h1 className="text-center py-5 text-2xl font-bold text-gray-500">Book you slot here</h1>
                <div role="status" className="max-w-sm animate-pulse ">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col pt-10 justify-items-center justify-center relative">
            <h1 ref={ref} data-aos="zoom-in" className="text-center py-5 text-2xl font-bold text-gray-500" >Book you slot here</h1>
            <Space className="my-6">
                <Space.Compact className="absolute inset-x-0 w-3/4 md:w-2/3  lg:w-1/2 mx-auto xl:w-1/3 xl:mr-10 top-24">
                    <Select className="text-lg" style={{ height: '40px' }} defaultValue="All criteria" options={options} />
                    <Input defaultValue="Search for available slot" style={{ height: '40px', width: '100%' }} />
                    <Button className="bg-blue-500 text-white text-lg" style={{ height: '40px' }}>Submit</Button>
                </Space.Compact>
            </Space>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center justify-center shadow-2xl mx-10 p-10 rounded-md">

                {
                    showOffers(offers)
                }
            </div>
        </div>
    )
}

export default OfferPage