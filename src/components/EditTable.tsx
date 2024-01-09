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
    data_status: boolean;
}

const EditTable: React.FC<IEditTable> = ({columns_data, ranking_data, data_status}) => {
    const [data, setData] = useState<RankingDataType[]>();
    const [loading, setLoading] = useState(true);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(()=>{
        console.log(ranking_data);
        setData(ranking_data);
    },[ranking_data]);

    useEffect(()=>{
        if (data_status) {
            setLoading(false);
        }
    }, [data_status]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null> ,
        sorter: SorterResult<RankingDataType> | SorterResult<RankingDataType>[],
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
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
            />  
        </>
    );

};

export default EditTable;