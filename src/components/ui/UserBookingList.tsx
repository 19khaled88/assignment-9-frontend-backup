'use client'
import { useAllBookingsQuery, useDeleteBookingMutation } from '@/redux/api/bookingApi';
import { decodedToken } from '@/utils/jwt';
import { getTokenFromLocalStorage } from '@/utils/localstorage';
import { Button, Table, TableColumnGroupType } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type tokenType = {
    token: string
}
const UserBookingList = () => {
    const query: Record<string, any> = {}
    const [allBooking, setAllBooking] = useState([])


    const [test, setTest] = useState<Record<string, unknown> | never[]>([])
    const [size, setSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    query['limit'] = size;
    query['page'] = page
    query['sortBy'] = sortBy
    query['sortOrder'] = sortOrder

    // all bookings
    const { data: bookings, isLoading, isError, isFetching, error, isSuccess, refetch } = useAllBookingsQuery({ ...query })
  
    //delete booking
    const [deleteBooking,{isLoading:bookingDeleteLoading}] = useDeleteBookingMutation()


    const deleteHandler=async(data:any)=>{
        
        try {
            const response =await deleteBooking(data.id).unwrap()
            if(response.statusCode === 200 && response.success === true){
                toast.success(response.message)
            }
        } catch (error) {
            toast.error('Something went wrong!!')
        }
    }


    useEffect(() => {
        if (!isLoading) {
            setAllBooking(bookings?.data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, bookings?.data])
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
                      
                        <Button onClick={() => deleteHandler(data)} type="primary" danger>Cancel</Button>
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

export default UserBookingList