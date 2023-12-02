import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import style from './loading.module.scss'

const Loading = () => {
    return ( 
        <div className={style.loading_wrapper}>
            <Spin
            indicator={
            <LoadingOutlined
                style={{
                fontSize: 60,
                color: 'white'
                }}
                spin
            />
            }
        />
        </div>
     );
}
 
export default Loading;