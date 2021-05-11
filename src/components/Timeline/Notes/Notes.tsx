import "./Notes.scss";

import React, { useContext, useEffect, useState } from "react";

import { ApplicationContext } from "context/applicationContext";
import { DxcBox } from "@dxc-technology/halstack-react";
import { StyledButton } from "styles/global-style";
import TitleBig from "components/Titles/TitleBig/TitleBig";
import axios from "axios";
import styled from "styled-components";

const Notes = ( ) => {
    const url = 'http://20.33.40.147:13111/csc/insurance/references_wm/notes?note_creation_date_min=2020-12-01';
    
    const applicationContext = useContext(ApplicationContext);
    const [notesItem, setNotesItem] = useState<undefined | any>();
    const [notesCount, setNotesCount] = useState(0);


    useEffect(() => {
        getData();
    }, []);

    const getData = () => {        
        axios.get(url, { headers: applicationContext.headers }).then((response:any) => {
            setNotesItem(response.data._links.item);
            const count = response && response.data && response.data._count;
            setNotesCount(count === '500+' ? 500 : count);
        })
    };


    const StyledMainDivider = styled.div`
  flex: 1 1 auto;
  margin-block: 2px;
`;    

    return (
        <>
            <div>
                <TitleBig title={"Notes "} count={notesCount}/>
                <StyledButton className="buttonBorder border float">
                  +Add Note
                </StyledButton>
            </div>

            <div className = "notesContent">
                {notesItem && notesItem.map((note: any, i: number) => (
                    <div key={i}>
                        {note && note.summary && ( 
                            <div className= "notesBoxDisplay">  
                                <DxcBox margin="medium" padding="xxsmall" > 
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={"black"}>
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path
                                            d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
                                    </svg>                                        
                                    <TitleBig title={note.summary['note:author']} />
                                    <div className = "notesDate px-1">
                                        {note.summary['note:creation_date']} {" "}
                                        {"at"} {" "}
                                        {note.summary['note:creation_time']}</div>
                                    <StyledMainDivider />
                                    {note.summary['note:title']}
                                </DxcBox>
                            </div>
                        )
                        }
                    </div>                
                )
                )}
            </div>
            
        </>
    );
};

export default Notes;

