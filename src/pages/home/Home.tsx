import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';

import './Home.css';
import { GhFilters } from '../../components';

const { Header, Content, Footer } = Layout;
const { Link } = Typography;

const Home: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Link href="/">
          <span className="link">Inicio</span>
        </Link>
      </Header>
      
      <Content className="container">
        <Layout className="container__bg">
          <Content>
            <Row>
              <Col xs={24} md={8} className="filters">
                <GhFilters />
              </Col>

              <Col xs={24} md={16} className="repositories">
                <div>Lista de Repositorios encontrados:</div>
              </Col>
            </Row>
          </Content>
      </Layout>
    </Content>

      <Footer className="footer">Github Prueba ©2020 Creado por Douglas Sánchez</Footer>
    </Layout>
  );
};

export default Home;
