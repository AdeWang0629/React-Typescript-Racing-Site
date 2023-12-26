import { Spin } from 'antd';
import * as React from 'react'


const TrainingGamePage = () => {
    return (
        <div style={{height: '80vh'}}>
            <Spin tip="保守中" size="large" style={{marginTop: '40vh'}}>
                <div className="content" />
            </Spin>
        </div>
    )
}

export default TrainingGamePage;