'use client'
import { useAllBookingsQuery } from '@/redux/api/bookingApi';
import { Button, Table, TableColumnGroupType } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
const BookingList = () => {
    const query: Record<string, any> = {}
    const [allBooking, setAllBooking] = useState([])
    // const [test, setTest] = useState<Record<string,unknown> | never[]>([])
    const [test, setTest] = useState<Record<string, unknown> | never[]>([])
    const [size, setSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    query['limit'] = size;
    query['page'] = page
    query['sortBy'] = sortBy
    query['sortOrder'] = sortOrder


    const { data: bookings, isLoading, isError, isFetching, error, isSuccess, refetch } = useAllBookingsQuery({ ...query })

    // console.log(error)
    // if(error &&error.users.status ===500 ){
    //     toast(error.users.data.message)
    // }

    //  console.log(allBooking)



    // useEffect(() => {
    //     if (bookings && bookings !== undefined && bookings !== null) {
    //         let array = bookings?.data[0]

    //         let newObject: Record<string, unknown> = {}

    //         for (let k in array) {
    //             if (typeof array[k] === 'string') {
    //                 newObject[k] = array[k]
    //             } else if (typeof array[k] === 'object') {
    //                 newObject = { ...newObject, ...array[k] }
    //             }
    //         }
    //         setTest(newObject)

    //     }
    // },[bookings,isLoading, bookings.data])


    useEffect(() => {
        if (!isLoading) {
            setAllBooking(bookings?.data)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, bookings, bookings?.data])
    // :(TableColumnGroupType<never> | TableColumnsType<never>)[]
    const columns: (TableColumnGroupType<never> | ColumnType<never>)[] = [
        {
            title: 'Customer',
            dataIndex: 'user',
            key: 'user.name',
            render: (item: Record<string, string>) => Object.values(item)[0]
        },
        {
            title: 'Turf',
            dataIndex: 'turf',
            key: 'turf.name',
            render: (item: Record<string, string>) => Object.values(item)[0]
        },
        {
            title: 'Field_code',
            dataIndex: 'field',
            key: 'field.code',
            render: (item: Record<string, string>) => Object.values(item)[0]
        },
        {
            title: 'Game-type',
            dataIndex: 'gameType',
            key: 'gameType.name',
            render: (item: Record<string, string>) => Object.values(item)[0]
        },
        {
            title: 'Start-time',
            dataIndex: 'start_time',
            key: 'start_time'
        },
        {
            title: 'End-time',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: 'Payment_Status',
            dataIndex: 'payment_status',
            key: 'payment_status'
        },
        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Button onClick={() => console.log(data)} type='primary'>Change</Button>
                        <Button onClick={() => console.log(data)} type="primary" danger>Cancel</Button>
                    </div>
                )
            }
        }
    ]

    const onPageSizeChange = (page: number, pageSise: number) => {
        console.log(page, pageSise)
        setPage(page)
        setSize(pageSise)
    }

    const onTableChange = (pagination: any, filter: any, sorter: any) => {
        const { order, field } = sorter
        setSortBy(field as string)
        setSortOrder(order === 'ascend' ? 'asc' : 'desc')
    }
    const paginationConfig = {
        pageSize: 5,
        total: 6,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: true,
        onChange: onPageSizeChange
    }
    return <Table
        loading={isLoading}
        rowKey='id'
        dataSource={allBooking}
        columns={columns}
        pagination={paginationConfig}
    />
}

export default BookingList