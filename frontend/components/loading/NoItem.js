import React from 'react'
import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/router';

const NoItem = () => {
  const router = useRouter();

  return (
    <div>
      <div className='flex justify-center min-h-screen'>
        <div role="status">
          <div className='flex justify-center font-semibold text-gray-600 my-4'>No Friends Available</div>
          <img className='w-60' src="/noItem.png" alt="noitem" />
          <span className="sr-only">Loading...</span>
          <div className='flex justify-center my-5'>
            {/* <Button className='rounded-full' onClick={() => { router.push("/screen/search") }}>Add Friends</Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default NoItem