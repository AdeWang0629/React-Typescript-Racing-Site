import EditTable from "../../components/EditTable";
import { Input, Label, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { RankingDataType } from "../../interface/RankingDataType";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import actions from "../../redux/UserManagement/actions";
import RegisterModal from './RegisterModal';
import { Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { user_role_data } from "../../config/global";
import DeleteModal from "./DeleteModal";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const RankingPage = () => {
    const columns: ColumnsType<RankingDataType> = [
        {
            title: '番号',
            dataIndex: 'id',
            sorter: true,
            width: '1%',
        },
        {
          title: '名前',
          dataIndex: 'user_name',
          sorter: true,
          width: '9%',
        },
        {
          title: '種別',
          dataIndex: 'user_role',
          sorter: true,
          width: '9%',
          render: (_, record:any) => (
                <div>
                    {
                        record.user_role == 0 && 
                        <Label color={'red'}>
                            {
                                user_role_data.map((data:any)=>{
                                    if (record.user_role == data.value) {
                                        return data.label
                                    }
                                })
                            }
                        </Label>
                    }
                    {
                        record.user_role == 1 && 
                        <Label color={'blue'}>
                            {
                                user_role_data.map((data:any)=>{
                                    if (record.user_role == data.value) {
                                        return data.label
                                    }
                                })
                            }
                        </Label>
                    }
                    {
                        record.user_role == 2 && 
                        <Label color={'purple'}>
                            {
                                user_role_data.map((data:any)=>{
                                    if (record.user_role == data.value) {
                                        return data.label
                                    }
                                })
                            }
                        </Label>
                    }
                </div>
            ),
        },
        {
          title: 'ランク',
          dataIndex: 'badge_grade',
          sorter: true,
          width: '9%',
        },
        { 
            title: '備考', 
            dataIndex: 'action', 
            key: 'action', width: '1%',
            render: (_, record) => (
                <div className="flex">
                    <Label color='teal' horizontal className={'cursor'} style={{margin: 'auto'}} onClick={() => showEditModal(record)}>
                        編  集
                    </Label>
                    <Label color='purple' horizontal className={'cursor'} style={{margin: 'auto'}} onClick={() => showFormateModal(record)}>
                        <ClearOutlined />
                    </Label>
                </div>
            ),
        },
    ];

    const dispatch = useDispatch();
    const {user_management_data, user_management_status} = useSelector((state:RootState)=>state.userReducer);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(()=>{
      dispatch({
        type: actions.GETUSERMANAGEMENTDATA,
      });
    },[]);
    
    useEffect(()=>{
      setData(user_management_data);
    },[user_management_data]);

    const showEditModal = (data:any) => {
        setEditData(data);
        setOpen(!open);
    };
    
    const showFormateModal = (data:any) => {
        setEditData(data);
        setOpenDelete(!openDelete);
    };
    
    const showModal = () => {
        setEditData({});
        setOpen(!open);
    };

    const showDelteModal = () => {
        setEditData({});
        setOpenDelete(!open);
    };

    const filterWord = (e:any) => {
        if (e.target.value == '') {
            setData(user_management_data);
        }else{
          const newFilterList = user_management_data.filter((item: { user_name: any; })=>item.user_name.includes(e.target.value));
          setData(newFilterList);
        }
    }

    return (
        <div>
            
            <Segment raised style={{backgroundColor: "#f5deb3"}}>

                <div className='relative pt-5 pb-8'>

                    <Label color='red' horizontal>
                        ユーザー名
                    </Label>

                    <Input icon='search' placeholder='検索...' className='w-full lg:w-96' onChange={(e) => filterWord(e)}/>

                    {/* <Button icon={<PlusOutlined />} className='w-full sm:w-40 sm:absolute sm:absolute top-5 right-0' danger onClick={showModal}> 新 規 登 録 </Button> */}

                </div>

                <EditTable columns_data={columns} ranking_data={data} data_status={user_management_status}/>

                <RegisterModal 
                    _open={open}
                    showModal={showModal}
                    editData={editData}
                />

                <DeleteModal
                    _open={openDelete}
                    showModal={showDelteModal}
                    editData={editData}
                />
            </Segment>

        </div>
    )
}

export default RankingPage;