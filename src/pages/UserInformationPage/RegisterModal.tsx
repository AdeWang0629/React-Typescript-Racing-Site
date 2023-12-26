import { useEffect, useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';

import { Label } from 'semantic-ui-react';

import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { user_role_data } from '../../config/global';
import actions from '../../redux/UserManagement/actions';

interface IRegisterModal {
    _open: boolean;
    showModal: any;
    editData: any;
}

const RegisterModal : React.FC<IRegisterModal> = ({_open, showModal, editData}) => {
    const [open, setOpen] =  useState(_open);

    const dispatch = useDispatch();

    useEffect(()=>{
        setOpen(_open);
    },[_open]);


    const handleCancel = () => {
        setOpen(!open);
        showModal();
    };

    const handleOk = () => {
        const body = {
            user_name: user_name,
            user_role: user_role
        };
        dispatch({
            type: actions.UPDATEUSERMANAGEMENTDATA,
            payload: {
                data: body,
                id: editData.real_id
            },
        });
        setOpen(!open);
        showModal();
    };

    const [user_name, handleUserName] = useState(''); 
    const [user_role, handleUserRole] = useState();

    useEffect(()=>{
        handleUserName(editData.user_name);
        handleUserRole(editData.user_role);
    },[editData]);

    return (

        <Modal
            open={open}
            // style={{ top: '30vh' }}
            title="新 規 登 録"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, }) => (
                <div className='pr-6'>
                    <Button className="w-full" onClick={handleOk}>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
                </div>
            )}
            width={400}
        >

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-32'>
                    お　名　前
                </Label>
                <Input placeholder="レース名" className='w-full lg:w-64' onChange={(e) => handleUserName(e.target.value)} value={user_name}/>

            </div>

            {/* { userNameError && (<Text type="danger" className='p-20'>レース名を選択してください。</Text>) } */}

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-32'>
                    ユーザー種別
                </Label>
                <Select
                    value={user_role}
                    className='w-full lg:w-64'
                    onChange={handleUserRole}
                    options={user_role_data}
                />

            </div>
            
            {/* { monthDataError && (<Text type="danger" className='p-20'>集計月を選択してください。</Text>) } */}

        </Modal>             
    )
}

export default RegisterModal;