import { Icon } from '@iconify/react';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import { deleteMethod } from '../../../../lib/usePostHooks';
import { server_url_v2 } from '../../../../lib/config';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AllPageData = ({ index, page, refetch }) => {
    const router = useRouter()

    const handleEditProduct = (id) => {
        router.push(`/admin/landing-page/update-page?id=${id}`);
    };

    const handleDelete = (id) => {
        const url = `${server_url_v2}/landing-page/${id}`
        deleteMethod(url, refetch)
    }
    return (
        <>
            <tr>
                <td className="py-3"  >
                    <p>{index + 1}</p>
                </td>
                <td className="py-3" >
                    <p>{page?.title1?.slice(0, 20)}...</p>
                </td>
                <td className="py-3" >
                    <Link href={`/landing-page/public/${page?._id}`} target='_blank'>
                        <Icon icon="ph:eye" />
                    </Link>
                </td>
                <td className="py-3" >
                    <span className='flex items-center gap-2'>
                        <Tooltip anchorSelect="#edit-page">
                            Edit Page
                        </Tooltip>
                        <span id='edit-page' className='cursor-pointer'> <Icon onClick={() => handleEditProduct(page._id)} className='text-yellow-600 text-lg' icon="bx:edit" /></span>
                        <Tooltip anchorSelect="#delete-page">
                            Delete Page
                        </Tooltip>

                        <span id='delete-page' className='cursor-pointer '><Icon onClick={() => handleDelete(page._id)} className='text-red-600 text-lg' icon="material-symbols:delete-outline" /></span>
                    </span>
                </td>
            </tr>
        </>
    );
};

export default AllPageData;