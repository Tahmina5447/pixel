import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';

const PublicAllPage = ({ index, page }) => {
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

            </tr>
        </>
    );
};

export default PublicAllPage;