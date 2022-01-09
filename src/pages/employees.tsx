/** @format */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Button, notification } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { StyledButton, StyledTable, Container } from '../style';

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
  }, [current]);

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
      .then((res) => {
        setData([...data, res.data]);
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
            <StyledButton
              key={element.id}
              value={element.id}
              onClick={() => handleOnClick(element, record.id)}
              className={
                record.current_state === element.type
                  ? true
                  : current.includes(element.id)
              }>
              {element.type}
            </StyledButton>
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
