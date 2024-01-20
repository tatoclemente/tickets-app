import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd'
import { useHideMenu } from '../hooks/useHideMenu';


const { Title, Text } = Typography;

export const CrearTicket = () => {

  useHideMenu(true)

  const nuevoTicket = () => {
    console.log('Nuevo Ticket');
  }

  return (
    <>
      <Row>
        <Col span={ 14 } offset={ 6 } align="center">
          <Title level={ 3 }>
            Presione el boton para en nuevo Ticket
          </Title>

          <Button 
            type="primary" 
            size="large"
            shape='round'
            icon={ <DownloadOutlined /> }
            onClick={ nuevoTicket }
          >
            Nuevo Ticket
          </Button>
          
        </Col>
        
      </Row>

      <Row style={{ marginTop: 100 }}>
        <Col span={ 14 } offset={ 6 } align="center">
          <Title level={ 2 }>
            Su número
          </Title>
          {/* <br /> */}
          <Text type="success" style={{ fontSize: 55 }}>
            55
          </Text>
        </Col>
      </Row>
    </>
  )
}
