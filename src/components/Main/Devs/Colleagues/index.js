import React from 'react'
import { useSelector } from 'react-redux';
import Colleague from './Colleague';

const Colleagues = () => {


    const colleagues = useSelector(state => state.dev.colleagues)

    
    return (
        <div>
            {colleagues.map(colleague => {
                return (
                    <Colleague key={colleague._id} colleague={colleague} />
                )
            })}
        </div>
    )
}

export default Colleagues