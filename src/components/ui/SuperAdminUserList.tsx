'use client'
import { useAllUserQuery, useUserUpdateMutation } from '@/redux/api/authApi'
import { Button, Select, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const SuperAdminUserListTable = () => {
    const query: Record<string, any> = {}
    const [allUser, setAllUser] = useState([])
    const [size, setSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    query['limit'] = size;
    query['page'] = page
    query['sortBy'] = sortBy
    query['sortOrder'] = sortOrder


    //all user
    const { data: users, isLoading } = useAllUserQuery({ ...query })
 
    // user update
    const [userUpdate,{isLoading:userUpdateLoading,error,isSuccess}] = useUserUpdateMutation()
    
    useEffect(() => {
        if (!isLoading) {
            setAllUser(users?.data.data)
        }
    }, [isLoading, users?.data.data])


    const changeHandler = async (value: any) => {

        try {
            const res = value.split(',')

            const id = res[1]
            const info = { role: res[0] }
           
            const response = await userUpdate({ id, ...info }).unwrap()
            if (response.statusCode === 200 && response.success === true) {
                toast.success(response.message)
            }
            
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'ContactNo',
            dataIndex: 'contactNo',
            key: 'contactNo'
        },
        {
            title: 'Roles',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Role',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        {
                            data.role === 'SUPER_ADMIN' ?
                                <Select defaultValue={data.role} disabled>
                                    <Select.Option value={"USER," + data.id}>USER</Select.Option>
                                    <Select.Option value={"ADMIN," + data.id}>ADMIN</Select.Option>
                                    <Select.Option value={"SUPER_ADMIN," + data.id}>SUPER_ADMIN</Select.Option>
                                </Select> :
                                <Select defaultValue={data.role} onChange={changeHandler}>
                                    <Select.Option value={"USER," + data.id}>USER</Select.Option>
                                    <Select.Option value={"ADMIN," + data.id}>ADMIN</Select.Option>
                                    <Select.Option value={"SUPER_ADMIN," + data.id}>SUPER_ADMIN</Select.Option>
                                </Select>
                        }

                    </div>
                )
            }
        },
        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Button onClick={() => console.log(data)} type='primary'>update</Button>
                        <Button type="primary" danger>delete</Button>
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
        dataSource={allUser}
        columns={columns}
        pagination={paginationConfig}
    />
}

export default SuperAdminUserListTable