"ue client"
import { PencilLine } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Edit = ({id}:{id: string}) => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <div className='px-2 py-[0.6rem] cursor-pointer rounded-md bg-blue-1 hover:bg-blue-500 duration-150 ease-in-out text-white' onClick={() => router.push(`${pathname}/${id}`)}>
        <PencilLine className='h-4 w-4'/>
    </div>
  )
}

export default Edit
