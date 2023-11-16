'use client'
import { useAllTurfsQuery } from "@/redux/api/TurfApi";
import { Button, Input, Select, Space } from "antd";

import AOS from "aos";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import PropagateLoader from 'react-spinners/PropagateLoader';
import styles from "../../css/turf.module.css";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


const Turfs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [searchData, setSearchData] = useState<string>('')
    const [searchTitle, setSearchTitle] = useState<string>('name')
    const [query, setQuery] = useState<Record<string, any>>({})


    const allOptions = [
        {
            value: 'all',
            label: 'select all',
        },
        {
            value: 'name',
            label: 'name',
        },
        {
            value: 'location',
            label: 'location',
        },
        {
            value: 'owner',
            label: 'owner',
        }

    ];


    useEffect(() => {
        AOS.init({
            delay: 30,
            duration: 800,
            easing: "ease-in-out",
            once: false,
            mirror: true,
            offset: 120,
            debounceDelay: 50,
            throttleDelay: 99,
        });
        AOS.refresh();
    }, [isInView]);

    // let query: Record<string, any> = {};
    const {
        data: turfs,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useAllTurfsQuery({ ...query });
    console.log(turfs)

    const showTurfs = (turfs: any): ReactNode => {
        let array: any[] = [];
        turfs?.data.data.map((item: any, index: number) => {
            array.push(
                <div key={index} className={`${styles.hoverItem} card w-full bg-base-100 shadow-xl`}>
                    <figure data-aos="flip-left">
                        <Image style={{ width: '100%' }} placeholder="blur" blurDataURL={item.imgurl} className="rounded-t-lg" width={500} height={500} src={item.imgurl} alt="No turf" />
                    </figure>
                    <div className="card-body p-4">
                        <h2 className="card-title">

                            <div className="badge badge-secondary text-2xl font-bold text-gray-500">{item.name}</div>
                        </h2>

                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Location : {item.location}</div>
                            <div className="badge badge-outline">Owner : {item.owner}</div>
                            <Link
                                href={{ pathname: 'single', query: { id: item.id, group: 'turf' } }}
                                // href={`/single/${item.id}`}
                                // href={('single/' + item.id) as Route}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                            text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                            focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Details
                                <svg
                                    className="w-3.5 h-3.5 ml-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </Link>

                        </div>
                    </div>
                </div>
                // <div
                //     key={index}
                //     className={`${styles.hoverItem} max-w-sm m-2 p-4 w-full h-full bg-white border 
                //                 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
                // >
                //     <div data-aos="flip-left">
                //         <div style={{ width: '100%',  }}>
                //             <Image
                //                 alt='No image'
                //                 src={item.image}
                //                 width={100}
                //                 height={100}
                //                 objectFit='contain'
                //             />
                //         </div>
                //         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                //             {item.name}
                //         </h5>
                //         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                //             Location : {item.location}
                //         </p>
                //         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                //             Owner : {item.owner}
                //         </p>

                //         <Link
                //             href={{ pathname: 'single', query: { id: item.id, group: 'turf' } }}
                //             // href={`/single/${item.id}`}
                //             // href={('single/' + item.id) as Route}
                //             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                //             text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                //             focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                //         >
                //             Details
                //             <svg
                //                 className="w-3.5 h-3.5 ml-2"
                //                 aria-hidden="true"
                //                 xmlns="http://www.w3.org/2000/svg"
                //                 fill="none"
                //                 viewBox="0 0 14 10"
                //             >
                //                 <path
                //                     stroke="currentColor"
                //                     strokeLinecap="round"
                //                     strokeLinejoin="round"
                //                     strokeWidth="2"
                //                     d="M1 5h12m0 0L9 1m4 4L9 9"
                //                 />
                //             </svg>
                //         </Link>
                //     </div>
                // </div>
            );
        });
        return array;
    };

    const handleTurfClick = () => {
        let obj: Record<string, unknown> = {}
        if (searchTitle === 'name' && searchData === '') {
            obj["name"] = ""
            setQuery(obj)
        } else {
            obj[searchTitle] = searchData
            setQuery(obj)
        }

    }


    if (isLoading) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center ">
                <h1 className="text-center py-5 text-2xl font-bold text-gray-500">
                    Turfs, We takes care of
                </h1>
                <div role="status" className="max-w-sm animate-pulse ">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (!isLoading && turfs?.data.data.length === 0) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center relative">
                <h1
                    className="text-center py-5 text-2xl font-bold text-gray-500"
                    data-aos="zoom-in"
                >
                    Turfs, We takes care of
                </h1>
                <Space className="my-6">
                    <Space.Compact className="absolute inset-x-0 w-3/4 md:w-2/3  lg:w-1/2 mx-auto xl:w-1/3 xl:mr-10 top-24">
                        <Select
                            className="text-lg"
                            style={{ height: "40px" }}
                            defaultValue="name"
                            options={allOptions}
                            onChange={(value: string) => setSearchTitle(value)}
                        />
                        <Input
                            defaultValue="Search for Turf"
                            onChange={(e) => setSearchData(e.target.value)}
                            style={{ height: "40px", width: "100%" }}
                        />
                        <Button
                            className="bg-blue-500 text-white text-lg"
                            onClick={handleTurfClick}
                            style={{ height: "40px" }}
                        >
                            Submit
                        </Button>
                    </Space.Compact>
                </Space>

                <div
                    className={`text-2xl flex flex-row justify-items-center justify-center shadow-2xl mx-10 p-10 rounded-md`}
                >
                    <h1>No data found !</h1>
                </div>
            </div>
        );
    } else if (isFetching) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center relative">
                <h1
                    className="text-center py-5 text-2xl font-bold text-gray-500"
                    data-aos="zoom-in"
                >
                    Turfs, We takes care of
                </h1>
                <Space className="my-6">
                    <Space.Compact className="absolute inset-x-0 w-3/4 md:w-2/3  lg:w-1/2 mx-auto xl:w-1/3 xl:mr-10 top-24">
                        <Select
                            className="text-lg"
                            style={{ height: "40px" }}
                            defaultValue="name"
                            options={allOptions}
                            onChange={(value: string) => setSearchTitle(value)}
                        />
                        <Input
                            defaultValue="Search for Turf"
                            onChange={(e) => setSearchData(e.target.value)}
                            style={{ height: "40px", width: "100%" }}
                        />
                        <Button
                            className="bg-blue-500 text-white text-lg"
                            onClick={handleTurfClick}
                            style={{ height: "40px" }}
                        >
                            Submit
                        </Button>
                    </Space.Compact>
                </Space>

                <div
                    className={`text-2xl flex flex-row justify-items-center justify-center shadow-2xl mx-10 p-10 rounded-md`}
                >
                    <PropagateLoader
                        color="#36d7b7"
                        cssOverride={override}

                    />
                </div>
            </div>


        )
    }
    return (
        <div className="flex flex-col pt-10 justify-items-center justify-center relative">
            <h1
                className="text-center py-5 text-2xl font-bold text-gray-500"
                data-aos="zoom-in"
            >
                Turfs, We takes care of
            </h1>
            <Space className="my-6">
                <Space.Compact className="absolute inset-x-0 w-3/4 md:w-2/3  lg:w-1/2 mx-auto xl:w-1/3 xl:mr-10 top-24">
                    <Select
                        className="text-lg"
                        style={{ height: "40px" }}
                        defaultValue="name"
                        options={allOptions}
                        onChange={(value: string) => setSearchTitle(value)}
                    />
                    <Input
                        defaultValue="Search for Turf"
                        onChange={(e) => setSearchData(e.target.value)}
                        style={{ height: "40px", width: "100%" }}
                    />
                    <Button
                        className="bg-blue-500 text-white text-lg"
                        onClick={handleTurfClick}
                        style={{ height: "40px" }}
                    >
                        Submit
                    </Button>
                </Space.Compact>
            </Space>

            <div
                className={`  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center justify-center shadow-2xl mx-10 p-10 rounded-md`}
            >
                {showTurfs(turfs)}
            </div>
        </div>
    );
};

export default Turfs;
