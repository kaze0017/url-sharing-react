
interface CountProps {
    count: number
}

export default function Count({count}: CountProps) {
  return (

    //show count in k and m
    <div className='text-gray-500 text-2xs font-medium'>
        {count > 1000000 ? `${Math.round(count / 1000000)}m` : count > 1000 ? `${Math.round(count / 1000)}k` : count}
    </div> 
  )
}
