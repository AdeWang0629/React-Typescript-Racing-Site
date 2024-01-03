import {FC, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Label, Segment, List, Table, Message, Button, Input, Image } from 'semantic-ui-react'

import actions from '../../redux/GradeManagement/actions';
import { RootState } from '../../redux/store';
import { badgeImage, badgeImageBaseUrl, userImageBaseUrl } from '../../config/constants';

import { RankingDataType } from "../../interface/RankingDataType";
import type { ColumnsType } from 'antd/es/table';
import EditTable from '../../components/EditTable';
import { useNavigate } from 'react-router-dom';

const GrandeManagementPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {race_management_data} = useSelector((state:RootState)=>state.gradeReducer);

    const [gradeOrder, setGradeOrder] = useState<any>(0);
    const [myRankingData, setMyRankingData] = useState<any>([]);
    const [word, setWord] = useState('');
    const [filterList, setFilterList] = useState([]);

    useEffect(()=>{
      dispatch({
          type: actions.GETGRADEMANAGEMENTDATA,
      })
    },[]);

    useEffect(() => {
      if (race_management_data && race_management_data.length > 0) {
        setMyRankingData(race_management_data[0]);
      }
    }, [race_management_data]);    

    useEffect(() => {   
      if (race_management_data && race_management_data.length > 0) {
        setMyRankingData(race_management_data[gradeOrder]);
      }
    }, [gradeOrder]);    

    const changeUserData = (value:number) => {
      setGradeOrder(gradeOrder+value);
    }

    const columns: ColumnsType<RankingDataType> = [
      {
        title: 'レース名',
        dataIndex: 'rank',
        sorter: (a:any, b:any) => a.rank - b.rank,
        width: '9%',
        render: (_, record) => (
          <span>{record.race_managements.race_name}</span>
        )
      },
      {
        title: '◎',
        dataIndex: 'double_circle',
        sorter: (a:any, b:any) => a.double_circle - b.double_circle,
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
        sorter: (a:any, b:any) => a.single_circle - b.single_circle,
        width: '8%',
        render: (_, record:any) => (
          <span>{record.single_circle ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.single_circles.name}</span>
        )
      },
      {
        title: '▲',
        dataIndex: 'triangle',
        sorter: (a:any, b:any) => a.triangle - b.triangle,
        width: '8%',
        render: (_, record:any) => (
          <span>{record.triangle ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.triangles.name}</span>
        )
      },
      {
        title: '☆',
        dataIndex: 'five_star',
        sorter: (a:any, b:any) => a.five_star - b.five_star,
        width: '8%',
        render: (_, record:any) => (
          <span>{record.five_star ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.five_stars.name}</span>
        )
      },
      {
        title: '穴',
        dataIndex: 'hole',
        sorter: (a:any, b:any) => a.hole - b.hole,
        width: '8%',
        render: (_, record:any) => (
          <span>{record.hole ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.holes.name}</span>
        )
      },
      {
        title: '消',
        dataIndex: 'disappear',
        sorter: (a:any, b:any) => a.disappear - b.disappear,
        width: '8%',
        render: (_, record:any) => (
          <span>{record.disappear ? <Label circular color={'red'}> 的</Label> : <Label circular color={'blue'}> 不</Label>} {record.disappears.name}</span>
        )
      },
    ];

    const [open, setOpen] =  useState(false);

    const showModal = () => {
      setOpen(!open);
    }

    const filterWord = (e:any) => {
      setWord(e.target.value);
      if (e.target.value == '') {
        setFilterList([]);
      }else{
        const newFilterList = race_management_data.filter((item: { user_name: any; })=>item.user_name.includes(e.target.value));
        setFilterList(newFilterList);
      }
    }

    const handleFilterList = (filter_id:number) => {
      let grade_number;
      race_management_data.filter((item: { id: number; }, index:number)=> {
          if (item.id == filter_id) {
              grade_number = index;
          }
          return item;
      });
      setGradeOrder(grade_number);
      setWord("");
      setFilterList([]);
    }

    return (
      <div className="flex flex-col md:flex-row">

        <div className='w-full lg:p-8'>

          <div className='pb-5 flex justify-between'>
            <div>
              <Button color='blue' disabled={gradeOrder === 0} onClick={() => changeUserData(-1)}>
                  前へ
              </Button>
              
              <Button color='red' disabled={gradeOrder === race_management_data.length - 1} onClick={() => changeUserData(1)}>
                  次へ
              </Button>
            </div>
            
            <div>
              <Input icon='search' placeholder='検索...' className='w-full lg:w-96' onChange={(e) => filterWord(e)} value={word}/>
              {
                filterList.length ? (
                  <div className='lg:w-96 w-full h-60 absolute overflow-y-scroll z-10 bg-purple-500'>
                    <List selection verticalAlign='middle' inverted>
                      {
                        filterList.map((item:any, index:any)=>(
                          <List.Item key={index} onClick={()=> handleFilterList((item.id))}>
                              <Image avatar src={userImageBaseUrl + item.user_image_url} />
                              <List.Content>
                                  <List.Header>{item.user_name}</List.Header>
                              </List.Content>
                          </List.Item>
                        ))
                      }
                    </List>
                  </div>
                ) : ''
              }
            </div>
          </div>

          <Segment raised style={{backgroundColor: "#f5deb3"}}>

            <div className='flex justify-center items-centser'>
              {
                  myRankingData.user_image_url !== undefined  && (
                    <img src={userImageBaseUrl + myRankingData.user_image_url} width={'100px'} style={{borderRadius: '50px'}}></img>
                  )
              }
              
              {
                  myRankingData.badge_grade !== undefined && (
                      <img src={badgeImageBaseUrl + badgeImage[myRankingData.badge_grade]} width={'100px'} style={{borderRadius: '50px', marginLeft: '-60px'}}></img>
                  )
              }
            </div>

            <div className='flex justify-center pt-5'>
              
              {
                  myRankingData.badge_grade !== undefined && (
                    <Label basic size='big' color='purple'>
                      {myRankingData.user_name}
                    </Label>
                  )
              }
              
            </div>

            <Message
                info
                header={`　参　加　回　数　：　${myRankingData.times !== undefined ? myRankingData.times : 0}　回　`}
            />
            <div className='mb-3 overflow-x-scroll'>

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
                        myRankingData.length !== 0 && (
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>月間</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.point}pt</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.double_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.single_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.triangle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.five_star}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.hole}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.disappear}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.single}%</Table.Cell>
                                    <Table.Cell>{myRankingData.month_ranking_data.multiple}%</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>年間</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.point}pt</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.double_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.single_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.triangle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.five_star}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.hole}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.disappear}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.single}%</Table.Cell>
                                    <Table.Cell>{myRankingData.year_ranking_data.multiple}%</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>上期</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.point}pt</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.double_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.single_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.triangle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.five_star}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.hole}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.disappear}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.single}%</Table.Cell>
                                    <Table.Cell>{myRankingData.first_half_year_ranking_data.double_circle}%</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>下期</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.point}pt</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.double_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.single_circle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.triangle}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.five_star}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.hole}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.disappear}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.single}%</Table.Cell>
                                    <Table.Cell>{myRankingData.second_half_year_ranking_data.double_circle}%</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        )
                    }

                </Table>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-4 pb-5">

                <Label color='violet' horizontal size={'big'}>
                    単勝の回数 : {myRankingData.single_win}回
                </Label>

                <Label color='teal' horizontal size={'big'}>
                    複勝の回数 : {myRankingData.double_win}回
                </Label> 
                
                <Label color='green' horizontal size={'big'}>
                    馬連の回数 : {myRankingData.horse_racing_win}回
                </Label>

                <Label color='brown' horizontal size={'big'}>
                    ３連複の回数 : {myRankingData.triple_racing_win}回
                </Label>

            </div>

            <EditTable columns_data={columns} ranking_data={myRankingData.total_ranking_data} />

          </Segment>

        </div>
        
      </div>
    )
}

export default GrandeManagementPage;