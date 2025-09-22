"use client"

import React from 'react'

import { ColumnDef } from "@tanstack/react-table"
import Delete from '../custom ui/Delete'
import Link from 'next/link'
import Edit from '../custom ui/Edit'


export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell : ({row}) => <p>{row.original.title}</p>
  },
  {
    accessorKey: "products",
    header: "Products",
    cell : ({row}) => <p>{row.original.products.length}</p>
  },
  {
    id : "actions",
    cell : ({row})=> <div className='flex gap-2 items-center'>
      <Delete id = {row.original._id}/>
      <Edit id = {row.original._id}/>
    </div>
  },
]