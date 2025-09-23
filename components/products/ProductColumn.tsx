"use client"

import React from 'react'

import { ColumnDef } from "@tanstack/react-table"
import Delete from '../custom ui/Delete'
import Edit from '../custom ui/Edit'


export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell : ({row}) => <p>{row.original.title}</p>
  },
  {
    accessorKey: "category",
    header: "Category",
    cell : ({row}) => <p>{row.original.category}</p>
  },
   {
    accessorKey: "collections",
    header: "Collections",
    cell : ({row}) => row.original.collections.map((item : CollectionType) => item.title).join(", ")
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell : ({row}) => <p>{row.original.price}</p>
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
    cell : ({row}) => <p>{row.original.expense}</p>
  },
  {
    id : "actions",
    cell : ({row})=> <div className='flex gap-2 items-center'>
      <Delete id = {row.original._id} item="product"/>
      <Edit id = {row.original._id}/>
    </div>
  },
]