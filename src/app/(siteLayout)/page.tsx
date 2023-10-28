'use client'
import BannerPage from '@/components/ui/Banner'
import Banners from '@/components/ui/Banners'
import Featuristics from '@/components/ui/Featuristics'
import GameTypePage from '@/components/ui/GamyType'
import OfferPage from '@/components/ui/Offers'
import Reviews from '@/components/ui/Reviews'
import Turfs from '@/components/ui/Turfs'

export default function Home() {
  return (
    <main>
      <BannerPage />
      <Turfs />
      <GameTypePage />
      <OfferPage />
      <Featuristics />
      <Reviews />
    </main>


  )
}
