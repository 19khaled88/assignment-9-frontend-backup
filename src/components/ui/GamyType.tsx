import { useAllGameTypesQuery } from "@/redux/api/gameTypeApi"
import { ReactNode, useEffect, useRef, useState,CSSProperties } from "react"
import PropagateLoader from 'react-spinners/PropagateLoader';
import { useInView } from 'framer-motion'
import AOS from 'aos'
import { SearchOutlined } from '@ant-design/icons';
import styles from '../../css/gameType.module.css';
import React from 'react';
import { Button, Input, Select, Space } from 'antd';
import Link from "next/link";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const GameTypePage = () => {
    const ref = useRef(null)
    const { Search } = Input;
    const isInView = useInView(ref)
    const [searchData, setSearchData] = useState<string>('')
    const [searchTitle, setSearchTitle] = useState<string>('name')
    const [query, setQuery] = useState<Record<string, any>>({})
    useEffect(() => {
        AOS.init({
            delay: 30,
            duration: 800,
            easing: 'ease-out',
            once: false,
            mirror: true,
            offset: 120,
            debounceDelay: 50,
            throttleDelay: 99
        });
        AOS.refresh();
    }, [isInView]);
    // const query: Record<string, any> = {}
    const { data: gameTypes, isLoading, isError, error, isFetching } = useAllGameTypesQuery({ ...query })

    const options = [
        {
            value: 'all',
            label: 'select all',
        },
        {
            value: 'name',
            label: 'name',
        },
        {
            value: 'numberOfPalyers',
            label: 'numberOfPalyers',
        }
    ];


    const showGameTypes = (data: any): ReactNode => {
        let array: any[] = []
        gameTypes != undefined && gameTypes?.data.data.map((item: any, index: number) => {
            array.push(
                <div key={index} className={`${styles.hoverItem} max-w-sm p-4 w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
                    <div data-aos="fade-up" className="">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total capable palayers : {item.numberOfPalyers}</p>
                        <Link href={{ pathname: 'single', query: { id: item.id, group: 'gameType' } }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )
        })
        return array
    }

    const handleTurfClick = () => {
        
        let obj: Record<string, unknown> = {}
        if (searchTitle === 'name' && searchData === '') {
            obj["name"] = ""
            setQuery(obj)
        } else if (searchTitle === 'numberOfPalyers' && searchData != '') {

            obj[searchTitle] = parseInt(searchData)
            setQuery(obj)
        } else {
            obj[searchTitle] = searchData
            setQuery(obj)
        }
        
    }
    

    if (isLoading) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center ">
                <h1 className="text-center py-5 text-2xl font-bold text-gray-500" >Game, What you can play in our trufs</h1>
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
    } else if (!isLoading && gameTypes?.data.data.length === 0) {
        return (
            <div className="flex flex-col pt-10 justify-items-center justify-center relative">
                <h1
                    className="text-center py-5 text-2xl font-bold text-gray-500"
                    data-aos="zoom-in"
                >
                    Game, What you can play in our turfs
                </h1>
                <Space className="my-6">
                    <Space.Compact className="absolute inset-x-0 w-3/4 md:w-2/3  lg:w-1/2 mx-auto xl:w-1/3 xl:mr-10 top-24">
                        <Select
                            className="text-lg"
                            style={{ height: "40px" }}
                            defaultValue="name"
                            options={options}
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
                            options={options}
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
            <h1 className="text-center py-5 text-2xl font-bold text-gray-500" data-aos="zoom-in">Game, What you can play in our turfs</h1>
            <Space className="my-6">
                <Space.Compact className="absolute inset-x-0 w-3/4 md:w-2/3  lg:w-1/2 mx-auto xl:w-1/3 xl:mr-10 top-24">
                    <Select className="text-lg" onChange={(value: string) => setSearchTitle(value)} style={{ height: '40px' }} defaultValue="name" options={options} />
                    <Input onChange={(e) => setSearchData(e.target.value)} defaultValue="Search for game type" style={{ height: '40px', width: '100%' }} />
                    <Button onClick={handleTurfClick} className="bg-blue-500 text-white text-lg" style={{ height: '40px' }}>Submit</Button>
                </Space.Compact>
            </Space>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center justify-center shadow-2xl mx-10 p-10 rounded-md">
                {
                    showGameTypes(gameTypes)
                }
            </div>
        </div>
    )
}

export default GameTypePage