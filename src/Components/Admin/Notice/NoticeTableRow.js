import React, { useState } from 'react';
import { server_url_v3 } from '../../../../lib/config';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import swal from 'sweetalert';

const NoticeTableRow = ({ data, refetch, index }) => {
    const [deleteId, setDeleteId] = useState(null)
    const handleDelete = (id) => {
        setDeleteId(id)
        // console.log(deleteId)
        fetch(`${server_url_v3}/custom/${deleteId}?modelName=Notice`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.status === "success") {
                    refetch();
                    swal("Notice has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }
    return (
        <>

            <tr className="border-b border-opacity-20 border-gray-500 ">
                <td className="p-3 text-left text-sm">
                    {index + 1}
                </td>
                <td className="p-3 text-left text-sm">
                    <p>{data?.notice}</p>
                </td>
                <td className="p-3 text-left text-sm ">
                    <span className='flex items-center gap-2'>
                        <Link href={`/admin/notice/update-notice?id=${data?._id}`} id='change_date' className='cursor-pointer'> <Icon className='text-yellow-600 text-lg' icon="bx:edit" /></Link>

                        <span onClick={() => handleDelete(data?._id)} id='delete_table_expense' className='cursor-pointer '><Icon className='text-red-600 text-lg' icon="material-symbols:delete-outline" /></span>
                    </span>
                </td>

            </tr>
        </>
    );
};

export default NoticeTableRow;