import React, { useEffect, useState } from 'react';
import { Table, Empty, Select, Badge, Modal, Typography } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { RaceDataType } from '../../interface/RaceDataType';
import type { ColumnsType } from 'antd/es/table';
import { Label, Button, Message } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/ExpectedBattle/actions';
import { RootState } from '../../redux/store';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkOverlap } from '../../config/global';

const { Text } = Typography;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

// const getRandomuserParams = (params: TableParams) => ({
//     results: params.pagination?.pageSize,
//     page: params.pagination?.current,
//     ...params,
// });

interface IExpandableTable {

}

const ExpandableTable: React.FC<IExpandableTable> = () => {
    const columns_data: ColumnsType<RaceDataType> = [
        // { title: 'id', dataIndex: 'id', key: 'id', width: '8%', responsive: ['xs'], },
        { title: '開催日', dataIndex: 'event_date', key: 'event_date', width: '20%' },
        { title: '開催場所', dataIndex: 'event_place', key: 'event_place', width: '10%',render: (_, record) => (
            <div>
                <Label color='purple' horizontal className={'cursor'} style={{marginRight: 15,}}>
                    {record.places.name}
                </Label>
            </div>
        )  },
        { title: 'Race', dataIndex: 'race_number', key: 'race_number' },
        { title: 'レース名', dataIndex: 'race_name', key: 'race_name' },
        { title: '備考', dataIndex: 'action', key: 'action', width: '20%',render: (_, record) => {
            let battleState = true;
            expected_battle_data.map((item:any)=> {
                if (item.race_management_id == record.id) {
                    battleState = false;
                }
            });
            return (
                <div>
                    <Label color='red' horizontal className={'cursor'} style={{marginRight: 15,}} onClick={() => showModal(record)}>
                        編 集
                    </Label>
                    {
                    expected_battle_data.length ? (battleState ? <Badge status="success" text="予想入力" /> : <Badge status="error" text="予想変更" />) : <Badge status="success" text="予想入力" />
                    }
                </div>
            )
        },
        ellipsis: true,},
    ];
    
    
    const [data, setData] = useState<RaceDataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const dispatch = useDispatch();

    const {expected_race_data, expected_battle_data} = useSelector((state:RootState) => state.expectedReducer);
    const {userData} = useSelector((state:RootState) => state.authReducer);

    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(false);
    const [selectedHorsesData, setSelctedHorsesData] = useState([]);
    const [submitHorsesData, setSubmitHorseData] = useState([0,0,0,0,0,0]);
    const [errorHorsesData, setErrorHorsesData] = useState([false,false,false,false,false,false]);

    useEffect(()=>{
        setLoading(true);
        dispatch({
            type: actions.GETEXPECTEDRACEDATA
        });
        dispatch({
            type: actions.GETEXPECTEDBATTLEDATA,
            payload: userData.id
        });
    },[]);

    const showModal = (record:any) => {
        const now = new Date();
        const [year, month, day] = record.event_date.split('-');
        const targetTime = new Date(year, month-1, day, record.hour_data, record.minute_data);
        const updateTime = new Date(targetTime.getTime() - 2 * 60000);

        if (now > updateTime) {

            toast.error("レースが始まったため、予想バトル入力ができません。");

        }else{

            setOpen(true);
            const running_horses_data = record.running_horses.map((horse:any) => {
                return {
                    value: horse.id,
                    label: horse.name,
                };
            });
            setSelectedRecord(record);
            setSelctedHorsesData(running_horses_data);
            const newData = [...expected_battle_data];
            newData.map((item:any)=>{
                if (item.race_management_id == record.id) {
                    setSubmitHorseData([item.double_circle, item.single_circle, item.triangle, item.five_star, item.hole, item.disappear]);
                    return true;
                }else{
                    return false;
                }
            });

        }
    };

    const hideModal = () => {
        setOpen(false);
        setSelectedRecord(false);
        setSubmitHorseData([0,0,0,0,0,0]);
    };

    useEffect(()=>{
        if (expected_race_data.length) {
            setLoading(false);
            setData(expected_race_data);
        }      
    },[expected_race_data]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null> ,
        sorter: SorterResult<RaceDataType> | SorterResult<RaceDataType>[],
        extra: TableCurrentDataSource<RaceDataType>
    ) => {
        setTableParams({
        pagination,
        filters,
        ...sorter,
        });
    
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setData([]);
        }
    };

    const handleExpectedBattle = () => {
        if (checkOverlap(submitHorsesData)) {

            const body = {
                user_id: userData.id,
                race_management_id: selectedRecord.id,
                expected_battle_data: submitHorsesData,
            };

            dispatch({
                type: actions.CREATEEXPECTEDBATTLE,
                payload: body
            });
            setOpen(false);
            setSelectedRecord(false);
            setSubmitHorseData([0,0,0,0,0,0]);
            setErrorHorsesData([false,false,false,false,false,false]);
        }else{

            toast.error("予想が被っています。");

        }
    };

    const handleSelectedHorse = (index:number, data:any) => {
        const oldData = [...submitHorsesData];
        if (oldData.includes(data)) {
            const oldErrorData = errorHorsesData.map((value:any, id:any) => {
                if (id == index) {
                    return true;
                }else{
                    return false;
                }
            });
            setErrorHorsesData(oldErrorData);
            toast.error("予想が被っています。");
        }else{
            setErrorHorsesData([false,false,false,false,false,false]);
            oldData[index] = data;
            setSubmitHorseData(oldData);
        }
    };

    return (

        <>
            <>
                <Table
                    columns={columns_data}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    locale={{
                        emptyText: <Empty description="データがありません" />,
                    }}
                    scroll={{ x: true }}
                />
            </>

            <Modal
                open={open}
                onCancel={hideModal}
                closable={false}
                footer={() => (
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-40 pr-6'>
                            <Button className="w-full" secondary onClick={hideModal}>キ&nbsp;ャ&nbsp;ン&nbsp;セ&nbsp;ル</Button>
                        </div>
                        <div className='w-40 pr-6'>
                            <Button className="w-full" primary onClick={handleExpectedBattle}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;録</Button>
                        </div>
                    </div>
                )}
            >

                {
                    selectedRecord && (
                        <Message
                            info
                            header={`${selectedRecord.event_date.slice(5)} \u00A0 ${selectedRecord.places.name} ${selectedRecord.race_number} \u00A0 ${selectedRecord.race_name} \u00A0 ${selectedRecord.hour_data} : ${selectedRecord.minute_data} 発走`}
                        />
                    )
                }

                <div className='flex items-center pt-5'>
                
                    <Label color='red' horizontal className='w-24'>
                        ◎ :
                    </Label>
                    <Select
                        value={selectedHorsesData.length && (submitHorsesData[0]? submitHorsesData[0] : "選択してください。")}
                        className='w-full'
                        onChange={(value) => handleSelectedHorse(0, value)}
                        options={selectedHorsesData}
                    />

                </div>
                { errorHorsesData[0] && (<Text type="danger" className='pl-24'>予想が被っています。</Text>) }
                <div className='flex items-center pt-5'>
                
                    <Label color='red' horizontal className='w-24'>
                        ○ :
                    </Label>
                    <Select
                        value={selectedHorsesData.length && (submitHorsesData[1]? submitHorsesData[1] : "選択してください。")}
                        className='w-full'
                        onChange={(value) => handleSelectedHorse(1, value)}
                        options={selectedHorsesData}
                    />

                </div>
                { errorHorsesData[1] && (<Text type="danger" className='pl-24'>予想が被っています。</Text>) }
                <div className='flex items-center pt-5'>
                
                    <Label color='red' horizontal className='w-24'>
                        ▲ :
                    </Label>
                    <Select
                        value={selectedHorsesData.length && (submitHorsesData[2]? submitHorsesData[2] : "選択してください。")}
                        className='w-full'
                        onChange={(value) => handleSelectedHorse(2, value)}
                        options={selectedHorsesData}
                    />

                </div>
                { errorHorsesData[2] && (<Text type="danger" className='pl-24'>予想が被っています。</Text>) }
                <div className='flex items-center pt-5'>
                
                    <Label color='red' horizontal className='w-24'>
                        ☆ :
                    </Label>
                    <Select
                        value={selectedHorsesData.length && (submitHorsesData[3]? submitHorsesData[3] : "選択してください。")}
                        className='w-full'
                        onChange={(value) => handleSelectedHorse(3, value)}
                        options={selectedHorsesData}
                    />

                </div>
                { errorHorsesData[3] && (<Text type="danger" className='pl-24'>予想が被っています。</Text>) }
                <div className='flex items-center pt-5'>
                
                    <Label color='red' horizontal className='w-24'>
                        穴 :
                    </Label>
                    <Select
                        value={selectedHorsesData.length && (submitHorsesData[4]? submitHorsesData[4] : "選択してください。")}
                        className='w-full'
                        onChange={(value) => handleSelectedHorse(4, value)}
                        options={selectedHorsesData}
                    />

                </div>
                { errorHorsesData[4] && (<Text type="danger" className='pl-24'>予想が被っています。</Text>) }
                <div className='flex items-center pt-5'>
                
                    <Label color='red' horizontal className='w-24'>
                        消 :
                    </Label>
                    <Select
                        value={selectedHorsesData.length && (submitHorsesData[5]? submitHorsesData[5] : "選択してください。")}
                        className='w-full'
                        onChange={(value) => handleSelectedHorse(5, value)}
                        options={selectedHorsesData}
                    />
               
                </div>
                { errorHorsesData[5] && (<Text type="danger" className='pl-24'>予想が被っています。</Text>) }
            </Modal>
        </>

        
    );

};

export default ExpandableTable;