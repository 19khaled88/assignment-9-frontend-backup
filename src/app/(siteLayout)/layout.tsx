'use client'
import Navbar from "@/components/navbar/navbar";
import { Footer } from "@/components/ui/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SiteLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

 // const ref = useRef(null)
    // const isInView = useInView(ref)
    // useEffect(() => {
    //     AOS.init({
    //         delay:30,
    //         duration:400,
    //         easing:'ease-out',
    //         once:false,
    //         mirror:true,
    //         offset:120,
    //         debounceDelay:50,
    //         throttleDelay:99
    //     });
    //     AOS.refresh();
    //   }, [isInView]);

  //  AOS && AOS.init({
  //     // duration: 1200,
  //     disable: false,
  //     startEvent: 'load',
  //     initClassName: 'aos-init',
  //     animatedClassName: 'aos-animate',
  //     useClassNames: false,
  //     disableMutationObserver: false,
  //     debounceDelay: 50,
  //     throttleDelay: 99,

  //     // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  //     offset: 120,
  //     delay: 0,
  //     duration: 400,
  //     easing: 'ease-in-out-quad',
  //     once: false,
  //     mirror: false,
  //     anchorPlacement: 'top-bottom'
  //   })



  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />
      <ToastContainer />
      {children}
      <Footer />
    </section>
  )
}