import React, { useState, useEffect, useCallback } from 'react';
import {
  Col,
  Divider,
  Layout,
  List,
  Row,
  Result,
  Skeleton,
  Typography,
} from 'antd';

import './Home.css';
import { GhFilters, GhCardRepo } from '../../components';
import { RepositoryFactory } from '../../services/api/RepositoryFactory';

const { Header, Content, Footer } = Layout;
const { Link, Title } = Typography;
const date = new Date().getFullYear();

const Home: React.FC = () => {
  const [reposGithub, setReposGithub] = useState<any>([]);
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>('');

  const [query, setQuery] = useState<string>('');
  useEffect(() => {
    const getRepositoriesGithub = async () => {
      try {
        setIsLoading(true);
        const githubRepo = RepositoryFactory.get('github');
        const { data } = await githubRepo.search(query);
        setReposGithub(data.items);
      } catch (error) {
        setErrorDetails('Lo sentimos, ocurrió un error al intentar realizar la búqueda.');
      } finally {
        setIsLoading(false);
      }
    };

    let timer: NodeJS.Timeout;

    if (query !== '') {
      timer = setTimeout(() => {
        getRepositoriesGithub();
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [query]);

  const onSearchHandle = useCallback((querySearch: string) => {
    setQuery(querySearch);
  }, []);

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
              <Col xs={24} md={4} className="filters">
                <Title level={4}>Búsqueda</Title>
                <GhFilters onSearch={onSearchHandle}/>
              </Col>

              <Col xs={24} md={20} className="repositories">
                <Title level={3}>Lista de Repositorios encontrados:</Title>
                <Divider />

                {errorDetails !== '' && (
                  <Result 
                    status="500"
                    title="500"
                    subTitle={errorDetails}
                  />
                )}

                {errorDetails === '' && (
                  <List
                    grid={{ gutter: 16, column: 3, xs: 1}}
                    dataSource={reposGithub}
                    locale={{ emptyText: 'No hay repositorios para mostrar.' }}
                    renderItem={(item: any) => (
                      <List.Item key={item.id}>
                        <Skeleton loading={isLoading} active />
                        {!isLoading && <GhCardRepo {...item}/>}
                      </List.Item>
                    )}
                  />
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>
      <Footer className="footer">
        Github Search ©{date} Creado por Douglas Sánchez
      </Footer>
    </Layout>
  );
};

export default Home;
