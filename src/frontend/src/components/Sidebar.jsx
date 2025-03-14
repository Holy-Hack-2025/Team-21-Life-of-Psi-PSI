import { motion } from 'motion/react'

const Sidebar = () => {
  return (
    <div>
      <aside className='fixed top-0 left-0 z-40 w-64 h-screen'>
        <div className='h-full px-3 py-4 overflow-y-auto bg-white border-r-2'>
          <h1 className='text-2xl font-extrabold mt-12 ml-5'>
            Untitled Project
          </h1>
          <ul className='ml-5 mt-7 space-y-2 text-[1rem]'>
            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='/document'
                className='flex items-center p-2 text-gray-900 rounded-md hover:bg-black hover:text-white transition-colors duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                  />
                </svg>

                <span className='ms-3'>Document</span>
              </a>
            </motion.li>
            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='/chat'
                className='flex mt-3 items-center p-2 text-gray-900 rounded-md hover:bg-black hover:text-white transition-colors duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                  />
                </svg>

                <span className='ms-3'>Chat</span>
              </a>
            </motion.li>
            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='/dashboard'
                className='flex mt-3 items-center p-2 text-gray-900 rounded-md hover:bg-black hover:text-white transition-colors duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z'
                  />
                </svg>

                <span className='ms-3'>Dashboard</span>
              </a>
            </motion.li>
            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='/profile'
                className='flex mt-3 items-center p-2 text-gray-900 rounded-md hover:bg-black hover:text-white transition-colors duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>

                <span className='ms-3'>Profile</span>
              </a>
            </motion.li>

            <br />
            <span className='text-gray-500 text-[0.9rem] text-center'>
              PREVIOUS DOCUMENTS
            </span>

            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='#'
                className='flex items-center p-2 mt-5 text-[0.87rem]  text-gray-900 rounded-md hover:italic transition-all duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                  />
                </svg>

                <span className='ms-3'>steel_dump_mon.log</span>
              </a>
            </motion.li>

            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='#'
                className='flex items-center p-2 mt-2 text-[0.87rem]  text-gray-900 rounded-md hover:italic transition-all duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                  />
                </svg>

                <span className='ms-3'>steel_dump_tue.log</span>
              </a>
            </motion.li>
            <motion.li whileTap={{ scale: 0.9 }}>
              <a
                href='#'
                className='flex items-center p-2 mt-2 text-[0.87rem]  text-gray-900 rounded-md hover:italic transition-all duration-100 group'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                  />
                </svg>

                <span className='ms-3'>galvanised_italy.xml</span>
              </a>
            </motion.li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
