'use client'
import React, { useEffect } from 'react'
const image1 = '/Cover-Game-on-Turf-2.jpg'
const image2 = '/MC40NzY2MzIwMCAxNDk3ODc2Mjg4.jpeg'
const image3 = '/MC41NTcxNDgwMCAxNDY2NTg0NTQ4.jpeg'
const image5 = '/shutterstock_123684637-1440x600-1.jpg'
const image4 = '/ezgif.com-webp-to-jpg.jpg'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay, {
  AutoplayType,
  AutoplayOptionsType,
} from 'embla-carousel-autoplay'
import styles from '../../css/banner.module.css'
import Image from 'next/image'


const Banners = () => {
  const Images = [image1, image2, image3, image4, image5]
  const slides = (Images: string[]) => {
    let array: React.ReactElement[] = []
    Images.map((image, index) => {
        array.push(
            <div className={styles.embla__slide} key={index}>
                <Image
                    src={image}
                    alt='No Image'
                    style={{ width: '100%',height:'500px' }}
                    height={600}
                    width={500}
                // objectFit='contain'

                />
            </div>

        )
    })
    return array
}
  const autoplayOptions = {
    delay: 6000,
    // rootNode: (emblaRoot) => emblaRoot.parentElement,
  }
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true },[Autoplay(autoplayOptions),])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])
  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        <div className={styles.embla__slide}>Slide 1</div>
        <div className={styles.embla__slide}>Slide 2</div>
        <div className={styles.embla__slide}>Slide 3</div>
        {
          slides(Images)
        }
      </div>
    </div>
  )
}

export default Banners