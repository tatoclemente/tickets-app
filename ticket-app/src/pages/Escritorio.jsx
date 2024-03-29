import { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'

import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuariosStorage } from '../helpers/getUsuarios';
import { SocketContext } from '../context/SocketContext'

const { Title, Text } = Typography;

export const Escritorio = () => {

  useHideMenu(false)

  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()
  const [user] = useState(getUsuariosStorage())
  const [ticket, setTicket] = useState(null)

  const salir = () => {
    localStorage.removeItem('agente')
    localStorage.removeItem('escritorio')

    navigate('/ingresar')
  }

  const siguienteTicket = () => {
    socket.emit('next-ticket', user, (ticket) => {
      setTicket(ticket);
    })
  }

  if (!user.agente && !user.escritorio) {
    return <Navigate to="/ingresar" replace={true} />
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text
            type='success'
            style={{ fontSize: 20, fontWeight: 'bold' }}
          >{user.escritorio}</Text>
        </Col>
        <Col span={4} align='right'>
          <Button
            shape='round'
            type='primary'
            danger
            onClick={salir}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>

      <Divider />

      {
        ticket && (
          <Row>
            <Col>
              <Text>Está atendiendo el ticket numero: </Text>
              <Text
                style={{ fontSize: 30, fontWeight: 'bold' }}
                type='danger'>
                {ticket.number}
              </Text>
            </Col>
          </Row>
        )
      }
      <Row>
        <Col offset={ 18 } span={6} align='right'>
          <Button
            onClick={siguienteTicket}
            shape='round'
            type='primary'
          >
            Siguiente
            <ArrowRightOutlined />
          </Button>
        </Col>
      </Row>


    </>
  )
}
