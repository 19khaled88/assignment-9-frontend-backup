'use client'
import FieldListTable from '@/components/ui/FieldListTable'
import React, { useState } from 'react'
import { Button } from 'antd'
import { useAllTurfsQuery } from '@/redux/api/TurfApi'
import { useCreateFieldMutation } from '@/redux/api/fieldApi'
import { toast } from 'react-toastify'



const Fields = () => {
  const query: Record<string, any> = {}

  const [hideForm, setHideForm] = useState(false)

  const [inputsValue, setValues] = useState({
    code: '',
    size: '',
    turfId: ''
  })

  const [emptyError, setEmptyError] = useState<Record<string, unknown>>({
    errorName: ''
  })


  //turf list 
  const { data: turfData } = useAllTurfsQuery({ ...query })



  //create field
  const [createField, { error:fieldCreateError, isLoading }] = useCreateFieldMutation()

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setValues({
      ...inputsValue,
      [name]: value
    })
  }

  const handleAddField = (mod: any) => {
    (document.getElementById(mod) as HTMLFormElement).showModal()
  }

  const submitHandler = async () => {
    if (inputsValue['code'] === "") {
      setEmptyError({ "errorName": 'code' })
      return null
    } else if (inputsValue['size'] === "") {
      setEmptyError({ "errorName": 'size' })
      return null
    } else if (inputsValue['turfId'] === "") {
      setEmptyError({ "errorName": 'turfId' })
      return null
    }

    try {
      const res = await createField({ ...inputsValue }).unwrap();

      if (res.statusCode === 200 && res.success === true) {
        (document.getElementById("cleanFormData") as HTMLFormElement).reset();
        toast.success('New Field created successfully');
      } 
    } catch (error:any) {
      toast.error(error?.data?.message)
    }
   
  }

  const closeAndCleanForm = () => {
    (document.getElementById("cleanFormData") as HTMLFormElement).reset();
    setValues({ code: '', size: '', turfId: '' });
  }

  return (
    <div className="relative">
      <Button className="absolute z-20 right-5 -top-5" onClick={() => handleAddField('my_modal_2')} type='primary'>Add Fields</Button>
      <dialog id="my_modal_2" className={`${hideForm === true ? 'hidden' : 'visible'} modal mx-auto my-auto rounded-md shadow-2xl`} style={{ width: '500px' }}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center pt-10 ">Insert Field</h3>
        </div>
        <form method="dialog" id="cleanFormData" className="modal-backdrop flex flex-col mx-auto w-2/3 gap-2 pb-10">
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field_code</label>
            <input type="text" onChange={handleChange} value={inputsValue['code']} id="small-input" name="code" className={` ${emptyError.errorName === 'code' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field_size</label>
            <input type="text" onChange={handleChange} value={inputsValue['size']} id="small-input" name="size" className={` ${emptyError.errorName === 'size' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turf_id</label>
            <select value={inputsValue['turfId']} onChange={handleChange} name="turfId" className={` ${emptyError.errorName === 'turfId' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
              <option defaultValue="empty
              ">Select One</option>
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
              className="btn bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-1/2 text-white">Submit</button>

            {/* <button type="button" onClick={() => closeAndCleanForm('my_modal_2')} className="btn bg-red-400 px-4 py-2 text-white hover:bg-red-500 rounded-md w-fit">Close</button> */}
            <button onClick={() => closeAndCleanForm()} className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <FieldListTable />
    </div>
  )
}

export default Fields