import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { Select, Input, Button } from 'antd';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewEditTable = ({filteredArray, setRaceResult, no, webRaceResults} : any) => {
    
    const [rows, setRows] = React.useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]);

    const [rowData, setRowData] = React.useState(rows.map((value, index) => ({
        rank: `${index + 1}着`,
        horse:  webRaceResults.length ? webRaceResults[index]?.horse : filteredArray[0]['value'],
        odds: webRaceResults.length ? webRaceResults[index]?.odds : '',
        single: webRaceResults.length ? webRaceResults[index]?.single : '',
        double: webRaceResults.length ? webRaceResults[index]?.double : '',
    })));

    useEffect(()=>{
        if (webRaceResults.length) {
            let updatedRows: { id: any; }[] = [];
            webRaceResults.map((element:any, index:any) => {
                updatedRows.push({ id: index+1});
                return element;
            });
            setRows(updatedRows);
            setRowData(updatedRows.map((value, index) => ({
                rank: webRaceResults[index]?.rank,
                horse:  webRaceResults.length ? webRaceResults[index]?.horse : filteredArray[0]['value'],
                odds: webRaceResults.length ? webRaceResults[index]?.odds : '',
                single: webRaceResults.length ? webRaceResults[index]?.single : '',
                double: webRaceResults.length ? webRaceResults[index]?.double : '',
            })));
        }
    },[webRaceResults]);

    const addRow = () => {
        const newRow = { id: rows.length + 1 };
        const newRowData = {
            rank: '3着',
            horse: filteredArray[0]['value'],
            odds: '',
            single: '',
            double: '',
        };
        
        setRows([...rows, newRow]);
        setRowData([...rowData, newRowData]);
    };

    const deleteRow = () => {
        if (rows.length > 0) {
            const updatedRows = [...rows];
            updatedRows.pop(); // 最後の行を削除
            setRows(updatedRows);
    
            const updatedRowData = [...rowData];
            updatedRowData.pop(); // 最後の行のデータを削除
            setRowData(updatedRowData);
        }
    };

    return (
        <div>
            <Button onClick={addRow}>
                追  加
            </Button>
            <Button onClick={deleteRow} style={{marginLeft: 10}}>
                削 除
            </Button>
            <Table celled unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className='w-24'>順位</Table.HeaderCell>
                        <Table.HeaderCell>馬名</Table.HeaderCell>
                        <Table.HeaderCell className='w-28'>単勝オッズ</Table.HeaderCell>
                        <Table.HeaderCell className='w-28'>単勝</Table.HeaderCell>
                        <Table.HeaderCell className='w-28'>複勝</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows.map((row, index) => {
                        return (
                        <Table.Row key={index}>
                            <Table.Cell>
                                <Input 
                                    value={rowData[index].rank} 
                                    onChange={(e) => {
                                        const updatedRowData = [...rowData];
                                        updatedRowData[index].rank = e.target.value;
                                        setRowData(updatedRowData);
                                        setRaceResult([no, updatedRowData]);
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Select
                                    value={rowData[index].horse}
                                    className='w-full'
                                    onChange={(value) => {
                                        const updatedRowData = [...rowData];
                                        let errorRowDataState = true;
                                        updatedRowData.map((item)=>{
                                            if (item.horse == value) {
                                                errorRowDataState = false;
                                            }
                                            return item;
                                        });
                                        if (errorRowDataState) {
                                            updatedRowData[index].horse = value;
                                            setRowData(updatedRowData);
                                            setRaceResult([no, updatedRowData]);
                                        }else{
                                            toast.error("予想が被っています。");
                                        }
                                    }}
                                    options={filteredArray}
                                />
                            </Table.Cell>
                            <Table.Cell>

                                <Input
                                    value={rowData[index].odds}
                                    onChange={(e) => {
                                        const updatedRowData = [...rowData];
                                        updatedRowData[index].odds = e.target.value;
                                        setRowData(updatedRowData);
                                        setRaceResult([no, updatedRowData]);
                                    }}
                                    onBlur={()=> {
                                        const updatedRowData = [...rowData];
                                        if (rowData[index].rank == "1着") {
                                            updatedRowData[index].single = updatedRowData[index].odds * 100;
                                        }
                                        setRowData(updatedRowData);
                                        setRaceResult([no, updatedRowData]);
                                    }}
                                />

                            </Table.Cell>
                            <Table.Cell>
                                {
                                    rowData[index].rank == "1着" && (
                                        <Input
                                            value={rowData[index].single}
                                            onChange={(e) => {
                                                const updatedRowData = [...rowData];
                                                updatedRowData[index].single = e.target.value;
                                                setRowData(updatedRowData);
                                                setRaceResult([no, updatedRowData]);
                                            }}
                                        />
                                    )
                                }
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    value={rowData[index].double}
                                    onChange={(e) => {
                                        const updatedRowData = [...rowData];
                                        updatedRowData[index].double = e.target.value;
                                        setRowData(updatedRowData);
                                        setRaceResult([no, updatedRowData]);
                                    }}
                                />
                            </Table.Cell>
                        </Table.Row>
                    )})}
                </Table.Body>
            </Table>
        </div>

    );

};

export default NewEditTable;