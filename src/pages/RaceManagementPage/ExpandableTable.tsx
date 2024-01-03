import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table, Empty, Select, Badge, Modal } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { RaceDataType } from '../../interface/RaceDataType';
import type { ColumnsType } from 'antd/es/table';
import { Label, Button, Message } from 'semantic-ui-react'
import NewEditTable from '../../components/NewEditTable';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/RaceManagement/actions';
import { RootState } from '../../redux/store';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    showEditModal: any;
}

interface RaceDataWithHorses extends RaceDataType {
    running_horses: { id: number; name: string }[];
    web_race_results: [];
    delete_horses: [];
}

const ExpandableTable: React.FC<IExpandableTable> = ({showEditModal}) => {
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
        { title: '備考', dataIndex: 'action', key: 'action', width: '20%',render: (_, record) => (
            <div>
                <Label color='red' horizontal className={'cursor'} style={{marginRight: 15,}} onClick={() => showModal(record.id)}>
                    削  除
                </Label>
                <Label color='teal' horizontal className={'cursor'} style={{marginRight: 15,}} onClick={() => showEditModal(record)}>
                    編  集
                </Label>
                <Badge status="success" text="レース結果変更" />
            </div>
        ),
        ellipsis: true,},
        Table.EXPAND_COLUMN,
    ];

    
    const [data, setData] = useState<RaceDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const dispatch = useDispatch();
    const {races} = useSelector((state:RootState) => state.raceReducer);
    const [deleteHorseArray, setDeleteHorseArray] = useState(['0','0','0','0','0']);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    useEffect(()=>{
        setLoading(true);
        dispatch({
            type: actions.GETRACESDATA
        });
    },[]);

    useEffect(()=>{
        dispatch({
            type: actions.GETRACESDATA
        });
    },[]);

    const showModal = (id:any) => {
        setOpen(true);
        setDeleteId(id);
    };
    
    const hideModal = () => {
        setOpen(false);
        setDeleteId(0);
    };

    useEffect(()=>{
        setLoading(false);
        setData(races);
    },[races]);

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
    
    const [raceResult, setRaceResult] = useState<undefined | any[]>([]);
    const [changeDeleteData, setChangeDeleteData] = useState<undefined | any[]>([]); 
    console.log(data, "======================================");
    const handleSubmit = (id:any) => {
        let newData : any;
        data.forEach(element => {
            if (element.id == id) {
                newData = element;
            }
        });

        const filteredRunningHorsesArray = newData.running_horses.map((horse:any) => {
            return horse.id;
        });

        let newDeleteHorseArray;
        if (newData['delete_horses'].length) {
            newDeleteHorseArray = deleteHorseArray.map((item, index)=> {
                if (item == '0') {
                    console.log(newData['delete_horses'][index]);
                    return filteredRunningHorsesArray[0];
                }else{
                    return item;
                }
            })
        }else{
            newDeleteHorseArray = deleteHorseArray.map((item)=> {
                return filteredRunningHorsesArray[0];
            })
        }

        if (!raceResult?.length && changeDeleteData?.length) {
            const body = {
                id: id,
                race_result: changeDeleteData,
                delete_horses_data: newDeleteHorseArray,
            };
            dispatch({
                type: actions.CREATERACERESULT,
                payload: body
            });
        }else if (id == undefined || raceResult == undefined) {
            toast.error("レース結果入力の値が正しく入力されていることを確認してください。");
        }else if (id == raceResult[0]) {
            const race_result = raceResult[1];
            const body = {
                id: id,
                race_result: race_result,
                delete_horses_data: newDeleteHorseArray,
            };

            dispatch({
                type: actions.CREATERACERESULT,
                payload: body
            });
        }else{
            toast.error("レース結果入力状態をもう一度確認してください。");
        }
    }

    const deleteRace = () => {
        setOpen(false);
        setDeleteId(0);
        dispatch({
            type: actions.DELETERACEDATA,
            payload: deleteId
        });
    };

    return (
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
                expandable={{
                    expandedRowRender: (record) => 
                    {   
                        const data = record as RaceDataWithHorses;
                        const filteredArray = data.running_horses.map((horse) => {
                            return {
                                value: horse.id,
                                label: horse.name,
                            };
                        });
                        const newWebRaceResults = data.web_race_results.map((value:any, index) => ({
                            rank: `${index + 1}着`,
                            horse:  value ? value.horse : filteredArray[0]['value'],
                            odds: value ? value.odds : '',
                            single: value ? value.single : '',
                            double: value ? value.double : '',
                        }));

                        return (
                            <div className='flex flex-col md:flex-row'>
                            
                                <div className='w-full lg:w-1/2 pr-5'>
                                    <Label basic color='red' pointing='below'>
                                        レース結果入力
                                    </Label>
                                
                                <NewEditTable filteredArray={filteredArray} setRaceResult={setRaceResult} no={record.id} webRaceResults={data.web_race_results} />

                                </div>

                                <div className='w-full lg:w-1/2 lg:pl-5 pt-5'>
                                    
                                    <div >
                                        <Label basic color='red' pointing='below'>
                                            消し馬登録
                                        </Label>
                                    </div>
                                    {
                                        deleteHorseArray.map((_value, index) => (
                                            <div className='pt-3 pb-3' key={index}>
                                                <Label color='red' horizontal className='w-24'>
                                                    {index+1}人気
                                                </Label>
                                                <Select
                                                    defaultValue={data.delete_horses.length ? (data.delete_horses[index] as { name: string }).name : filteredArray[0]['label']}
                                                    className='w-full lg:w-64 lg:ml-10'
                                                    onChange={(value) => {
                                                        // let updatedRowData: React.SetStateAction<string[]> = [];
                                                        // if (data.delete_horses.length) {
                                                        //     updatedRowData = data.delete_horses.map((item:any)=> item.name);
                                                        // }else{
                                                        //     updatedRowData = [filteredArray[0]['value'].toString(),filteredArray[0]['value'].toString(),filteredArray[0]['value'].toString(),filteredArray[0]['value'].toString(),filteredArray[0]['value'].toString()];
                                                        // }
                                                        const updatedRowData = [...deleteHorseArray];
                                                        updatedRowData[index] = value;
                                                        setDeleteHorseArray(updatedRowData);
                                                        setChangeDeleteData(newWebRaceResults);
                                                    }}
                                                    options={filteredArray}
                                                />
                                            </div>
                                        ))
                                    }
                                    
                                    <div className='flex justify-center'>
                                        <Button className="w-full lg:w-60 lg:mr-64" onClick={()=>handleSubmit(record.id)}>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
                                    </div>
                                    
                                </div>

                            </div>
                        )
                    }
                }}
            />
            <Modal
                open={open}
                onCancel={hideModal}
                closable={false}
                footer={() => (
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-40 pr-6'>
                            <Button className="w-full" secondary onClick={hideModal}>い&nbsp;い&nbsp;え</Button>
                        </div>
                        <div className='w-40 pr-6'>
                            <Button className="w-full" primary onClick={deleteRace}>は&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;い</Button>
                        </div>
                    </div>
                )}
            >
                <Message
                    info
                    header='本当に削除してもよろしいですか？'
                />
            </Modal>
        </>
    );

};

export default ExpandableTable;