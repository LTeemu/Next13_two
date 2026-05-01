'use client'
import Link from 'next/link'
import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { usePathname } from 'next/navigation'
import SvgEmoji from './svg/SvgEmoji';
import { GrGithub } from 'react-icons/gr'
import useMenuStore from '@/stores/useMenuStore';

export default function Header() {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Apparel', href: '/apparel' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Art Prints', href: '/art-prints' },
    { name: 'Music', href: '/music' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'TikTok', href: 'https://tiktok.com' },
    { name: 'YouTube', href: 'https://youtube.com' },
  ];

  const menuTL = useRef(gsap.timeline({ paused: true, defaults: { ease: 'linear', duration: 0.4, delay: 0 } }))
  const menuUL = useRef()
  const menuContainer = useRef()
  const path = usePathname()
  const { isMenuOpen, toggleMenu, openMenu, closeMenu } = useMenuStore();

  useEffect(() => {
    let menuLinks = menuContainer.current.querySelectorAll('ul li')
    const ctx = gsap.context(() => {
      menuTL.current
        .fromTo(menuContainer.current, { xPercent: 0 }, { xPercent: 100 })
        .addLabel('label1')
        .fromTo(menuLinks, { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.08, ease: 'back.out(4)' })
        .set('#svg', { autoAlpha: 1 }, '<label1')
        .fromTo('#svg', { x: '100%', rotate: -60, scale: 0.9, autoAlpha: 0 }, { xPercent: -50, rotate: -0, scale: 1, ease: "elastic.out(1, 0.8)", duration: 4, autoAlpha: 1 }, '<')
        .reverse()
        .paused(true)
    })
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      if (menuUL.current.scrollTop !== 0) { menuUL.current.scrollTop = 0 }
      document.body.style.overflow = 'hidden';
      menuTL.current.timeScale(1).reversed(false).play()
    } else {
      document.body.style.overflow = 'auto';
      menuTL.current.seek('label1').timeScale(2).reversed(true)
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    isMenuOpen && window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isMenuOpen]);

  useEffect(() => {
    menuTL.current.seek(0)
  }, []);

  useEffect(() => {
    isMenuOpen && closeMenu()
  }, [path]);

  return (
    <header className='z-10 h-full w-[2.4rem]'>
      <aside className={`fixed text-zinc-100 z-30 flex flex-col flex-1 items-center h-full w-[2.4rem] bg-zinc-800 ${isMenuOpen && 'invert contrast-150'}`}>
        <button title={isMenuOpen ? 'Close menu' : 'Open menu'} onClick={toggleMenu} className='flex-1 hover:bg-zinc-700 transition-colors duration-200 focus:outline-none rounded-md p-2 [&>div>span]:hover:bg-yellow-300' aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
          <div className={`relative [&>span]:transition-all [&>span]:duration-[280ms] [&>span]:ease-circle [&>span]:absolute [&>span]:w-full [&>span]:h-1/6 w-5 h-4 flex flex-col justify-center [&>span]:bg-zinc-100`}>
            <span className={isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-0'}></span>
            <span className={isMenuOpen ? 'rotate-45' : ''}></span>
            <span className={isMenuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'}></span>
          </div>
        </button>

        <div className='grid py-2 border-t-2 border-dashed gap-y-2 border-t-zinc-600'>
          <div className='grid place-content-center'>
            <span className={`text-lg leading-[0] tracking-widest font-rubik`} style={{ writingMode: 'vertical-rl' }}>TL</span>
          </div>
          <Link href='https://github.com/lteemu' title='Github' target='_blank' className='hover:brightness-75'>
            <GrGithub style={{ fontSize: '1.4rem' }} />
          </Link>
        </div>
      </aside>

      <nav ref={menuContainer} id='menu' className='fixed top-0 grid w-screen h-full bg-zinc-800 right-full'>
        <ul ref={menuUL} className='z-20 grid w-full max-h-screen py-8 pl-12 overflow-x-hidden overflow-y-auto text-3xl font-bold tracking-wider gap-y-1 place-self-center'>
          {links.map(link => {
            return (
                <li key={link.href} className={`w-full max-w-2xl mx-auto text-white hover:text-yellow-300 transition-colors duration-200 ${path === link.href && 'pointer-events-none invert-[0.4]'}`}>
                  <Link
                  onMouseEnter={() => gsap.to('#emojimouth', { scaleY: 1 })}
                  onMouseLeave={() => gsap.to('#emojimouth', { scaleY: 0.2 })}
                    href={link.href}
                    tabIndex={path === link.href ? -1 : 0}
                  >
                    {link.name}
                  </Link>
                </li>
            )
          })}
        </ul>

        <div id='svg' className='h-[80vmin] grid self-center z-10 fixed brightness-50 sm:brightness-100 invisible aspect-square right-0'>
          <SvgEmoji trackMouse={isMenuOpen} container={menuContainer} />
        </div>
      </nav>
    </header >
  )
}
