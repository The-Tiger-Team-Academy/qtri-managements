import Image from 'next/image'
import qtric from '../qtric.svg'
export default function Logo() {
  return (
    <div className="flex justify-center items-center w-full">
      <Image 
        src={qtric}
        alt="QTRIC Logo"
        width={100}
        height={100}
        className="rounded"
        priority
      />
    </div>
  )
}