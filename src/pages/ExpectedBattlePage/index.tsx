import * as React from 'react'
import { Segment, Label } from 'semantic-ui-react';
import ExpandableTable from './ExpandableTable';

const ExpectedBattlePage = () => {
    return (
        <Segment raised style={{backgroundColor: "#f5deb3"}}>

            <div className='pb-3'>
                <Label as='a' color='orange' ribbon>
                    予 想 バ ト ル 
                </Label>
            </div>

            <ExpandableTable />

        </Segment>
    )
}

export default ExpectedBattlePage;