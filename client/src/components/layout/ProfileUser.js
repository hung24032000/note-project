import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CogIcon } from "../../assets/icons/cog.svg";
import { ReactComponent as Caretcon } from "../../assets/icons/caret.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
const ProfileUser = () => {
    const ProfileItem = (props) => {
        return (
            <Link to={props.link} className="profile-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </Link>
        );
    };
    const NavItem = (props) => {
        const [itemOpen, setItemOpen] = useState(false);
        const { open } = props;
        useEffect(() => setItemOpen(open), [open]);
        return (
            <li className="navbar-menu-item">
                <span
                    className="icon-button"
                    onClick={() => setOpen(!itemOpen)}
                >
                    {props.icon}
                </span>
                {itemOpen && props.children}
            </li>
        );
    };
    const NavbarMenu = (props) => {
        return <ul className="navbar-menu">{props.children}</ul>;
    };

    const [open, setOpen] = useState(false);
    const profileUserRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    setOpen(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(profileUserRef);
    return (
        <NavbarMenu>
            <NavItem icon={<Caretcon />} open={open}>
                <div className="profile-user" ref={profileUserRef}>
                    <ProfileItem link="/profile-user">
                        See Your Profile
                    </ProfileItem>

                    <ProfileItem
                        leftIcon={<CogIcon />}
                        link="/profile-user-setting"
                    >
                        Setting
                    </ProfileItem>
                </div>
            </NavItem>
        </NavbarMenu>
    );
};

export default ProfileUser;
