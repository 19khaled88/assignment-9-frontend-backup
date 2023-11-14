'use client'
import { useAllGameTypesQuery, useDeleteGameTypefWithIdMutation, useEditGameTypeMutation } from '@/redux/api/gameTypeApi'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const GameTypeListTable = () => {
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

    const { data: gameTypes, isLoading } = useAllGameTypesQuery({ ...query })
    const [deleteGameType, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteGameTypefWithIdMutation()
    const [updateGameType, { isLoading: editloading, isSuccess: editSuccess }] = useEditGameTypeMutation()

    const [inputsValue, setValues] = useState({
        name: '',
        numberOfPalyers: ''
    })

    useEffect(() => {
        if (!isLoading) {
            setAllTurf(gameTypes?.data.data)
        }
    }, [isLoading, gameTypes?.data.data])

    //delete turf
    const deleteGameTypeHandler = async (id: string) => {
        try {
            const res = await deleteGameType(id).unwrap()
            if (res.statusCode === 200 && res.success === true) {
                toast.success(res.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }

    }

    // if (deleteSuccess === true) {
    //     toast.success('Game type deleted successfully')
    // } else if (deleteError === true) {
    //     toast.error('Not deleted!')
    // }

    const showEditGameType = (mod: any, note: any) => {
        (document.getElementById(mod) as HTMLFormElement).showModal();
        setValues({
            ...inputsValue,
            name: note.name,
            numberOfPalyers: note.numberOfPalyers
        })
        setEditId(note.id)
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setValues({
            ...inputsValue,
            [name]: name === 'numberOfPalyers' && value != "" ? parseInt(value) : value
        })
    }

    const closeAndCleanForm = () => {
        (document.getElementById("cleanUpdateFormData") as HTMLFormElement).reset();
        setValues({ name: '', numberOfPalyers: '' });
    }

    const submitHandler = async () => {
        try {
            const store = {
                ...inputsValue,
                'numberOfPalyers': parseInt(inputsValue['numberOfPalyers'])
            }
            const id = editId
            const res = await updateGameType({ id, ...store }).unwrap()
            if (res.statusCode === 200 && res.success === true) {
                toast.success(res.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
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
            title: 'Game_Name',
            dataIndex: 'name',
            key: 'name'
        },

        {
            title: 'Number of Player',
            dataIndex: 'numberOfPalyers',
            key: 'numberOfPalyers'
        },
        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Button onClick={() => showEditGameType('my_modal_3', data)} type='primary'>update</Button>
                        <Button onClick={() => deleteGameTypeHandler(data.id)} type="primary" danger>delete</Button>
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
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['numberOfPalyers']} id="small-input" name="numberOfPalyers" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

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

export default GameTypeListTable