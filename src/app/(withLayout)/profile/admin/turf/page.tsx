'use client'

import TurfListTable from "@/components/ui/TurfListTable"
import { useCreateTurfMutation } from "@/redux/api/TurfApi"
import { Button } from 'antd'
import { useState } from "react"
import { toast } from "react-toastify"
const TurfAdd = () => {

  const [createTurf, { error, isLoading }] = useCreateTurfMutation();
  const [hideForm, setHideForm] = useState(false)

  const [inputsValue, setValues] = useState({
    name: '',
    location: '',
    owner: ''
  })

  const [emptyError, setEmptyError] = useState<Record<string, unknown>>({
    errorName: ''
  })

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setValues({
      ...inputsValue,
      [name]: value
    })
  }

  const submitHandler = async () => {
    if (inputsValue['name'] === "") {
      setEmptyError({ "errorName": 'name' })
      return null
    } else if (inputsValue['location'] === "") {
      setEmptyError({ "errorName": 'location' })
      return null
    } else if (inputsValue['owner'] === "") {
      setEmptyError({ "errorName": 'owner' })
      return null
    }

    try {
      const res = await createTurf({ ...inputsValue }).unwrap();

      if (res.statusCode === 200 && res.success === true) {
        (document.getElementById("cleanFormData") as HTMLFormElement).reset();
        toast.success('New turf created successfully');
      }
    } catch (error: any) {
      toast.error(error?.data?.message)
    }

  }

  const closeAndCleanForm = () => {
    (document.getElementById("cleanFormData") as HTMLFormElement).reset();
    setValues({ name: '', location: '', owner: '' });

  }

  const handleAddTurf = (mod: any) => {
    (document.getElementById(mod) as HTMLFormElement).showModal()
  }



  return (
    <div className="relative">
      <Button className="absolute z-20 right-5 -top-5" onClick={() => handleAddTurf('my_modal_2')} type='primary'>Add Turf</Button>
      <dialog id="my_modal_2" className={`${hideForm === true ? 'hidden' : 'visible'} modal mx-auto my-auto rounded-md shadow-2xl`} style={{ width: '500px' }}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center pt-10 ">Insert Turf</h3>
        </div>
        <form method="dialog" id="cleanFormData" className="modal-backdrop flex flex-col mx-auto w-2/3 gap-2 pb-10">
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" onChange={handleChange} value={inputsValue['name']} id="small-input" name="name" className={` ${emptyError.errorName === 'name' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
            <input type="text" onChange={handleChange} value={inputsValue['location']} id="small-input" name="location" className={` ${emptyError.errorName === 'location' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
            <p id="locationError"></p>
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner</label>
            <input type="text" onChange={handleChange} value={inputsValue['owner']} id="small-input" name="owner" className={` ${emptyError.errorName === 'owner' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
            <p id="ownerError"></p>
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
      <TurfListTable />
    </div>
  )
}

export default TurfAdd