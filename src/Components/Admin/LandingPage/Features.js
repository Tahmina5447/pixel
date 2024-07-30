import { Icon } from '@iconify/react';
import React from 'react';

const Features = ({data,loading}) => {

    return (
        <div className=''>
            <div>
                <div className='border-2 border-dashed border-primary px-4 py-2 md:px-8 md:py-4 rounded-lg'>
                    <h1 className='text-[18px] md:text-[28px] font-bold text-center text-primary'>
                        {data?.featureTitle}
                        </h1>
                </div>
                <div className='landing-page-feature' dangerouslySetInnerHTML={{ __html: data?.features }}>
                </div>
                {/* <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div> */}
                {/* <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-lg bg-white shadow-md mt-2 md:mt-3 text-[12px] md:text-[18px] text-orange-500'>
                    <span><Icon icon="icomoon-free:arrow-right" /></span>
                    <h1 className=''>ব্লু কাট লেন্সের চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ চশমা ব্যবহারের উল্লেখযোগ্য উপকারিতা সমূহ</h1>
                </div> */}


            </div>

        </div>
    );
};

export default Features;