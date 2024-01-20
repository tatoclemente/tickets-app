
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';


import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";


import { Layout, Menu, theme } from 'antd';
import { Ingresar } from './Ingresar';
import { Cola } from './Cola';
import { CrearTicket } from './CrearTicket';
import { Escritorio } from './Escritorio';
import { useContext } from 'react';
import { UiContext } from '../context/UiConntext';


const { Sider, Content } = Layout;

export const RouterPage = () => {

  const { hideMenuState } = useContext( UiContext )

  console.log(hideMenuState);


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();




  return (
    <BrowserRouter>
      <Layout style={{ height: '100vh' }}>
        <Sider 
          collapsedWidth="0"
          breakpoint='md'
          hidden={ hideMenuState }
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="/ingresar">Ingresar</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/cola">Cola</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <Link to="/crear-ticket">Crear Ticket</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className='site-layout'>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/ingresar" element={ <Ingresar /> } />
              <Route path="/cola" element={ <Cola /> } />
              <Route path="/crear-ticket" element={ <CrearTicket /> } />
              <Route path="/escritorio" element={ <Escritorio /> } />

              <Route path="*" element={<Ingresar />} />
            </Routes>

          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
