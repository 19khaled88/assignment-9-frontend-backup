'use client'
import Image from 'next/image'
import Carousel from "nuka-carousel"
const image1 = '/Cover-Game-on-Turf-2.jpg'
const image2 = '/MC40NzY2MzIwMCAxNDk3ODc2Mjg4.jpeg'
const image3 = '/MC41NTcxNDgwMCAxNDY2NTg0NTQ4.jpeg'

const image5 = '/shutterstock_123684637-1440x600-1.jpg'
const image6 = '/ezgif.com-webp-to-jpg.jpg'

export default function Home() {

  const Images = [image1, image2, image3, image5,image6]



  const slides = (Images: string[]) => {
    let array: React.ReactElement[] = []
    Images.map((image, index) => {
      array.push(

        <div key={index}>
          <Image src={image}  alt='No Image' style={{width:'100%', height:'500px'}}  objectFit='contain' width={700} height={300}/>
        </div>

      )
    })
    return array
  }

  return (
    <main>

      <Carousel 
        autoplay={true}
        autoplayInterval={4000}
        wrapAround={true}
        speed={600}
        withoutControls={true}
        pauseOnHover={false}
      >
        {slides(Images)}
      </Carousel>

    </main>


  )
}
