import EditTable from "../../components/EditTable";
import { Label, Segment, Message } from 'semantic-ui-react'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import type { ColumnsType } from 'antd/es/table';
import { RankingDataType } from "../../interface/RankingDataType";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/Ranking/actions";
import { RootState } from "../../redux/store";

const ranking = [
    {
      id: 1,
      name: '月間ランキング',
    },
    {
      id: 2,
      name: '年間ランキング',
    },
    {
      id: 3,
      name: '上半期ランキング',
    },
    {
      id: 4,
      name: '下半期ランキング',
    },
]
  
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const columns: ColumnsType<RankingDataType> = [
    {
      title: '順位',
      dataIndex: 'rank',
      sorter: (a:any, b:any) => a.rank - b.rank,
      width: '9%',
      render: (_, record) => (
        <span>{record.rank}位</span>
      ),
      
    },
    {
      title: '名前',
      dataIndex: 'name',
      sorter: (a:any, b:any) => a.name - b.name,
      width: '9%',
    },
    {
      title: '回数',
      dataIndex: 'number_times',
      sorter: (a:any, b:any) => a.number_times - b.number_times,
      width: '9%',
    },
    {
      title: 'pt',
      dataIndex: 'point',
      sorter: (a:any, b:any) => a.point - b.point,
      width: '9%',
    },
    {
      title: '◎',
      dataIndex: 'double_circle',
      sorter: (a:any, b:any) => a.double_circle - b.double_circle,
      width: '8%',
      render: (_, record) => (
        <span>{record.double_circle}%</span>
      )
    },
    {
      title: '○',
      dataIndex: 'single_circle',
      sorter: (a:any, b:any) => a.single_circle - b.single_circle,
      width: '8%',
      render: (_, record) => (
        <span>{record.single_circle}%</span>
      )
    },
    {
      title: '▲',
      dataIndex: 'triangle',
      sorter: (a:any, b:any) => a.triangle - b.triangle,
      width: '8%',
      render: (_, record) => (
        <span>{record.triangle}%</span>
      )
    },
    {
      title: '☆',
      dataIndex: 'five_star',
      sorter: (a:any, b:any) => a.five_star - b.five_star,
      width: '8%',
      render: (_, record) => (
        <span>{record.five_star}%</span>
      )
    },
    {
      title: '穴',
      dataIndex: 'hole',
      sorter: (a:any, b:any) => a.hole - b.hole,
      width: '8%',
      render: (_, record) => (
        <span>{record.hole}%</span>
      )
    },
    {
      title: '消',
      dataIndex: 'disappear',
      sorter: (a:any, b:any) => a.disappear - b.disappear,
      width: '8%',
      render: (_, record) => (
        <span>{record.disappear}%</span>
      )
    },
    {
      title: '単',
      dataIndex: 'single',
      sorter: (a:any, b:any) => a.single - b.single,
      width: '8%',
      render: (_, record) => (
        <span>{record.single}%</span>
      )
    },
    {
      title: '複',
      dataIndex: 'multiple',
      sorter: (a:any, b:any) => a.multiple - b.multiple,
      width: '8%',
      render: (_, record) => (
        <span>{record.multiple}%</span>
      )
    },
];

const RankingPage = () => {

    const [selected, setSelected] = useState(ranking[0]);
    const dispatch = useDispatch();
    const {ranking_data} = useSelector((state:RootState)=>state.rankingReducer);
    const [data, setData] = useState([]);

    useEffect(()=>{
      dispatch({
        type: actions.GETRANKINGDATA,
        payload: 1
      });
    },[]);
    
    useEffect(()=>{
      dispatch({
        type: actions.GETRANKINGDATA,
        payload: selected.id 
      });
    },[selected]);

    useEffect(()=>{
      setData(ranking_data);
    },[ranking_data]);

    return (
        <div>
            
            <Label as='a' color='red' tag>
                予想ランキング
            </Label>

            <Segment raised style={{backgroundColor: "#f5deb3"}}>

                {/* <div className='pb-3'>
                    <Label as='a' color='orange' ribbon>
                        予  選 バ ト ル
                    </Label>
                </div> */}

                <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                        <>
                        <div className="relative mt-2 pb-5">
                            <Listbox.Button className="relative cursor-default w-full lg:w-1/5 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                    <span className="ml-3 block truncate">{selected.name}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full lg:w-1/5 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {ranking.map((ranking) => (
                                <Listbox.Option
                                    key={ranking.id}
                                    className={({ active }) =>
                                    classNames(
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                    )
                                    }
                                    value={ranking}
                                >
                                    {({ selected, active }) => (
                                    <>
                                        <div className="flex items-center">
                                        <span
                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                        >
                                            {ranking.name}
                                        </span>
                                        </div>

                                        {selected ? (
                                        <span
                                            className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                        >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        ) : null}
                                    </>
                                    )}
                                </Listbox.Option>
                                ))}
                            </Listbox.Options>
                            </Transition>
                        </div>
                        </>
                    )}
                </Listbox>

                <EditTable columns_data={columns} ranking_data={data}/>

            </Segment>

        </div>
    )
}

export default RankingPage;