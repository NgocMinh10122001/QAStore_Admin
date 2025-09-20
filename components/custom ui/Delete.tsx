"use client"
import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from 'react'
import toast from 'react-hot-toast'

interface IDeleteProps {
  id: string
}

const Delete : React.FC<IDeleteProps> = ({id}) => {

  const [loading, setLoading] = useState(false)

  const onDelete = async () => {

    try {

      setLoading(true)

    const res = await fetch(`/api/collections/${id}`,{
      method:"DELETE"
    })

    if(res.ok) {
      setLoading(false)
      window.location.href = ("/collections")
      toast.success("collection is deleted")
    }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again!")
    }

  }

  return (
    
    <AlertDialog>
  <AlertDialogTrigger>
    <div className='px-2 py-[0.6rem] cursor-pointer rounded-md bg-red-1 text-white'>
        <Trash className='h-4 w-4'/>
    </div>
  </AlertDialogTrigger>
  <AlertDialogContent className='bg-white text-grey-1'>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className='bg-blue-1 hover:bg-blue-500' onClick={onDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default Delete
