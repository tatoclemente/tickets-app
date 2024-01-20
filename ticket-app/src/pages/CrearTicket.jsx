import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd'
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { useContext, useState } from 'react';


const { Title, Text } = Typography;

export const CrearTicket = () => {

  useHideMenu(true)

  const { socket } = useContext(SocketContext);

  const [lastTicket, setLastTicket] = useState(null)

  const nuevoTicket = () => {

    socket.emit('select-ticket', null, (ticket) => {
      setLastTicket(ticket)
    })

  }

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>
            Presione el boton para en nuevo Ticket
          </Title>

          <Button
            type="primary"
            size="large"
            shape='round'
            icon={<DownloadOutlined />}
            onClick={nuevoTicket}
          >
            Nuevo Ticket
          </Button>

        </Col>

      </Row>

      {
        lastTicket &&
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Title level={2}>
              Su número
            </Title>


            <Text type="success" style={{ fontSize: 55 }}>
              {lastTicket.number}
            </Text>
          </Col>
        </Row>
      }
    </>
  )
}
