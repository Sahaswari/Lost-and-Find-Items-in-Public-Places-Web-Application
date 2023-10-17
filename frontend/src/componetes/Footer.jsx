

const Footer = () => {
  return (
    <>
    <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm
    md:text-md py-8 ">
      <div className="flex flex-col text-white">
        <p>Featured Blogs</p>
        <p>Most viewed</p>
        <p>Readres choice</p>
      </div>

      <div className="flex flex-col text-white">
        <p>Forum</p>
        <p>support</p>
        <p>Resend posts</p>
      </div>

      <div className="flex flex-col text-white">
        <p>Privacy Policy</p>
        <p>About us</p>
        <p>Term & Conditions</p>
        <p>Term & Service</p>
      </div> 
    </div>
    <p className="py-2 pb-6 text-center text-white bg-black text-sm">
      All rights reserved @Find Your Losted Things 2023</p>
    </>
  )
}

export default Footer
