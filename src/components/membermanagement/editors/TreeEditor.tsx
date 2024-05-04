import React from 'react'
import TreeChart from '../TreeChart'
import { treeData } from '../../../lib/placeholder-data'
export default function TreeEditor() {
  return (
    <div>
      <TreeChart data={treeData} />
    </div>
  )
}
