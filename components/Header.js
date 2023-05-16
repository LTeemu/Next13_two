'use client'
import Link from 'next/link'
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from "gsap";
import SvgMoon from './svg/SvgMoon';
import { usePathname } from 'next/navigation'

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
  const menuTL = useRef();
  const menuUL = useRef();
  const path = usePathname()

  useLayoutEffect(() => {
    menuTL.current = gsap.timeline({ paused: true, defaults: { ease: 'linear', duration: 0.4, delay: 0 } })
    const ctx = gsap.context(() => {
      menuTL.current
        .fromTo('#menu', { xPercent: 0 }, { xPercent: 100 })
        .to('#btn', { backgroundColor: 'white' }, '<')
        .to('#btn span', { color: 'black' }, '<')
        .addLabel('label1')
        .fromTo('#menu ul li', { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.08, ease: 'back.out(4)' })
        .set('#svg', { autoAlpha: 1 })
        .fromTo('#svg', { x: '100%', rotate: -60, scale: 0.6 }, { xPercent: -52, rotate: -72, scale: 1, ease: "elastic.out(1, 0.32)", duration: 4 })
        .reverse()
        .paused(true)
    })
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (open) {
      if (menuUL.current.scrollTop !== 0) { menuUL.current.scrollTop = 0 }
      menuTL.current.timeScale(1).reversed(false).play()
    } else {
      menuTL.current.seek('label1').timeScale(2).reversed(true)
    }
  }, [open]);

  useLayoutEffect(() => {
    menuTL.current.seek(0)
  }, []);

  useEffect(() => {
    open && setOpen(!open)
  }, [path]);

  return (
    <header>
      <nav id='menu' className='fixed top-0 grid w-screen h-screen from-zinc-800 to-white bg-gradient-to-r right-full'>
        <ul ref={menuUL} className='z-20 grid w-full max-h-screen py-6 pl-12 overflow-x-hidden overflow-y-auto text-3xl font-bold tracking-wider place-self-center'>
          {links.map(link => {
            return (
              <li key={link.href} className={`w-full max-w-2xl mx-auto text-white ${path === link.href && 'pointer-events-none invert'}`}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            )
          })}
        </ul>

        <div id='svg' className='h-[80vmin] z-10 absolute invisible aspect-square right-0 top-[50%] -translate-y-1/2'>
          <SvgMoon className='rounded-full fill-zinc-800 bg-gradient-radial from-stone-300 via-stone-400 to-black' />
        </div>
      </nav>
      <button id='btn' onClick={() => setOpen(!open)} className='sticky z-20 h-screen px-0.5 bg-zinc-800'>
        <span className='text-lg tracking-widest text-white' style={{ writingMode: 'vertical-rl' }}>Menu</span>
      </button>
    </header >
  )
}