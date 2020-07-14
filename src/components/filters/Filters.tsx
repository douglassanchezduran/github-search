import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './Filters.css';

const { Option } = Select;

interface Props {
  onSearch: (event: any) => void;
}

const Filters: React.FC<Props> = ({ onSearch }) => {
  const [term, setTerm] = useState<string>('');
  const [order, setOrder] = useState<string>('desc');
  const [stars, setStars] = useState<string>('1000');

  useEffect(() => {
    if (term !== '') {
      if (stars === '1000') {
        setStars('0..1000');
      }

      onSearch(`?q=${term}+stars:${stars}&page=1&per_page=20&order=${order}&sort=stars`);
    }
  }, [onSearch, order, stars, term]);

  function changeStars(value: string) {
    switch (value) {
      case '1000':
        setStars('0..1000');
        break;
      
      case '1001':
        setStars('1001..50000');
        break;
      
      case '50001':
        setStars('50001..100000');
        break;
      
      case '100000':
        setStars('>=100000');
        break;

      default:
        setStars('0..1000');
        break;
    }
  }

  return (
    <Form
      name="basic"
      initialValues={{ order, stars }}
    >
      <Form.Item
        label="Nombre del Repositorio"
        name="repositoryName"
        rules={[{ required: true, message: 'Ingrese el nombre del repositorio a buscar' }]}
      >
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          onChange={(event: any) => setTerm(event.target.value)} 
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12} md={24}>
          <Form.Item
            label="Ordenar"
            name="order"
          >
            <Select onChange={(value: string) => setOrder(value)}>
              <Option value="asc">Ascendente</Option>
              <Option value="desc">Descendente</Option>
            </Select>
          </Form.Item>
        </Col>
        
        <Col span={12} md={24}>
          <Form.Item
            name="stars" 
            label="Estrellas"
          >
            <Select onChange={(value: string) => changeStars(value)}>
              <Option value="1000">De 0 a 1.000</Option>
              <Option value="1001">De 1.001 a 50.000</Option>
              <Option value="50001">De 50.001 a 100.000</Option>
              <Option value="100000">Más de 100.000</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Filters;
