'use client'
import { useAllTurfsQuery } from '@/redux/api/TurfApi'
import { useAllFieldsQuery, useDeleteFieldfWithIdMutation, useEditFieldMutation } from '@/redux/api/fieldApi'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'



const FieldListTable = () => {
    const query: Record<string, any> = {}
    const [allField, setAllField] = useState([])
    const [size, setSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    const [editId, setEditId] = useState('')
    query['limit'] = size;
    query['page'] = page
    query['sortBy'] = sortBy
    query['sortOrder'] = sortOrder

    type fieldsResponseType = {
        statusCode?: string,
        message?: string,
        success?: boolean
    }

    //field list query
    const { data: fields, isLoading } = useAllFieldsQuery({ ...query })

    //delete field query
    const [deleteField, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteFieldfWithIdMutation()

    //edit field query
    const [updateField, { isLoading: editloading, isSuccess: editSuccess }] = useEditFieldMutation()

    //turf list 
    const { data: turfData } = useAllTurfsQuery({ ...query })

    const [inputsValue, setValues] = useState({
        code: '',
        size: '',
        turfId: ''
    })
    const [emptyError, setEmptyError] = useState<Record<string, unknown>>({
        errorName: ''
    })


    useEffect(() => {
        if (!isLoading) {
            setAllField(fields?.data)
        }
    }, [isLoading, fields?.data])

    //delete turf
    const deleteFieldHandler = async (id: string) => {
        try {
            const res = await deleteField(id).unwrap()
            if (res.statusCode === 200 && res.success === true) {
                toast.success(res.message)
            }
        } catch (error: any) {
            toast.error("Not deleted successfully")
        }

    }

    // if (deleteSuccess === true) {
    //     toast.success('Field deleted successfully')
    // } else if (deleteError === true) {
    //     toast.error('Field Not deleted!')
    // }

    const showEditField = (mod: any, note: any) => {
        (document.getElementById(mod) as HTMLFormElement).showModal();
        setValues({
            ...inputsValue,
            code: note.code,
            size: note.size,
            turfId: note.turfId
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
        setValues({ code: '', size: '', turfId: '' });
    }

    const submitHandler = async () => {
       try {
        const id = editId
        const res = await updateField({id,...inputsValue}).unwrap()
        if(res.statusCode === 200 && res.success === true){
            toast.success(res.message)
        }
       } catch (error:any) {
        if(error.status == 400){
            toast.error(error.data.message)
        }
       }
    }

    //update turf
    const updateTurfHandler = (info: any) => {
        console.log(info)
        const id = info.id
        const editableData = {

        }
        // updateTurf({id, ...editableData})
    }

    const columns = [
        {
            title: 'Turf_Id',
            dataIndex: 'turfId',
            key: 'turfId'
        },

        {
            title: 'Field_Size',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: 'Field_Code',
            dataIndex: 'code',
            key: 'code'
        },

        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Button onClick={() => showEditField('my_modal_3', data)} type='primary'>update</Button>
                        <Button onClick={() => deleteFieldHandler(data.id)} type="primary" danger>delete</Button>
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
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turf_Code</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['code']} id="small-input" name="code" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turf_Size</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['size']} id="small-input" name="size" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turf_ID</label>
                        {/* <input type="text" onChange={handleChange} defaultValue={inputsValue['turfId']} id="small-input" name="turfId" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} /> */}
                        <select value={inputsValue['turfId']} onChange={handleChange} name="turfId" className={` ${emptyError.errorName === 'turfId' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                            <option defaultValue="empty">Select One</option>
                            {
                                turfData?.data?.data.map((item: any, index: any) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
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
                dataSource={allField}
                columns={columns}
                pagination={paginationConfig}
            />
        </>
    )

}

export default FieldListTable