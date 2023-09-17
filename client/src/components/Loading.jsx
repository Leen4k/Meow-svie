import React from 'react'
import {motion} from "framer-motion"

const Loading = () => {
  return (
    <section className="col-span-10">
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }} className="grid grid-cols-10 gap-24">
            <div role="status" className="space-y-8 col-span-6 animate-pulse w-full px-[.7rem]">
                <div className="flex items-center w-full space-x-2">
                    <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                </div>
                <div className="flex flex-col justify-center w-full gap-4 pt-4">
                    <div className="h-4 bg-gray-300 rounded-lg dark:bg-gray-600 w-full"></div>
                    <div className="h-4 bg-gray-400 rounded-md dark:bg-gray-600 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-600 w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded-md dark:bg-gray-600 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-600 w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded-md dark:bg-gray-600 w-[90%]"></div>
                </div>
                <div className="flex items-center w-full space-x-2">
                    <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                </div>
                <div className="flex flex-col justify-center w-full gap-4 pt-4">
                    <div className="h-4 bg-gray-300 rounded-lg dark:bg-gray-600 w-full"></div>
                    <div className="h-4 bg-gray-400 rounded-md dark:bg-gray-600 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-600 w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded-md dark:bg-gray-600 w-[90%]"></div>
                    <div className="h-4 bg-gray-300 rounded-lg dark:bg-gray-600 w-full"></div>
                    <div className="h-4 bg-gray-400 rounded-md dark:bg-gray-600 w-1/2"></div>
                </div>
            </div>


            <div role="status" class="w-full col-span-4 p-4 space-y-12 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <span class="sr-only">Loading...</span>
            </div>

        </motion.div>




    </section>
  )
}

export default Loading