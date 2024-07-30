import React, { useState } from 'react';
import { server_url_v3 } from '../../../../lib/config';
import swal from 'sweetalert';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

const MagazineTableRow = ({ data, refetch }) => {
    const [deleteId, setDeleteId] = useState(null)
    const handleDelete = (id) => {
        setDeleteId(id)
        // console.log(deleteId)
        fetch(`${server_url_v3}/custom/${deleteId}?modelName=Blog`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.status === "success") {
                    refetch();
                    swal("Blog has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }
    return (
        <>

            <tr className="border-b border-opacity-20 border-gray-500 ">
                <td className="p-3 text-left text-sm">
                    {
                        data?.image ? <>
                            <Image src={data?.image} width={200} height={200} alt='Icon Image' className='w-5 h-5' />
                        </> : <>
                            <Icon className=' text-black text-xl' icon="mdi:image" />
                        </>
                    }

                </td>
                <td className="p-3 text-left text-sm">
                    <p>{data?.title?.slice(0,80)}...</p>
                </td>
                <td className="p-3 text-left text-sm ">
                    <span className='flex items-center gap-2'>
                        <Link href={`/magazine/${data?._id}`} id='change_date' className='cursor-pointer'> <Icon className=' text-lg' icon="carbon:view" /></Link>
                        <Link href={`/admin/magazine/update-magazine?id=${data?._id}`} id='change_date' className='cursor-pointer'> <Icon className='text-yellow-600 text-lg' icon="bx:edit" /></Link>

                        <span onClick={() => handleDelete(data?._id)} id='delete_table_expense' className='cursor-pointer '><Icon className='text-red-600 text-lg' icon="material-symbols:delete-outline" /></span>
                    </span>
                </td>

            </tr>
        </>
    );
};

export default MagazineTableRow;