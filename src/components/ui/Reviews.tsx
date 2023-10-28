'use client';

import Image from "next/image";
import thumbnail from '../../../public/thumbnail-removebg-preview.png';
import reivew_yes_icon from '../../../public/yesreview.png';
import review_fancy from '../../../public/review_bg-removebg-preview.png'
const Reviews = () => {
    return (
        <div className="flex flex-col pt-4 justify-items-center justify-center relative">
            <h1 className="text-center  py-5 pr-16 md:pr-0 text-lg md:text-2xl font-bold text-gray-500">Reviews, that are top listed</h1>
            <Image
                src={review_fancy}
                alt="No Image"
                width={200}
                height={200}
                className="absolute w-32 lg:w-48 xl:w-52 top-0 lg:top-4 xl:-top-6 right-6 lg:-right-16 xl:-right-16"
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pl-10 pr-10 lg:pr-32 xl:pr-32 pt-10 pb-10'>
                <div style={{ background: '#FAE8FF' }} className="border-2 rounded-md flex flex-col items-start p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <Image src={thumbnail} alt="No Image" width={50} height={50} />
                        <span className="flex flex-row gap-2 py-2">
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                        </span>
                    </div>
                    <span className="flex flex-col ">
                        <p className="text-xs ">Review posted by</p>
                        <p className="text-xs text-purple-600">Khaled Ahasan</p>
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 py-1"> Professional, Reliable & Best in their class. It's the company you want to be working with!</h3>
                    </span>
                </div>
                <div style={{ background: '#E7F4FF' }} className="border-2 rounded-md flex flex-col items-start p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <Image src={thumbnail} alt="No Image" width={50} height={50} />
                        <span className="flex flex-row gap-2 py-2">
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                        </span>
                    </div>
                    <span className="flex flex-col ">
                        <p className="text-xs ">Review posted by</p>
                        <p className="text-xs text-purple-600">Khaled Ahasan</p>
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 py-1"> Professional, Reliable & Best in their class. It's the company you want to be working with!</h3>
                    </span>
                </div>
                <div style={{ background: '#FEF3C2' }} className="border-2 rounded-md flex flex-col items-start p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <Image src={thumbnail} alt="No Image" width={50} height={50} />
                        <span className="flex flex-row gap-2 py-2">
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                            <Image src={reivew_yes_icon} width={20} height={20} alt="No image" />
                        </span>
                    </div>
                    <span className="flex flex-col ">
                        <p className="text-xs ">Review posted by</p>
                        <p className="text-xs text-purple-600">Khaled Ahasan</p>
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 py-1"> Professional, Reliable & Best in their class. It's the company you want to be working with!</h3>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Reviews