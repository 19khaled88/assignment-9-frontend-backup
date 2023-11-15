'use client'

import { useAllOffersQuery, useDeleteOfferWithIdMutation, useEditOfferMutation } from '@/redux/api/offerApi'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const OfferListTable = () => {
    const query: Record<string, any> = {}
    const [allOffer, setAllOffer] = useState([])
    const [size, setSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    const [editId, setEditId] = useState('')
    query['limit'] = size;
    query['page'] = page
    query['sortBy'] = sortBy
    query['sortOrder'] = sortOrder

    const { data: offers, isLoading } = useAllOffersQuery({ ...query })
    const [deleteOffer, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteOfferWithIdMutation()
    const [updateOffer, { isLoading: editloading, isSuccess: editSuccess }] = useEditOfferMutation()


    const [inputsValue, setValues] = useState({
        price_per_hour: '',
        turfId: '',
        gameTypeId: '',
        fieldId: ''
    })

    useEffect(() => {
        if (!isLoading) {
            setAllOffer(offers?.data)
        }
    }, [isLoading, offers?.data])

    //delete turf
    const deleteOfferHandler = async (id: string) => {
        try {
            const res = await deleteOffer(id).unwrap()
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

    const showEditOffer = (mod: any, note: any) => {
        (document.getElementById(mod) as HTMLFormElement).showModal();
        setValues({
            ...inputsValue,
            price_per_hour: note.price_per_hour,
            turfId: note.turfId,
            gameTypeId: note.gameTypeId,
            fieldId: note.fieldId,
        })
        setEditId(note.id)
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setValues({
            ...inputsValue,
            [name]: name === 'price_per_hour' && value != "" ? parseInt(value) : value
        })
    }

    const closeAndCleanForm = () => {
        (document.getElementById("cleanUpdateFormData") as HTMLFormElement).reset();
        setValues({ price_per_hour: '', turfId: '', fieldId: '', gameTypeId: '' });
    }

    const submitHandler = async () => {
        try {
            const store = {
                ...inputsValue,
                'price_per_hour': parseInt(inputsValue['price_per_hour'])
            }
            const id = editId
            const res = await updateOffer({ id, ...store }).unwrap()
            if (res.statusCode === 200 && res.success === true) {
                toast.success(res.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const columns = [
        {
            title: 'Price',
            dataIndex: 'price_per_hour',
            key: 'price_per_hour'
        },

        {
            title: 'Turf_ID',
            dataIndex: 'turfId',
            key: 'turfId'
        },
        {
            title: 'Game_Type_ID',
            dataIndex: 'gameTypeId',
            key: 'gameTypeId'
        },
        {
            title: 'Field_ID',
            dataIndex: 'fieldId',
            key: 'fieldId'
        },
        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <Button onClick={() => showEditOffer('my_modal_3', data)} type='primary' disabled>update</Button>
                        <Button onClick={() => deleteOfferHandler(data.id)} type="primary" danger>delete</Button>
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
                    <h3 className="font-bold text-lg text-center pt-10 ">Update Offered Game</h3>
                </div>
                <form method="dialog" id="cleanUpdateFormData" className="modal-backdrop flex flex-col mx-auto w-2/3 gap-2 pb-10">
                
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turf</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['turfId']} id="small-input" name="turfId" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['fieldId']} id="small-input" name="fieldId" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Game_type</label>
                        <input type="text" onChange={handleChange} defaultValue={inputsValue['gameTypeId']} id="small-input" name="gameTypeId" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" onChange={handleChange} defaultValue={inputsValue['price_per_hour']} id="small-input" name="price_per_hour" className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
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
                dataSource={allOffer}
                columns={columns}
                pagination={paginationConfig}
            />
        </>
    )

}

export default OfferListTable