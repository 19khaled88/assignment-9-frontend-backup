'use client'
import OfferListTable from '@/components/ui/OfferListTable'
import { useAllTurfsQuery } from '@/redux/api/TurfApi'
import { useAllFieldsQuery } from '@/redux/api/fieldApi'
import { useAllGameTypesQuery } from '@/redux/api/gameTypeApi'
import { useAllOffersQuery, useCreateOffersMutation } from '@/redux/api/offerApi'
import { Button } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Offers = () => {

  const query: Record<string, any> = {}

  const [hideForm, setHideForm] = useState(false)


  const [inputsValue, setValues] = useState({
    price_per_hour: '',
    turfId: '',
    gameTypeId: '',
    fieldId: ''
  })

  const [emptyError, setEmptyError] = useState<Record<string, unknown>>({
    errorName: ''
  })

  //all gametypes
  const { data: allGameType, isLoading: gameTypeLoading } = useAllGameTypesQuery({ ...query })

  //offer list 
  const { data: offerData } = useAllOffersQuery({ ...query })

  //turf list
  const { data: allTurf, isLoading: turfLoading } = useAllTurfsQuery({ ...query })

  //field with turf id
  const { data: fieldsData, isLoading: fieldLoading } = useAllFieldsQuery({ ...query })

  const findSingleField = () => {
    const res = fieldsData?.data.filter((item: any) => item.turfId === inputsValue['turfId'])
    let array: any = []
    if (res != undefined && Object.keys(res).length > 0) {
      res.map((item: Record<string, string>, index: string) => {
        array.push(<option key={index} value={item.id}>{item.code}</option>)
      })
    }
    return array
  }

  //create offer
  const [createOffers, { error: fieldCreateError, isLoading }] = useCreateOffersMutation()

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setValues({
      ...inputsValue,
      [name]: name === 'price_per_hour' && value != "" ? parseInt(value) : value
    })
  }


  if (inputsValue['turfId'] != "") {
    const id = inputsValue['turfId']
  }

  const handleAddOffer = (mod: any) => {
    (document.getElementById(mod) as HTMLFormElement).showModal()
  }

  const submitHandler = async () => {
    if (inputsValue['price_per_hour'] === "") {
      setEmptyError({ "errorName": 'price_per_hour' })
      return null
    } else if (inputsValue['turfId'] === "") {
      setEmptyError({ "errorName": 'turfId' })
      return null
    } else if (inputsValue['gameTypeId'] === "") {
      setEmptyError({ "errorName": 'gameTypeId' })
      return null
    } else if (inputsValue['fieldId'] === "") {
      setEmptyError({ "errorName": 'fieldId' })
      return null
    }
    try {
      const res = await createOffers({ ...inputsValue }).unwrap();
      if (res.statusCode === 200 && res.success === true) {
        (document.getElementById("cleanFormData") as HTMLFormElement).reset();
        toast.success('New Offer created successfully');
      }
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  const closeAndCleanForm = () => {
    (document.getElementById("cleanFormData") as HTMLFormElement).reset();
    setValues({ price_per_hour: '', turfId: '', gameTypeId: '', fieldId: '' });
  }


  return (
    <div className="relative">
      <Button className="absolute z-20 right-5 -top-5" onClick={() => handleAddOffer('my_modal_2')} type='primary'>Add Offers</Button>
      <dialog id="my_modal_2" className={`${hideForm === true ? 'hidden' : 'visible'} modal mx-auto my-auto rounded-md shadow-2xl`} style={{ width: '500px' }}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center pt-10 ">Insert Offers</h3>
        </div>
        <form method="dialog" id="cleanFormData" className="modal-backdrop flex flex-col mx-auto w-2/3 gap-2 pb-10">

          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Turf</label>
            <select value={inputsValue['turfId']} onChange={handleChange} name="turfId" className={` ${emptyError.errorName === 'turfId' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
              <option defaultValue="empty">Select One</option>
              {
                allTurf?.data?.data?.map((item: any, index: any) => {
                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Field</label>
            <select value={inputsValue['fieldId']} onChange={handleChange} name="fieldId" className={` ${emptyError.errorName === 'fieldId' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
              <option defaultValue="empty">Select One</option>
              {findSingleField()}
            </select>
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Game_type</label>
            <select value={inputsValue['gameTypeId']} onChange={handleChange} name="gameTypeId" className={` ${emptyError.errorName === 'gameTypeId' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
              <option defaultValue="empty">Select One</option>
              {
                allGameType?.data?.data?.map((item: any, index: any) => {
                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price_per_hour</label>
            <input type="text" onChange={handleChange} value={inputsValue['price_per_hour']} id="small-input" name="price_per_hour" className={` ${emptyError.errorName === 'price_per_hour' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={() => submitHandler()}
              type="button"
              className="btn bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-1/2 text-white">Submit</button>
            <button onClick={() => closeAndCleanForm()} className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <OfferListTable />
    </div>
  )
}

export default Offers