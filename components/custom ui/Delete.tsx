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
  item: string
}

const Delete : React.FC<IDeleteProps> = ({id,item}) => {

  const [loading, setLoading] = useState(false)

  const onDelete = async () => {

    try {

      setLoading(true)
      const itemTpype = item === "collection" ? "collections" : "products"
      console.log("check delete id", id, itemTpype);
      
    const res = await fetch(`/api/${itemTpype}/${id}`,{
      method:"DELETE"
    })

    console.log("check delete", res);
    

    if(res.ok) {
      setLoading(false)
      window.location.href = (`/${itemTpype}`)
      toast.success(`${itemTpype} is deleted`)
    }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again!")
    }

  }

  return (
    
    <AlertDialog>
  <AlertDialogTrigger>
    <div className='px-2 py-[0.6rem] cursor-pointer rounded-md bg-red-1 hover:bg-red-400 duration-150 ease-in-out text-white'>
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
