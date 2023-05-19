import { gsap } from 'gsap';
import { useEffect, useLayoutEffect } from 'react';
var _ = require('lodash');

const SvgEmoji = (props) => {
  useLayoutEffect(() => {
    let eyeX
    let eyeY

    const calcRange = () => {
      let containerSize = props.container?.getBoundingClientRect()
      eyeX = gsap.utils.mapRange(0, containerSize?.width, -30, 30)
      eyeY = gsap.utils.mapRange(0, containerSize?.height, -30, 30)
    }
    calcRange()

    const moveEye = (e) => {
      gsap.to('#eyeR', { translateX: eyeX(e.clientX), translateY: eyeY(e.clientY), duration: 0.1, ease: "linear" })
    }

    if (props.open) {
      window.onmousemove = _.throttle((e) => moveEye(e), 100)
      window.onresize = _.throttle(calcRange, 200)
    } else {
      window.onmousemove = null
      window.onresize = null
    }
  }, [props]);

  gsap.set('#emojimouth', { scaleY: 0.2 })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <circle cx="250" cy="250" r="250" fill="#FFD434" />
      <path fill="#FAC12C" d="M389 42a249 249 0 0 1-181 422c-52 0-100-15-139-42A250 250 0 1 0 389 42z" />

      <circle cx="145" cy="202.2" r="81" fill="#FAC12C" />
      <g className='animate-eyeblink'>
        <circle cx="145" cy="202.2" r="62.1" fill="#FFF" />
        <g id="eyeR">
          <circle cx="145" cy="202.2" r="38.6" fill="#3D4349" />
          <path fill="#FFF" d="M172 201c-2 0-3-1-4-3a25 25 0 0 0-28-20c-2 0-4-1-4-3-1-2 1-4 2-4a32 32 0 0 1 37 26c0 2-1 4-3 4z" />
        </g>
      </g>

      <circle cx="355" cy="202.2" r="81" fill="#FAC12C" />
      <circle cx="355" cy="202.2" r="62.1" fill="#FFF" />
      <circle cx="355" cy="202.2" r="38.6" fill="#3D4349" />
      <path fill="#FFF" d="M382 201c-2 0-3-1-4-3a25 25 0 0 0-28-20c-2 0-4-1-4-3-1-2 1-4 2-4a32 32 0 0 1 37 26c0 2-1 4-3 4z" />
      <path id='emojimouth' fill="#CE9F24" d="M317 379H191a27 27 0 1 1 0-54h126c15 0 27 12 27 27s-12 27-27 27z" />
    </svg >
  )
}

export default SvgEmoji;