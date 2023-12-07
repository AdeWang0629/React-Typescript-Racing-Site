import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table, Empty } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

interface DataType {
    id: number;
    rank: {
        first: string;
        last: string;
    };
    name: string;
    number_times: string;
    point: string;
    single_circle: string;
    double_circle: string;
    triangle: string;
    five_star: string;
    hole: string;
    disappear: string;
    single: string;
    multiple: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<DataType> = [
  {
    title: '順位',
    dataIndex: 'rank',
    sorter: true,
    render: (rank) => `${rank.first} ${rank.last}`,
    width: '9%',
  },
  {
    title: '名前',
    dataIndex: 'name',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '9%',
  },
  {
    title: '回数',
    dataIndex: 'number_times',
    sorter: true,
    width: '9%',
  },
  {
    title: 'pt',
    dataIndex: 'point',
    sorter: true,
    width: '9%',
  },
  {
    title: '◎',
    dataIndex: 'double_circle',
    sorter: true,
    width: '8%',
  },
  {
    title: '○',
    dataIndex: 'single_circle',
    sorter: true,
    render: (rank) => `${rank.first} ${rank.last}`,
    width: '8%',
  },
  {
    title: '▲',
    dataIndex: 'triangle',
    sorter: true,
    width: '8%',
  },
  {
    title: '☆',
    dataIndex: 'five_star',
    sorter: true,
    width: '8%',
  },
  {
    title: '穴',
    dataIndex: 'hole',
    sorter: true,
    width: '8%',
  },
  {
    title: '消',
    dataIndex: 'disappear',
    sorter: true,
    width: '8%',
  },
  {
    title: '単',
    dataIndex: 'single',
    sorter: true,
    width: '8%',
  },
  {
    title: '複',
    dataIndex: 'multiple',
    sorter: true,
    width: '8%',
  },
];

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const EditTable: React.FC = () => {
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
        current: 1,
        pageSize: 10,
        },
    });

//   const fetchData = () => {
//     setLoading(true);
//     fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//       .then((res) => res.json())
//       .then(({ results }) => {
//         setData(results);
//         setLoading(false);
//         setTableParams({
//           ...tableParams,
//           pagination: {
//             ...tableParams.pagination,
//             total: 200,
//             // 200 is mock data, you should read it from server
//             // total: data.totalCount,
//           },
//         });
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [JSON.stringify(tableParams)]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null> ,
        sorter: SorterResult<DataType> | SorterResult<DataType>[],
        extra: TableCurrentDataSource<DataType>
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
  

    return (
        <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            locale={{
                emptyText: <Empty description="データがありません" />,
            }}
        />
    );
};

export default EditTable;