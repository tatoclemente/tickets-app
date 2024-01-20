
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import { useHideMenu } from '../hooks/useHideMenu';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { getLast } from '../helpers/getLast';

const { Title, Text } = Typography;

// const data = [
//   {
//       ticketNo: 33,
//       escritorio: 3,
//       agente: 'Fernando Herrera'
//   },
//   {
//       ticketNo: 34,
//       escritorio: 4,
//       agente: 'Melissa Flores'
//   },
//   {
//       ticketNo: 35,
//       escritorio: 5,
//       agente: 'Carlos Castro'
//   },
//   {
//       ticketNo: 36,
//       escritorio: 3,
//       agente: 'Fernando Herrera'
//   },
//   {
//       ticketNo: 37,
//       escritorio: 3,
//       agente: 'Fernando Herrera'
//   },
//   {
//       ticketNo: 38,
//       escritorio: 2,
//       agente: 'Melissa Flores'
//   },
//   {
//       ticketNo: 39,
//       escritorio: 5,
//       agente: 'Carlos Castro'
//   },
// ];

export const Cola = () => {

  useHideMenu(true)
  const { socket } = useContext( SocketContext )
  
  const [ tickets, setTickets ] = useState([])

  useEffect(() => {
    

    getLast().then( lastTickets => setTickets( lastTickets ) )
 
    // setTickets( lastTickets )

  }, [])

  useEffect(() => {
    socket.on( 'ticket-assigned', (ticketList) => {
      // console.log(ticketList);
      setTickets( ticketList )
    })

    return () => socket.off('ticket-assigned')

  }, [socket])

  return (
    <>
    <Title level={ 1 }>Atendiendo al cliente</Title>
    <Row>
      <Col span={ 12 }>
        <List
          dataSource={ tickets.slice(0,3) }
          renderItem={ ticket => (
            <List.Item>
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <Tag color='volcano'>{ ticket.agent }</Tag>,
                  <Tag color='magenta'>Escritorio: { ticket.desk }</Tag>,
                ]}
              >
                <Title>N° { ticket.number }</Title>

              </Card>
            </List.Item>
          )}
        />
      </Col>

      <Col span={ 12 }>
        <Divider 
          style={{ fontWeight: 'bold'}}>Historial</Divider>
        <List
          dataSource={ tickets.slice(3, 13) }
          renderItem={ ticket => (
            <List.Item>
              <List.Item.Meta
                title={ `Ticket N° ${ticket.number}` }
                description={
                  <>
                    <Text type='secondary'>En el escritorio: </Text>
                    <Tag color='magenta'>{ ticket.number }</Tag>
                    <Text type='secondary'>Agente: </Text>
                    <Tag color='volcano'>{ ticket.agent }</Tag>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
    </>
  )
}
