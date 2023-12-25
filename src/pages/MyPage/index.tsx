import {FC, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Label, Segment, List, Button, Table, Message } from 'semantic-ui-react'

import actions from '../../redux/Ranking/actions';
import { RootState } from '../../redux/store';
import { badgeImage, badgeImageBaseUrl, userImageBaseUrl } from '../../config/constants';

import { RankingDataType } from "../../interface/RankingDataType";
import type { ColumnsType } from 'antd/es/table';
import EditTable from '../../components/EditTable';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    
    const { userData } = useSelector((state:RootState)=>state.authReducer);
    const { my_ranking_data } = useSelector((state:RootState)=>state.rankingReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch({
            type: actions.GETMYPAGEUSERDATA,
            payload: userData.id
        })
    },[]);

    const columns: ColumnsType<RankingDataType> = [
        {
          title: 'レース名',
          dataIndex: 'rank',
          sorter: true,
          width: '9%',
          render: (_, record) => (
            <span>{record.race_managements.race_name}</span>
          )
        },
        {
          title: '◎',
          dataIndex: 'double_circle',
          sorter: true,
          width: '8%',
          render: (_, record:any) => (
            <span>
                {record.double_circle ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.double_circles.name}
            </span>
          )
        },
        {
          title: '○',
          dataIndex: 'single_circle',
          sorter: true,
          width: '8%',
          render: (_, record:any) => (
            <span>{record.single_circle ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.single_circles.name}</span>
          )
        },
        {
          title: '▲',
          dataIndex: 'triangle',
          sorter: true,
          width: '8%',
          render: (_, record:any) => (
            <span>{record.triangle ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.triangles.name}</span>
          )
        },
        {
          title: '☆',
          dataIndex: 'five_star',
          sorter: true,
          width: '8%',
          render: (_, record:any) => (
            <span>{record.five_star ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.five_stars.name}</span>
          )
        },
        {
          title: '穴',
          dataIndex: 'hole',
          sorter: true,
          width: '8%',
          render: (_, record:any) => (
            <span>{record.hole ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.holes.name}</span>
          )
        },
        {
          title: '消',
          dataIndex: 'disappear',
          sorter: true,
          width: '8%',
          render: (_, record:any) => (
            <span>{record.disappear ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.disappears.name}</span>
          )
        },
    ];

    return (
        <div className="flex flex-col md:flex-row pt-6">
                
            <div className='w-full lg:w-2/5 lg:p-8 pb-5'>

                <Label as='a' color='red' tag>

                    基　本　情　報

                </Label>
            
                <Segment raised style={{backgroundColor: "#f5deb3"}}>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                        <img src={userImageBaseUrl + `${userData.image_url ? userData.image_url : 'DEFAULT.PNG'}`} style={{margin: 'auto'}}></img>

                    </div>

                    <List divided selection>
                        <List.Item>
                            <Label color='red' horizontal>
                                お名前
                            </Label>
                            {userData.length !== 0 && userData.name}
                        </List.Item>
                        <List.Item>
                            <Label color='purple' horizontal>
                                保有ポイント
                            </Label>
                            {userData.length !== 0 && userData.user_pt}ポイント
                        </List.Item>
                        <List.Item>
                            <Label color='red' horizontal>
                                ランク
                            </Label>
                            {
                                my_ranking_data.badge_grade !== undefined && (
                                    <img src={badgeImageBaseUrl + badgeImage[my_ranking_data.badge_grade]} style={{margin: 'auto'}} width={200}></img>
                                )
                            }
                        </List.Item>
                    </List>
                    
                    <div style={{margin: 'auto'}}>
                        <Button primary style={{margin: '10px'}} onClick={()=>navigate(-1)}>　戻　る　</Button>
                        <Button secondary style={{margin: '10px'}} onClick={()=>navigate('/setting')}>　編　集　</Button>
                    </div>
                </div>

                </Segment>

            </div>

            <div className='w-full lg:w-3/5 lg:p-8'>

                <Label as='a' color='red' tag>
                    予　想　成　績
                </Label>

                <Segment raised style={{backgroundColor: "#f5deb3"}}>
                    <Message
                        info
                        header={`　参　加　回　数　：　${my_ranking_data.times !== undefined ? my_ranking_data.times : 0}　回　`}
                    />
                    
                    <div className='mb-3 overflow-x-auto'>

                        <Table celled unstackable compact='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Pt</Table.HeaderCell>
                                    <Table.HeaderCell>◎</Table.HeaderCell>
                                    <Table.HeaderCell>〇</Table.HeaderCell>
                                    <Table.HeaderCell>▲</Table.HeaderCell>
                                    <Table.HeaderCell>☆</Table.HeaderCell>
                                    <Table.HeaderCell>穴</Table.HeaderCell>
                                    <Table.HeaderCell>消</Table.HeaderCell>
                                    <Table.HeaderCell>単率</Table.HeaderCell>
                                    <Table.HeaderCell>複率</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                my_ranking_data.length !== 0 && (
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>月間</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.point}pt</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.double_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.single_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.triangle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.five_star}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.hole}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.disappear}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.single}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.month_ranking_data.multiple}%</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>年間</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.point}pt</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.double_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.single_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.triangle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.five_star}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.hole}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.disappear}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.single}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.year_ranking_data.multiple}%</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>上期</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.point}pt</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.double_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.single_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.triangle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.five_star}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.hole}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.disappear}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.single}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.first_half_year_ranking_data.double_circle}%</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>下期</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.point}pt</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.double_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.single_circle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.triangle}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.five_star}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.hole}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.disappear}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.single}%</Table.Cell>
                                            <Table.Cell>{my_ranking_data.second_half_year_ranking_data.double_circle}%</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                )
                            }

                        </Table>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 pb-5">

                        <Label color='violet' horizontal size={'large'}>
                            単勝の回数 : {my_ranking_data.single_win}回
                        </Label>

                        <Label color='teal' horizontal size={'large'}>
                            複勝の回数 : {my_ranking_data.double_win}回
                        </Label> 
                        
                        <Label color='green' horizontal size={'large'}>
                            馬連の回数 : {my_ranking_data.horse_racing_win}回
                        </Label>

                        <Label color='brown' horizontal size={'large'}>
                            ３連複の回数 : {my_ranking_data.triple_racing_win}回
                        </Label>

                    </div>

                    <EditTable columns_data={columns} ranking_data={my_ranking_data.total_ranking_data}/>

                </Segment>

            </div>

        </div>
    )
}

export default MyPage;