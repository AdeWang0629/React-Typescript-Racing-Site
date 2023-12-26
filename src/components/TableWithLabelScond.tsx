
import { FC } from 'react';
import { Label, Table } from 'semantic-ui-react'

interface ITableWithLabel {
    content: String;
}

const TableWithLabel : FC<ITableWithLabel> = ({content}) => {
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
                            <Table.HeaderCell>的中率</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>１位</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row error>
                            <Table.Cell>２位</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>３位</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

        </div>

    )
}

export default TableWithLabel;