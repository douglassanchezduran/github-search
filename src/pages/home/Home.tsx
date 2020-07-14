import React, { useState, useEffect, useCallback } from 'react';
import {
  Col,
  Divider,
  Grid,
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

const { Header, Content, Footer, } = Layout;
const { useBreakpoint } = Grid;
const { Link, Title } = Typography;
const date = new Date().getFullYear();

const Home: React.FC = () => {
  const [reposGithub, setReposGithub] = useState<any>([]);
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const screens = useBreakpoint();

  useEffect(() => {
    const getRepositoriesGithub = async () => {
      try {
        setIsLoading(true);
        const githubRepo = RepositoryFactory.get('github');
        const newQuery = query.replace(/page=[0-9]*/, `page=${page}`)
        const { data } = await githubRepo.search(newQuery);

        setReposGithub(data.items);
        setTotalPages(data.total_count);
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
  }, [query, page]);

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
      
      <Content className={screens.md ? 'container' : 'container--small'}>
        <Layout className={screens.md ? 'container__bg' : 'container__bg--small'}>
          <Content>
            <Row>
              <Col 
                xs={24}
                md={4}
                className={
                  screens.md ? 'filters' : 'filters--small'
                }
              >
                <Title level={4}>Búsqueda</Title>
                <GhFilters onSearch={onSearchHandle}/>
              </Col>

              <Col 
                xs={24}
                md={20}
                className={ 
                  screens.md ? 'repositories' : 'repositories repositories--small' 
                }
              >
                <Title level={screens.md ? 3 : 4}>
                  Lista de Repositorios encontrados:
                </Title>
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
                    grid={{ gutter: 16, column: 2, xs: 1}}
                    dataSource={reposGithub}
                    locale={{ emptyText: 'No hay repositorios para mostrar.' }}
                    renderItem={(item: any) => (
                      <List.Item key={item.id}>
                        <Skeleton loading={isLoading} active />
                        {!isLoading && <GhCardRepo {...item}/>}
                      </List.Item>
                    )}
                    pagination={{
                      onChange: (numPage: number) => {
                        setPage(numPage);
                      },
                      pageSize: 20,
                      total: totalPages,
                      pageSizeOptions: [],
                      hideOnSinglePage: true,
                      size: "small",
                    }}
                  />
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>
      <Footer className={ screens.md ? 'footer' : 'footer footer--small'}>
        Github Search ©{date} Creado por Douglas Sánchez
      </Footer>
    </Layout>
  );
};

export default Home;
