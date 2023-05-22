'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { usePathname } from 'next/navigation'
import SvgEmoji from './svg/SvgEmoji';
import { GrGithub } from 'react-icons/gr'

export default function Header() {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Page 2', href: '/page2' },
    { name: 'Lighters', href: '/lighters' },
    { name: 'Goats', href: '/goats' },
    { name: 'Amazon', href: '/amazon' },
    { name: 'Broken links', href: '/broken-links' },
    { name: 'Airplanes', href: '/airplanes' },
    { name: 'Wrestling', href: '/wrestling' },
    { name: 'Rhinoceros', href: '/rhinoceros' },
    { name: 'Swings', href: '/swings' },
    { name: 'Bread', href: '/bread' },
  ]

  const [open, setOpen] = useState(false);
  const menuTL = useRef(gsap.timeline({ paused: true, defaults: { ease: 'linear', duration: 0.4, delay: 0 } }))
  const menuUL = useRef()
  const menuContainer = useRef()
  const path = usePathname()

  useEffect(() => {
    let menuLinks = menuContainer.current.querySelectorAll('ul li')
    const ctx = gsap.context(() => {
      menuTL.current
        .fromTo(menuContainer.current, { xPercent: 0 }, { xPercent: 100 })
        .addLabel('label1')
        .fromTo(menuLinks, { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.08, ease: 'back.out(4)' })
        .set('#svg', { autoAlpha: 1 }, '<label1')
        .fromTo('#svg', { x: '100%', rotate: -60, scale: 0.9 }, { xPercent: -50, rotate: -0, scale: 1, ease: "elastic.out(1, 0.8)", duration: 4 }, '<')
        .reverse()
        .paused(true)
    })
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open) {
      if (menuUL.current.scrollTop !== 0) { menuUL.current.scrollTop = 0 }
      menuTL.current.timeScale(1).reversed(false).play()
    } else {
      menuTL.current.seek('label1').timeScale(2).reversed(true)
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    open && window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [open]);

  useEffect(() => {
    menuTL.current.seek(0)
  }, []);

  useEffect(() => {
    open && setOpen(!open)
  }, [path]);

  return (
    <header className='h-screen'>
      <div id='sidebar' className={`sticky text-zinc-100 z-20 flex flex-col h-full px-2 bg-zinc-800 ${open && 'invert contrast-150'}`}>
        <button title={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} className='flex-1'>
          <div className={`relative [&>span]:transition-all [&>span]:duration-[280ms] [&>span]:ease-circle [&>span]:absolute [&>span]:w-full [&>span]:h-[0.12em] w-5 h-4 flex flex-col justify-center [&>span]:bg-zinc-100`}>
            <span className={open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-0'}></span>
            <span className={open ? 'rotate-45' : ''}></span>
            <span className={open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'}></span>
          </div>
        </button>

        <div className='grid py-2 border-t-2 border-dashed gap-y-2 border-t-zinc-600'>
          <div className='grid place-content-center'>
            <span className={`text-lg leading-[0] tracking-widest`} style={{ writingMode: 'vertical-rl' }}>TL</span>
          </div>
          <Link href='https://github.com/lteemu' title='Github' target='_blank' className='hover:contrast-75'>
            <GrGithub style={{ fontSize: '1.4rem' }} />
          </Link>
        </div>
      </div>

      <nav ref={menuContainer} id='menu' className='fixed top-0 grid w-screen h-screen bg-zinc-800 right-full'>
        <ul ref={menuUL} className='z-20 grid w-full max-h-screen py-6 pl-12 overflow-x-hidden overflow-y-auto text-3xl font-bold tracking-wider gap-y-1 place-self-center'>
          {links.map(link => {
            return (
              <li key={link.href} className={`w-full max-w-2xl mx-auto text-white ${path === link.href && 'pointer-events-none invert-[0.4]'}`}>
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

        <div id='svg' className='h-[80vmin] my-auto z-10 absolute brightness-50 sm:brightness-100 invisible aspect-square right-0 top-[50%] -translate-y-1/2'>
          <SvgEmoji open={open} container={menuContainer.current} />
        </div>
      </nav>
    </header >
  )
}
