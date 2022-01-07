import { Form, Table } from "antd";
import styled, { StyledComponent } from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 30px;
width: 90%;
align-items: center;
margin: 50px auto;
`;

export const Button = styled.button`
background-color: white;
color: black;
width: 150px;
height: 40px;
border: 1px solid #000;
border-radius: 4px;
cursor: pointer;
`;

export const StyledTable = styled(Table)`
margin-top: 30px;
&.ant-table-wrapper {
  width: 100%;
}
`;

export const StyledButton:any = styled.button`
background-color: ${(props) => props.className && '#40a4ff'};
color: ${(props) => props.className && 'white'};
margin-left: 10px;
border: 1px solid #ccc;
border-radius: 4px;
cursor: pointer;
`;


export const StyledForm = styled(Form)`
  width: 50%;
  margin-top: 30px;
`;