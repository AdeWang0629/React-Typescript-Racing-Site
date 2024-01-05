
import { FC } from 'react';
import { Label, Table } from 'semantic-ui-react'

interface ITableWithLabel {
    content: String;
    data: any;
}

const TableWithLabel : FC<ITableWithLabel> = ({content, data}) => {
    return (

        <div>

            <Label basic color='red' pointing='below'>
                {content}
            </Label>

            <div className='pb-3'>

                <Table celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>順位</Table.HeaderCell>
                            <Table.HeaderCell>名前</Table.HeaderCell>
                            <Table.HeaderCell>参加数</Table.HeaderCell>
                            <Table.HeaderCell>回収率</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>１位</Table.Cell>
                            <Table.Cell>{data[0] && data[0]['name']}</Table.Cell>
                            <Table.Cell>{data[0] && data[0]['number_times']}</Table.Cell>
                            <Table.Cell>{data[0] && data[0]['single']}</Table.Cell>
                        </Table.Row>
                        <Table.Row error>
                            <Table.Cell>{data[1] ? (data[1]['single'] == data[0]['single'] ? '１位' : '２位') : '２位'}</Table.Cell>
                            <Table.Cell>{data[1] && data[1]['name']}</Table.Cell>
                            <Table.Cell>{data[1] && data[1]['number_times']}</Table.Cell>
                            <Table.Cell>{data[1] && data[1]['single']}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>{data[2] ? (data[2]['single'] == data[0]['single'] ? '１位' : (data[2]['single'] == data[1]['single'] ? '２位' : '３位')) : '３位'}</Table.Cell>
                            <Table.Cell>{data[2] && data[2]['name']}</Table.Cell>
                            <Table.Cell>{data[2] && data[2]['number_times']}</Table.Cell>
                            <Table.Cell>{data[2] && data[2]['single']}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

        </div>

    )
}

export default TableWithLabel;