import React from 'react';
import styled from "styled-components";
import {Router, useHistory} from "react-router-dom";

const NavbarContainer = styled.div`
  width: available;
  height: 60px;
  background-color: ${(props) => props.theme.black};
  display: flex;
  flex-direction: row;
  padding: 10px 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`;

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.p`
    color: whitesmoke;
    font-size: 20px;
  cursor: pointer;
  &:hover{
    font-weight: 600;
  }
`

export const Navbar = (props) => {
    const history = useHistory();
    return (
        <NavbarContainer>
            <ContainerRow>
                <Title onClick={()=> history.push('/')}>Inicio</Title>
            </ContainerRow>
            <ContainerRow>
                <Title onClick={()=> history.push('/')} style={{marginRight: "30px"}}>Project</Title>
                <Title onClick={()=> history.push('/aboutUs')}>About us</Title>
            </ContainerRow>
        </NavbarContainer>
    );
}
