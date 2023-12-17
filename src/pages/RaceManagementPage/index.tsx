import React, {useState, useEffect} from 'react'
import type { ColumnsType } from 'antd/es/table';
import { RaceDataType } from '../../interface/RaceDataType';
import ExpandableTable from './ExpandableTable';
import { Segment, Label } from 'semantic-ui-react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import RegisterModal from './RegisterModal';

import actions from '../../redux/RaceManagement/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const RaceManagementPage = () => {

    const [open, setOpen] = useState(false);
    const [changeDate, setChangeDate] = useState('');
    const [editData, setEditData] = useState({});

    const showEditModal = (data:any) => {
        setEditData(data);
        setOpen(!open);
    };
    
    const showModal = () => {
        setEditData({});
        setOpen(!open);
    };

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type: actions.GETPLACES,
        });
        dispatch({
            type: actions.INITIALSPECIFICRACEDATA,
        });
    },[]);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setChangeDate(dateString);
    };

    const getSpecificRaceData = () => {
        if (changeDate.length) {
            const data={
                changeDate: changeDate,
            }
            dispatch({
                type: actions.GETSPECIFICRACEDATA,
                payload: data
            });
        }
    }

    return (
        <Segment raised style={{backgroundColor: "#f5deb3"}}>

            <div className='pb-3'>
                <Label as='a' color='orange' ribbon>
                    登録レース一覧
                </Label>
            </div>


            <div className='relative pt-5 pb-8'>

                <Label color='red' horizontal>
                    開 催 日
                </Label>

                <DatePicker onChange={onChange}/>
            
                <Button icon={<SearchOutlined />} className='ml-3' danger onClick={getSpecificRaceData}> 検 索 </Button>
                
                <Button icon={<PlusOutlined />} className='w-full sm:w-40 sm:absolute sm:absolute top-5 right-0' danger onClick={showModal}> 新 規 登 録 </Button>

            </div>

            <ExpandableTable showEditModal={showEditModal} />

            <RegisterModal 
                _open={open}
                showModal={showModal}
                editData={editData}
            />

        </Segment>
    )
}

export default RaceManagementPage;