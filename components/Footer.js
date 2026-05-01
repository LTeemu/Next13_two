export default function Footer() {
  return (
    <footer className='p-2 text-stone-400 text-sm px-6 gap-y-6 grid'>
      <p className="text-3xl text-yellow-500 font-extrabold">SMILEYBR😊ND</p>
      <p>Spreading relentless positivity through high-quality products and services. </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-4'>
        <div className='grid gap-y-1 h-min'>
          <p className='font-bold'>Shop</p>
          <p>Apparel</p>
          <p>Accessories</p>
          <p>Art Prints</p>
          <p>Music</p>
          <p>New Arrivals</p>
        </div>

        <div className='grid gap-y-1 h-min'>
          <p className='font-bold'>Connect</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>TikTok</p>
          <p>YouTube</p>
          <p>Contact Us</p>
        </div>

        <div className='grid gap-y-1 h-min'>
          <p className='font-bold'>Company</p>
          <p>About Us</p>
          <p>Careers</p>
        </div>
      </div>

      <p className='text-xs text-right opacity-50'>&copy; {new Date().getFullYear()} Good Vibes Only. Rights not reserved.  </p>
    </footer>
  );
}
