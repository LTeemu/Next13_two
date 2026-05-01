'use client'
import React, { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SvgEmoji from '@/components/svg/SvgEmoji';
import useMenu from '@/stores/useMenuStore';

export default function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const homeContainer = useRef();
  const { isMenuOpen } = useMenu();
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const homeTL = useRef(gsap.timeline({ paused: true, defaults: { ease: 'elastic.out(1, 0.8)', duration: 1.6, delay: 0 } }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      homeTL.current = gsap.timeline({ paused: true })
        .fromTo('#home-svg',
          { x: 0, scale: 1, rotateZ: 0, autoAlpha: 1 },
          { xPercent: 50, scale: 0.8, rotateZ: -20, autoAlpha: 0 }
        );

      homeTL.current.reverse();
    });

    return () => {
      ctx.revert();
      homeTL.current = null;
    };
  }, []);

  useEffect(() => {
    if (!homeTL.current) return;

    if (isMenuOpen) {
      homeTL.current.timeScale(1).play();
    } else {
      homeTL.current.timeScale(2).reverse();
    }
  }, [isMenuOpen]);

  return (
    <>
      <section ref={homeContainer} className='p-4 min-h-[100vmin] overflow-hidden'>
        <div className='grid grid-cols-2 h-96 justify-around py-6'>
          <div className='grid my-auto gap-y-6'>
            <h1 className='text-5xl font-extrabold'>Good Vibes Only</h1>
            <button className='text-zinc-900 hover:scale-105 duration-300 bg-gradient-to-r from-yellow-400 to-yellow-500 w-max rounded-md py-2 px-4 font-extrabold'>EXPLORE NOW</button>
          </div>

          <div id="home-svg" className='grid justify-end -mr-4'>
            <SvgEmoji trackMouse={!isMenuOpen} container={homeContainer} className="relative w-full h-full translate-x-1/2" />
          </div>
        </div>

        <div className='max-w-5xl [&>div:hover]:text-yellow-500 [&>div]:duration-300 [&>div:hover]:scale-105 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 [&>div]:rounded-lg [&>div]:overflow-hidden'>
          <div>
            <img src="/images/apparel.png" alt="Apparel" className='object-contain' />
            <p className='mt-2 font-bold'>Apparel</p>
          </div>
          <div>
            <img src="/images/accessories.png" alt="Accessories" className='object-contain' />
            <p className='mt-2 font-bold'>Accessories</p>
          </div>
          <div>
            <img src="/images/art.png" alt="Art" className='object-contain' />
            <p className='mt-2 font-bold'>Art</p>
          </div>
          <div>
            <img src="/images/music.png" alt="Music" className='object-contain' />
            <p className='mt-2 font-bold'>Music</p>
          </div>
        </div>

        <h2 className='text-2xl font-bold mt-6 mb-3'>New Arrivals</h2>
        <div className='border-2 border-zinc-800 h-60 rounded-lg overflow-hidden'>
          <Swiper
            spaceBetween={0}
            slidesPerView={'auto'}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
              type: 'bullets',
              bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-100',
              bulletActiveClass: '!bg-yellow-700 !scale-150 border-2 border-white',
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="[&_.swiper-button-next]:text-yellow-600 [&_.swiper-button-prev]:text-yellow-600 bg-gray-200 [&_.swiper-pagination-bullet-active]:bg-yellow-500"
          >
            <SwiperSlide>
              <img src="/images/slide1.jpg" alt="New Arrival 1" className='object-fit' />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slide2.jpg" alt="New Arrival 2" className='object-fit' />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slide3.jpg" alt="New Arrival 3" className='object-fit' />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slide4.jpg" alt="New Arrival 4" className='object-fit' />
            </SwiperSlide>
            
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle className="stroke-yellow-600" cx="24" cy="24" r="20"></circle>
              </svg>
              <span className="text-xs font-bold text-yellow-950" ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </section>
    </>
  )
}