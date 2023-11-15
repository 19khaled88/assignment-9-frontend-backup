'use client'
import GameTypeListTable from '@/components/ui/GameTypeListTable'
import { useAllGameTypesQuery, useCreateGameTypeMutation } from '@/redux/api/gameTypeApi'
import { Button } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
const GameType = () => {

  const query: Record<string, any> = {}

  const [hideForm, setHideForm] = useState(false)

  const [inputsValue, setValues] = useState({
    name: '',
    numberOfPalyers: ''
  })

  const [emptyError, setEmptyError] = useState<Record<string, unknown>>({
    errorName: ''
  })

  //turf list 
  const { data: turfData } = useAllGameTypesQuery({ ...query })

  //create field
  const [createGameType, { error: fieldCreateError, isLoading }] = useCreateGameTypeMutation()

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setValues({
      ...inputsValue,
      [name]: name === 'numberOfPalyers' && value != "" ? parseInt(value) : value
      // [name]:value
    })
  }

  const handleAddField = (mod: any) => {
    (document.getElementById(mod) as HTMLFormElement).showModal()
  }

  const submitHandler = async () => {
    if (inputsValue['name'] === "") {
      setEmptyError({ "errorName": 'name' })
      return null
    } else if (inputsValue['numberOfPalyers'] === "") {
      setEmptyError({ "errorName": 'numberOfPalyers' })
      return null
    }

   

    try {
      const res = await createGameType({ ...inputsValue }).unwrap();

      if (res.statusCode === 200 && res.success === true) {
        (document.getElementById("cleanFormData") as HTMLFormElement).reset();
        toast.success('New Game Type created successfully');
      }
    } catch (error: any) {
      console.log(error?.status, error?.data?.message)
      toast.error(error?.data?.message)
    }

  }

  const closeAndCleanForm = () => {
    (document.getElementById("cleanFormData") as HTMLFormElement).reset();
    setValues({ name: '', numberOfPalyers: '' });
  }

  return (
    <div className="relative">
      <Button className="absolute z-20 right-5 -top-5" onClick={() => handleAddField('my_modal_2')} type='primary'>Add Game Type</Button>
      <dialog id="my_modal_2" className={`${hideForm === true ? 'hidden' : 'visible'} modal mx-auto my-auto rounded-md shadow-2xl`} style={{ width: '500px' }}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center pt-10 ">Insert Game Type</h3>
        </div>
        <form method="dialog" id="cleanFormData" className="modal-backdrop flex flex-col mx-auto w-2/3 gap-2 pb-10">
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" onChange={handleChange} value={inputsValue['name']} id="small-input" name="name" className={` ${emptyError.errorName === 'name' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
          </div>
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of players</label>
            <input type="number" onChange={handleChange} value={inputsValue['numberOfPalyers']} id="small-input" name="numberOfPalyers" className={` ${emptyError.errorName === 'numberOfPalyers' ? 'border border-red-400' : 'border border-gray-400'} block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
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
      <GameTypeListTable />
    </div>
  )
}

export default GameType