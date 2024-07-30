import React from 'react';
import Select from "react-select";
import { Tooltip } from 'react-tooltip';
import { Icon } from '@iconify/react';
import FetchGetHook from '../../../../lib/FetchGetHook';
import { useState } from 'react';
import server_url from '../../../../lib/config';
import { useEffect } from 'react';
import Image from 'next/image';
import CustomModal from '../../../Shared/CustomModal';
import Link from 'next/link';
const Users = ({ setSelectedUser, selectedUser }) => {
    const [users, setUsers] = useState([]);
    const [reloader, setReloder] = useState(true);
    const userName = selectedUser?.fullName
    let baseUrl = server_url + "/user";
    useEffect(() => {
        FetchGetHook(baseUrl, setUsers);
    }, [baseUrl, reloader]);

    const handleSelectedUser = (user) => {
        setSelectedUser(user.value)
    }
    // option filed
    const options = users.map((user) => ({
        value: user,
        label: `${user.fullName} - ${user.phone ? user.phone : user.email}`, // Display both fullName and phone
    }));

    return (
        <div className=''>
            <div className='bg-white rounded-lg p-3 shadow-md'>
                <div className="w-full">
                    <label htmlFor="name" className="leading-7 text-sm font-bold ">
                        <p>Select User</p>
                    </label>
                    <div className="flex w-full">
                        <Select
                            defaultValue={userName}
                            onChange={handleSelectedUser}
                            name="user"
                            required
                            options={options}
                            className="outline-none w-full  border rounded-lg rounded-e-none focus:border-primary "
                            id='choose_account_category'
                            classNamePrefix="select"
                            isSearchable
                        />
                        {/* ----------------Create new user------------------ */}

                        <Tooltip anchorSelect="#create_new_user">
                            Create New User
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;