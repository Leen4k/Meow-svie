import React from 'react'

const Cinema = () => {
  return (
    <section className="col-span-6 px-8">
        <h2 className="py-[.7rem]">Cinema</h2>
        <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden">
            <img className="cursor-pointer" src="https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/23cba0d9-2fcd-4720-a41d-f66092e17a00.jpeg?im_w=1200" alt="" />
            <img className="cursor-pointer" src="https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/f3d5a15f-f9cb-4ede-bf61-cf3c1cef5f8c.jpeg?im_w=1440" alt="" />
            <img className="cursor-pointer" src="https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/95a22c29-b2f2-4e6e-b8f2-0a717ae46fbd.jpeg?im_w=1440" alt="" />
        </div>
    </section>
  )
}

export default Cinema