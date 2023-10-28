import { useAllGameTypesQuery } from "@/redux/api/gameTypeApi"
import { ReactNode,useEffect,useRef } from "react"
import {useInView} from 'framer-motion'
import AOS from 'aos'
const GameTypePage = () => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    useEffect(() => {
        AOS.init({
            delay:30,
            duration:800,
            easing:'ease-out',
            once:false,
            mirror:true,
            offset:120,
            debounceDelay:50,
            throttleDelay:99
        });
        AOS.refresh();
      }, [isInView]);
    const query: Record<string, any> = {}
    const { data: gameTypes, isLoading, isError, error } = useAllGameTypesQuery({ ...query })

    const showGameTypes = (data: any): ReactNode => {
        let array: any[] = []
        gameTypes?.data.data.map((item: any, index: number) => {

            array.push(
                <div data-aos="fade-up" key={index} className="max-w-sm p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total capable palayers : {item.numberOfPalyers}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            )
        })
        return array
    }
    if (isLoading) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center ">
                <h1  className="text-center py-5 text-2xl font-bold text-gray-500" >Game, What you can play in our trufs</h1>
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col pt-10 justify-items-center justify-center ">
            <h1 className="text-center py-5 text-2xl font-bold text-gray-500" >Game, What you can play in our trufs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center justify-center shadow-2xl mx-10 p-10 rounded-md">
                {
                    showGameTypes(gameTypes)
                }
            </div>
        </div>
    )
}

export default GameTypePage