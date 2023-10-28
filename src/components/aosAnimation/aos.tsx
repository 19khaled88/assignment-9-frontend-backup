"use client"

import { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
    const [isAOSInitialized, setAOSInitialized] = useState(false);

    useEffect(() => {
        if (!isAOSInitialized) {
            AOS.init({
                // ... your initialization parameters here
            });
            setAOSInitialized(true);
        }
    }, [isAOSInitialized]);

    return isAOSInitialized;
};
