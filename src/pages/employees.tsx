/** @format */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { notification, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000';

type IState = {
  id: number;
  name: string;
  job_title: string;
  state: string;
};

const Employees = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IState[]>([]);
  const [current, setCurrent] = useState<Array<number>>([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/employees`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        notification.error(err.response.data);
      });
  }, []);

  const handleOnClick = (
    element: { id: number; type: string },
    recordId: number,
  ) => {
    setCurrent((prev: any) => {
      const found = prev.findIndex((value: number) => element.id === value);
      if (found !== -1) {
        return prev.filter((value: number) => element.id !== value);
      }
      return [element.id];
    });
    axios
      .patch(`${API_BASE_URL}/employees/${recordId}`, {
        current_state: element.type,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        notification.error(err.response.data);
      });
  };

  const columns: ColumnsType<{}> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <h2>{text}</h2>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      responsive: ['md'],
    },
    {
      title: 'Job-Title',
      dataIndex: 'job_title',
      key: 'job_title',
      responsive: ['md'],
    },
    {
      title: 'States',
      dataIndex: 'states',
      key: 'states',
      responsive: ['lg'],
      render: (state, record: any) =>
        state.map((element: { type: string; id: number }) => {
          return (
            <StyledSteps
              key={element.id}
              value={element.id}
              onClick={() => handleOnClick(element, record.id)}
              className={
                record.current_state === element.type
                  ? true
                  : current.includes(element.id)
              }>
              {element.type}
            </StyledSteps>
          );
        }),
    },
  ];

  return (
    <Container>
      <h1>Employees Listing</h1>
      <Button onClick={() => navigate('/employees/create')}>
        Create Employee
      </Button>

      <StyledTable
        rowKey='id'
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Container>
  );
};

export default Employees;

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

export const StyledSteps: any = styled.button`
  background-color: ${(props) => props.className && '#40a4ff'};
  color: ${(props) => props.className && 'white'};
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
