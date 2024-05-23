import React from 'react'
import { PersonType } from '../../../lib/interfaces'

interface TableProps {
  people: PersonType[]
}

export default function Table({ people }: TableProps) {
  return (
    <div>Table</div>
  )
}
