import React from 'react';
import { Table } from 'semantic-ui-react';
import { Select, Input, Button } from 'antd';

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
    console.log(rowData);
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


    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
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
                                        updatedRowData[index].horse = value;
                                        setRowData(updatedRowData);
                                        setRaceResult([no, updatedRowData]);
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
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    value={rowData[index].single}
                                    onChange={(e) => {
                                        const updatedRowData = [...rowData];
                                        updatedRowData[index].single = e.target.value;
                                        setRowData(updatedRowData);
                                        setRaceResult([no, updatedRowData]);
                                    }}
                                />
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