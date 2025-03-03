import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex justify-center items-center w-full">
      <Image 
        src="/images/qtric.png"
        alt="Tiger Team Academy Logo"
        width={100}
        height={100}
        className="rounded"
        priority
      />
    </div>
  )
}