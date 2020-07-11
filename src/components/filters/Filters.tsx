import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';

import './Filters.css';

const { Option } = Select;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const Filters: React.FC = () => {
  return (
    <Form
      name="basic"
      initialValues={{ orderType: 'desc', order: '999' }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Nombre del Repositorio"
        name="repositoryName"
        rules={[{ required: true, message: 'Ingrese el nombre del repositorio a buscar' }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Ordenar"
            name="orderType"
          >
            <Select>
              <Option value="asc">Ascendente</Option>
              <Option value="desc">Descendente</Option>
            </Select>
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item 
            name="order" 
            label="Estrellas"
          >
            <Select>
              <Option value="999">Menores a 1.000</Option>
              <Option value="1000">Mayores a 1.000</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" shape="round" block>
          Realizar Búsqueda
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Filters;
