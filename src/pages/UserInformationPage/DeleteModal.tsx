import { useEffect, useState } from 'react';
import { Modal} from 'antd';
import { Button, Message } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/UserManagement/actions';

interface IRegisterModal {
    _open: boolean;
    showModal: any;
    editData: any;
}

const DeleteModal : React.FC<IRegisterModal> = ({_open, showModal, editData}) => {
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
        dispatch({
            type: actions.FORMATUSERMANAGEMENTDATA,
            payload: {
                id: editData.real_id
            },
        });
        setOpen(!open);
        showModal();
    };

    return (

        <Modal
            open={open}
            // style={{ top: '30vh' }}
            closable={false}
            footer={() => (
                <div className='w-full flex justify-center items-center'>
                    <div className='w-40 pr-6'>
                        <Button className="w-full" secondary onClick={handleCancel}>キ&nbsp;ャ&nbsp;ン&nbsp;セ&nbsp;ル</Button>
                    </div>
                    <div className='w-40 pr-6'>
                        <Button className="w-full" primary onClick={handleOk}>O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;K</Button>
                    </div>
                </div>
            )}
            width={400}
        >

            <div className='pt-5 w-full'>
                
                <Message
                    info
                    header='パスワードを初期化しますか？'
                />

            </div>           

        </Modal>             
    )
}

export default DeleteModal;