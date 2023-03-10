import PropTypes from "prop-types";
import React from 'react';

const iconColor = '#4e555b'

export const EyeIcon = () => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Eye icon</title>
        <g data-name="Layer 2">
            <g data-name="eye">
                <circle cx="12" cy="12" r="1.5"/>
                <path
                    d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 000 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 000-1zm-9.87 4a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z"/>
            </g>
        </g>
    </svg>
);

export const PersonIcon = ({size = "48", color = "#4e555b"}) => (
    <svg
        viewBox="0 0 16 16"
        height={size}
        width={size}
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="xl-icon"
        color={color}
    >
        <title>PersonFill icon</title>
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
);
PersonIcon.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.string,
}

export const CallIcon = () => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>PhoneCall icon</title>
        <g data-name="Layer 2">
            <g data-name="phone-call">
                <path d="M13 8a3 3 0 013 3 1 1 0 002 0 5 5 0 00-5-5 1 1 0 000 2z"/>
                <path
                    d="M13 4a7 7 0 017 7 1 1 0 002 0 9 9 0 00-9-9 1 1 0 000 2zM21.75 15.91a1 1 0 00-.72-.65l-6-1.37a1 1 0 00-.92.26c-.14.13-.15.14-.8 1.38a9.91 9.91 0 01-4.87-4.89C9.71 10 9.72 10 9.85 9.85a1 1 0 00.26-.92L8.74 3a1 1 0 00-.65-.72 3.79 3.79 0 00-.72-.18A3.94 3.94 0 006.6 2 4.6 4.6 0 002 6.6 15.42 15.42 0 0017.4 22a4.6 4.6 0 004.6-4.6 4.77 4.77 0 00-.06-.76 4.34 4.34 0 00-.19-.73z"/>
            </g>
        </g>
    </svg>
);

export const HomeIcon = () => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Home icon</title>
        <path
            d="M21.743 12.331l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 00-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 001 1h3a1 1 0 001-1v-4h4v4a1 1 0 001 1h3a1 1 0 001-1v-7h2a.998.998 0 00.743-1.669z"/>
    </svg>
);

export const EmailIcon = () => (
    <svg
        viewBox="0 0 20 20"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Email icon</title>
        <path
            d="M14.608 12.172c0 .84.239 1.175.864 1.175 1.393 0 2.28-1.775 2.28-4.727 0-4.512-3.288-6.672-7.393-6.672-4.223 0-8.064 2.832-8.064 8.184 0 5.112 3.36 7.896 8.52 7.896 1.752 0 2.928-.192 4.727-.792l.386 1.607c-1.776.577-3.674.744-5.137.744-6.768 0-10.393-3.72-10.393-9.456 0-5.784 4.201-9.72 9.985-9.72 6.024 0 9.215 3.6 9.215 8.016 0 3.744-1.175 6.6-4.871 6.6-1.681 0-2.784-.672-2.928-2.161-.432 1.656-1.584 2.161-3.145 2.161-2.088 0-3.84-1.609-3.84-4.848 0-3.264 1.537-5.28 4.297-5.28 1.464 0 2.376.576 2.782 1.488l.697-1.272h2.016v7.057h.002zm-2.951-3.168c0-1.319-.985-1.872-1.801-1.872-.888 0-1.871.719-1.871 2.832 0 1.68.744 2.616 1.871 2.616.792 0 1.801-.504 1.801-1.896v-1.68z"/>
    </svg>
);

export const CreditCardIcon = () => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>CreditCard icon</title>
        <path
            d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-6h16.001l.001 6H4z"/>
        <path d="M6 14h6v2H6z"/>
    </svg>
);

export const LanguageIcon = () => (
    <svg viewBox="0 0 24 24" height="48" width="48" focusable="false" role="img" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"><title>Language icon</title>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
    </svg>
);

export const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
)

export const TimeIcon = () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" height="32" width="32">
        <defs/>
        <title/>
        <g data-name="Layer 11" id="Layer_11">
            <path d="M16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,16,25Z"/>
            <polygon points="15 15 9.33 15 9.33 17 17 17 17 8.83 15 8.83 15 15"/>
        </g>
    </svg>
)

export const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z"/>
    </svg>
)

export const TimeLapse = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    </svg>
)

export const RoundIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    </svg>
)

export const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24">
        <path
            d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z">
        </path>
    </svg>
)

export const NewWindowIcon = () => (
    <svg
        viewBox="0 0 24 24"
        height="24"
        width="24">
        <path
            d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z">
        </path>
    </svg>
)


export const AddIcon = () => (
    <svg viewBox="0 0 16 16" height="24" width="24" focusable="false" role="img" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"><title>Plus icon</title>
        <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
)

export const DotsIcon = () => (
    <svg viewBox="0 0 16 16" height="48" width="48" focusable="false" role="img" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"><title>ThreeDots icon</title>
        <path
            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
    </svg>
)

export const CloseIconMinimize = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>)

export const DoneIconMinimize = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>)

export const UnAssignedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24"
        width="20px">
        <g>
            <rect fill="none" height="20" width="20"/>
            <path
                d="M17,12c-2.76,0-5,2.24-5,5s2.24,5,5,5c2.76,0,5-2.24,5-5S19.76,12,17,12z M18.65,19.35l-2.15-2.15V14h1v2.79l1.85,1.85 L18.65,19.35z M18,3h-3.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H6C4.9,3,4,3.9,4,5v15c0,1.1,0.9,2,2,2h6.11 c-0.59-0.57-1.07-1.25-1.42-2H6V5h2v3h8V5h2v5.08c0.71,0.1,1.38,0.31,2,0.6V5C20,3.9,19.1,3,18,3z M12,5c-0.55,0-1-0.45-1-1 c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1C13,4.55,12.55,5,12,5z"/>
        </g>
    </svg>)
export const PendingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24"
        width="20px">
        <g>
            <rect fill="none" height="20" width="20"/>
        </g>
        <g>
            <g>
                <path
                    d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/>
                <circle cx="7" cy="12" r="1.5"/>
                <circle cx="12" cy="12" r="1.5"/>
                <circle cx="17" cy="12" r="1.5"/>
            </g>
        </g>
    </svg>
)

export const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
)

export const DoubleArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <g>
            <g>
                <polygon points="15.5,5 11,5 16,12 11,19 15.5,19 20.5,12"/>
                <polygon points="8.5,5 4,5 9,12 4,19 8.5,19 13.5,12"/>
            </g>
        </g>
    </svg>)

export const OpenInNewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
    </svg>
)


export const TabIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"/>
    </svg>)

export const DescriptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
)

export const ContractIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    </svg>
)

export const PersonSmallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
            d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
    </svg>
)

export const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54zM11 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"/>
    </svg>
)

export const ExtensionsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill={iconColor}>
        <path
            d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path>
    </svg>
)

export const AddReminder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <rect fill="none" height="24" width="24" x="0" y="0"/>
        <g>
            <path
                d="M16,14v3H8v-7c0-2.21,1.79-4,4-4c0.85,0,1.64,0.26,2.28,0.72l1.43-1.43c-0.64-0.51-1.39-0.88-2.21-1.09V3.5 C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5v0.7C7.91,4.86,6,7.21,6,10v7H4v2h16v-2h-2v-3H16z M12,22c1.1,0,2-0.9,2-2h-4 C10,21.1,10.9,22,12,22z M24,8h-3V5h-2v3h-3v2h3v3h2v-3h3V8z"/>
        </g>
    </svg>
)

export const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
    </svg>
)

export const Done = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>

)

export const Created = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000">
        <g>
            <rect fill="none" height="24" width="24"/>
        </g>
        <g>
            <path
                d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/>
        </g>
    </svg>
)

export const Pending = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
)
export const Error = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
)

export const LoginIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill={iconColor}>
        <rect fill="none" height="24" width="24"/>
        <path
            d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/>

    </svg>
)

export const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill={iconColor}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
)

export const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill={iconColor}>
        <path
            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z">
        </path>
    </svg>
)

export const Critical = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#ff0000">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <circle cx="12" cy="19" r="2"/>
        <path d="M10 3h4v12h-4z"/>
    </svg>
)

export const ExpandMore = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
    </svg>
)

export const ExpandLess = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/>
    </svg>
)

