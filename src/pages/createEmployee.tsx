/** @format */

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Select, Button, notification, InputNumber } from 'antd';
import { API_BASE_URL } from '../api/config';
import { Container, StyledForm } from '../style';

const selectInputValues = [
  { label: 'ADDED', value: 'ADDED' },
  { label: 'APPROVED', value: 'APPROVED' },
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'INACTIVE', value: 'INACTIVE' },
  { label: 'IN_CHECK', value: 'IN_CHECK' },
];

const fixedtSates = [
  {
    id: Math.floor(Math.random() * 100),
    type: 'ACTIVE',
  },
  {
    id: Math.floor(Math.random() * 100),
    type: 'INACTIVE',
  },
  {
    id: Math.floor(Math.random() * 100),
    type: 'APPROVED',
  },
  {
    id: Math.floor(Math.random() * 100),
    type: 'IN_CHECK',
  },
  {
    id: Math.floor(Math.random() * 100),
    type: 'ADDED',
  },
];

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const data = {
      name: values.name,
      age: values.age,
      job_title: values.job_title,
      current_state: values.current_state,
      states: fixedtSates,
    };
    axios
      .post(`${API_BASE_URL}/employees`, data)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        notification.error(err.response.data);
      });
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Container>
      <h1>Add New Employee</h1>
      <StyledForm
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Age'
          name='age'
          rules={[{ required: true, message: 'Please input your age!' }]}>
          <InputNumber min='15' max='99' />
        </Form.Item>

        <Form.Item
          label='JobTitle'
          name='job_title'
          rules={[{ required: true, message: 'Please input your JobTitle!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='current_state'
          label='State'
          rules={[{ required: true, message: 'Missing state' }]}>
          <Select options={selectInputValues} onChange={handleChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>{' '}
          <Button htmlType='button' onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </StyledForm>
    </Container>
  );
};

export default CreateEmployee;
