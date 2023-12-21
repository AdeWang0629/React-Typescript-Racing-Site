import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table, Empty } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { RankingDataType } from '../interface/RankingDataType';
import type { ColumnsType } from 'antd/es/table';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

interface IEditTable {
    columns_data: ColumnsType<RankingDataType>;
    ranking_data: any;
}

const EditTable: React.FC<IEditTable> = ({columns_data, ranking_data}) => {
    const [data, setData] = useState<RankingDataType[]>();
    const [loading, setLoading] = useState(true);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
        current: 1,
        pageSize: 10,
        },
    });

    useEffect(()=>{
        setLoading(false)
        setData(ranking_data);
    },[ranking_data]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null> ,
        sorter: SorterResult<RankingDataType> | SorterResult<RankingDataType>[],
        extra: TableCurrentDataSource<RankingDataType>
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
    );

};

export default EditTable;