import React, { useEffect } from "react";
import { memo } from "react";
import { Link, Router } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import {
    faSchool,
    faCalendarDays,
    faChalkboardTeacher,
    faUser,
    faFlag,
    faClipboard,
    faComment,
    faGear,
    faDashboard
} from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import { useState } from "react";
import { Route, Redirect } from 'react-router-dom';
import ViewAllCourse from "../../pages/manager/Course/ViewAllCourse";
import ViewPostListManager from "../../pages/manager/ViewPostListManager";
import TableListClassTeacher from "../Table/TableListClassTeacher";

const SideBar = () => {
    const navigate = useNavigate();
    const [roleid, setRoleid] = useState('');
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        setRoleid(localStorage.getItem('roleid'));

    }, []);
    if(roleid == 2 || roleid == null){
        return  navigate(`/`);
    }return (
        
        <div className="items">
            <div>
                <ul>
                    {/*Admin */}
                    {roleid == '4' && <>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faDashboard} />
                            <Link className="link-a" to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                            <Link className="link-a" to="/manager/list-all-course">Manage Class</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faUser} />
                            <Link className="link-a" to="/users">User Manage</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faFlag} />
                            <Link className="link-a" to="/report">Report</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                            <Link className="link-a" to="/viewallclass">Class List</Link>
                        </li>
                    </>}

                    {/*Manage */}
                    {roleid == '3' && <>
                        {/* <li>
                    <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                    <Link className="link-a" to="/profile-teacher">Profile</Link>
                </li> */}
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                            <Link className="link-a" to="/manager/course">Manage Courses</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faClipboard} />
                            <Link className="link-a" to="/manager/viewpostlistmanager">Manage Posts</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faChalkboardTeacher} />
                            <Link className="link-a" to="#">Manage Teachers</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faUser} />
                            <Link className="link-a" to="#">Manage Learners</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faFlag} />
                            <Link className="link-a" to="#">View Reports</Link>
                        </li>
                    </>}

                    {roleid == '1' && <>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                            <Link className="link-a" to="/manager/list-all-course">Manage Class</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                            <Link className="link-a" to="#">View Schedule</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faGear} />
                            <Link className="link-a" to="#">Settings</Link>
                        </li>
                    </>}
                </ul>
            </div>

           
        </div>

    )
};

export default memo(SideBar);