/** @format */

import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import '../styles/LaunchItem.css';
export default function LaunchItem(props) {
    const {
        flight_number,
        mission_name,
        launch_date_local,
        launch_success
    } = props.launch;

    return (
        <div className='container'>
            <div className='container'>
                <div className='box1'>
                    <h4>
                        Mission:{' '}
                        <span
                            className={classNames({
                                'text-success': launch_success,
                                'text-danger': !launch_success
                            })}>
                            {mission_name}
                        </span>
                    </h4>
                    <p>
                        Date:{' '}
                        <Moment format='YYYY-MM-DD HH:mm'>
                            {launch_date_local}
                        </Moment>
                    </p>
                </div>
                <div className='col-md-3'>
                    <Link
                        to={`/launch/${flight_number}`}
                        className='btn btn-secondary'>
                        Launch Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
