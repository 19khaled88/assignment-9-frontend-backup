'use client'
import { useGameTypeWithIdQuery } from '@/redux/api/gameTypeApi';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const GameTypeDetails = ({ ...detailsProps }) => {
    const router = useRouter()
    const { data: gameTypeWithId, isLoading } = useGameTypeWithIdQuery(detailsProps?.id)


    const GameOffers = (GameOffers: any) => {

        let array: any = []
        for (let i = 0; i < Object.keys(GameOffers).length; i++) {
            array.push(
                <div key={i} className={`col-span-1 max-w-sm m-2 p-4 w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
                    <div>
                        <h5 className="mb-2 text-2xl font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                            Field : {GameOffers[i]?.fieldId}
                        </h5>
                        <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
                            Game type : {GameOffers[i]?.gameTypeId}
                        </p>
                        <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
                            Turf : {GameOffers[i]?.turfId}
                        </p>
                        <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
                            Price per hour : {GameOffers[i]?.price_per_hour}
                        </p>

                    </div>
                </div>
            )
        }

        return array
    }

    if (isLoading) {
        return (
            <div className='h-96 text-2xl flex flex-col justify-center justify-center shadow-2xl mx-10 p-10 rounded-md'>
                <PropagateLoader
                    color="#36d7b7"
                    cssOverride={override}

                />

            </div>
        )
    } else if (gameTypeWithId === undefined) {
        return (
            <div className='h-96 text-2xl flex flex-col justify-center justify-center shadow-2xl mx-10 p-10 rounded-md'>
                <PropagateLoader
                    color="#36d7b7"
                    cssOverride={override}

                />

            </div>
        )
    } return (
        <div className='text-2xl grid grid-cols-3 gap-5 rounded-md mt-10 shadow-2xl py-10 px-10  m-auto mb-16 mt-10' style={{ width: '95%' }}>

            <div className={`col-span-1  m-2 p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Game : {gameTypeWithId.data.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Number of players : {gameTypeWithId.data.numberOfPalyers
                    }
                </p>

                <Button
                    onClick={() => router.back()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                        text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>Go back
                </Button>


            </div>

            <div className='col-span-2 flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <h1>Available Fields</h1>
                    <div className='flex flex-row'>
                        {
                            GameOffers(gameTypeWithId?.data?.GameOffers)
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default GameTypeDetails