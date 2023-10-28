'use client'
import Image from 'next/image'
import Carousel from "nuka-carousel"
// import image1 from '../../../public/Cover-Game-on-Turf-2.jpg'
// import image2 from '../../../public/MC40NzY2MzIwMCAxNDk3ODc2Mjg4.jpeg'
// import image3 from '../../../public/MC41NTcxNDgwMCAxNDY2NTg0NTQ4.jpeg'
// import image4 from '../../../public/ezgif.com-webp-to-jpg.jpg'
// import image5 from '../../../public/shutterstock_123684637-1440x600-1.jpg'
const image1 = '/Cover-Game-on-Turf-2.jpg'
const image2 = '/MC40NzY2MzIwMCAxNDk3ODc2Mjg4.jpeg'
const image3 = '/MC41NTcxNDgwMCAxNDY2NTg0NTQ4.jpeg'
const image5 = '/shutterstock_123684637-1440x600-1.jpg'
const image4 = '/ezgif.com-webp-to-jpg.jpg'

export default function BannerPage() {
    const Images = [image1, image2, image3, image4, image5]
    const slides = (Images: string[]) => {
        let array: React.ReactElement[] = []
        Images.map((image, index) => {
            array.push(
                <div key={index}>
                    <Image
                        src={image}
                        alt='No Image'
                        // style={{ width: '100%', height: '500px' }}
                        className='w-full h-48 md:h-64 lg:h-96'
                        height={600}
                        width={500}
                    // objectFit='contain'

                    />
                </div>

            )
        })
        return array
    }

    return (
        <div className='h-4/5'>
            <div className='h-4/5'>
                <Carousel
                    autoplay={true}
                    autoplayInterval={4000}
                    wrapAround={true}
                    speed={600}
                    adaptiveHeight={true}
                    withoutControls={true}
                    pauseOnHover={false}
                >
                    {slides(Images)}
                </Carousel>
            </div>

        </div>
    )
}
