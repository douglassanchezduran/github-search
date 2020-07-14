import React from 'react';
import { Avatar, Button, Card, Tag, Divider, Typography } from 'antd';
import { StarOutlined, LinkOutlined } from '@ant-design/icons';

import './CardRepo.css';

interface Owner {
  login: string,
  avatar_url: string,
}

interface Repo {
  name: string,
  description: string,
  language: string,
  stargazers_count: string,
  owner: Owner,
  html_url: string,
}

const { Paragraph } = Typography;
const { Meta } = Card;

const CardRepo: React.FC<Repo> = ({ 
  name, 
  description,
  language,
  stargazers_count,
  owner,
  html_url
}) => {
  return (
    <Card 
      type="inner" 
      title={name}
      extra={<Tag icon={<StarOutlined />} color="#55acee">{stargazers_count}</Tag>}
    >
      <Meta
        avatar={<Avatar src={owner.avatar_url} />}
        title={owner.login}
        description="Propietario"
      />

      <Paragraph 
        ellipsis={{ rows: 1, expandable: true, symbol: 'Ver Más' }}
        className="description"
      >
        {description}
      </Paragraph>

      
      <div className="lang">
        <span className="lang__title">Lenguaje de programación:</span>
        <Tag>{language}</Tag>
      </div>

      <Divider className="divider" />

      <div className="action">
        <Button 
          type="link"
          shape="round"
          icon={<LinkOutlined />}
          size="middle"
          href={html_url}
          target="_blank"
        >
          Ver Detalles
        </Button>
      </div>
    </Card>
  );
}

export default CardRepo;
