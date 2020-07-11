import React from 'react';
import { Card, Tag, Divider } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const CardRepo: React.FC = () => {
  return (
    <Card 
      type="inner" 
      title="Repository Title" 
      extra={<Tag icon={<StarOutlined />} color="#55acee">168k</Tag>}
    >
      <p>
        Aliqua aute cupidatat ad in esse culpa cupidatat in veniam quis sit ipsum amet. 
        Fugiat ipsum adipisicing anim exercitation reprehenderit irure ullamco in.
      </p>

      <Divider orientation="left">Languages:</Divider>
      <Tag>Javascript</Tag>
    </Card>
  );
}

export default CardRepo;
