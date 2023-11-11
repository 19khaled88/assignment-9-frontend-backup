'use client'

import BannerPage from "@/components/ui/Banner";
import { useSearchParams } from 'next/navigation'
import TurfDetails from "@/components/ui/TurfDetails";
import GameTypeDetails from "@/components/ui/GameTypeDetails";

export default function Single() {
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    const group = searchParams.get('group')
    // const myState = history?.state;
   
    const detailsProps: Record<string, unknown> = {
        id:id,
        group:group
    }
   
    return (
        <main>
            <BannerPage />
            {detailsProps.group === 'turf' ? <TurfDetails {...detailsProps} /> :  detailsProps.group === 'gameType' ? <GameTypeDetails {...detailsProps}/> : null}
            
        </main>
    )
}

