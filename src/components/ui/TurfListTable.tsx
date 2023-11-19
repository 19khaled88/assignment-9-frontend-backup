'use client'
import { useAllTurfsQuery, useDeleteTurfWithIdMutation, useEditTurfMutation } from '@/redux/api/TurfApi'
import { Button, Table } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const TurfListTable = () => {
    const query: Record<string, any> = {}
    const [allTurf, setAllTurf] = useState([])
    const [size, setSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    const [editId, setEditId] = useState('')
    query['limit'] = size;
    query['page'] = page
    query['sortBy'] = sortBy
    query['sortOrder'] = sortOrder

    const { data: turfs, isLoading } = useAllTurfsQuery({ ...query })
    const [deleteTurf, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteTurfWithIdMutation()
    const [updateTurf, { isLoading: editloading, isSuccess: editSuccess }] = useEditTurfMutation()

    const [inputsValue, setValues] = useState({
        name: '',
        location: '',
        owner: '',
        imgurl: ''
    })

    

    useEffect(() => {
        if (!isLoading) {
            setAllTurf(turfs?.data.data)
        }
    }, [isLoading, turfs?.data.data])

    //delete turf
    const deleteTurfHandler = async (id: string) => {
        await deleteTurf(id)

    }

    if (deleteSuccess === true) {
        toast.success('turf deleted successfully')
    } else if (deleteError === true) {
        toast.error('Not deleted!')
    }

    const showEditTurf = (mod: any, note: any) => {
        (document.getElementById(mod) as HTMLFormElement).showModal();
        setValues({
            ...inputsValue,
            name: note.name,
            location: note.location,
            owner: note.owner,
            imgurl: note.imgurl
        })
        setEditId(note.id)
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setValues({
            ...inputsValue,
            [name]: value
        })
    }

    const closeAndCleanForm = () => {
        (document.getElementById("cleanUpdateFormData") as HTMLFormElement).reset();
        setValues({ name: '', location: '', owner: '', imgurl: '' });
    }

    const submitHandler = async () => {
        const id = editId
        const res = await updateTurf({ id, ...inputsValue })
        console.log(res)
    }

    //update turf
    const updateTurfHandler = (info: any) => {
        console.log(info)
        const id = info.id
        const editableData = {}
        // updateTurf({id, ...editableData})
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner'
        },
        {
            title: 'Image',
            // dataIndex: 'image',
            // key: 'image',
            render: (data: any) => {
                return (

                    <Image src={data.imgurl} alt='No turf Image' width={100} height={100} />


                )
            }
        },
        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Button onClick={() => showEditTurf('my_modal_3', data)} type='primary'>update</Button>
                        <Button onClick={() => deleteTurfHandler(data.id)} type="primary" danger>delete</Button>
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
    return (
        <>
            <dialog id="my_modal_3" className={`modal mx-auto my-auto rounded-md shadow-2xl`} style={{ width: '500px' }}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center pt-10 ">Update Turf</h3>
                </div>
                <form method="dialog" id="cleanUpdateFormData" className="modal-backdrop flex flex-col mx-auto w-2/3 gap-2 pb-10">
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['name']} id="small-input" name="name" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['location']} id="small-input" name="location" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        <p id="locationError"></p>
                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['owner']} id="small-input" name="owner" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        <p id="ownerError"></p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <button
                            onClick={() => submitHandler()}
                            type="button"
                            // type='submit'
                            className="btn bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-1/2 text-white">Update</button>

                        {/* <button type="button" onClick={() => closeAndCleanForm('my_modal_2')} className="btn bg-red-400 px-4 py-2 text-white hover:bg-red-500 rounded-md w-fit">Close</button> */}
                        <button onClick={() => closeAndCleanForm()} className="btn">Close</button>
                    </div>
                </form>
            </dialog>
            <Table
                loading={isLoading}
                rowKey='id'
                dataSource={allTurf}
                columns={columns}
                pagination={paginationConfig}
            />
        </>
    )

}

export default TurfListTable