import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { navLinks } from '@/lib/constants'


const LeftSideBar = () => {
  return (
    <div className='h-screen top-0 left-0 sticky p-10 flex flex-col gap-16 bg-blue-2  shadow-xl max-lg:hidden'>
      <Image src={""} alt='logo' width={150} height={70}/>
      <div className='flex flex-col gap-12'>
        {navLinks.map((link) => {
            return <Link key={link.label} href={link.url} className='flex gap-4 text-body-medium items-center'>{link.icon}<p>{link.label}</p></Link>
        })}
      </div>
      <div className='flex gap-4 text-body-medium items-center'>
        <UserButton/>
        <p>Edit Profile</p>
      </div>
    </div>
  )
}

export default LeftSideBar
