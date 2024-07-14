import { useHistory } from 'react-router-dom'
//引入antd的组件库
import { Form, Input, Checkbox, Button, Typography, message } from 'antd'
import { useMutation, gql } from '@apollo/client'

//引入useState勾子函数
import React, { useEffect, useState } from 'react'

const { Title } = Typography
const LOGIN_GQL = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`
const Login = () => {
  const history = useHistory()
  const [messageApi, contextHolder] = message.useMessage()

  //定义useState的state变量
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const [login, { data }] = useMutation(LOGIN_GQL, {
    variables: {
      username,
      password,
    },
  })
  useEffect(() => {
    if (!data) return
    messageApi.success(`登录成功 token:${data.login.token}`)
  }, [data, messageApi])
  const registerBtnClick = () => {
    history.push('/register')
  }
  //定义登录函数
  const handleSubmit = () => {
    login().catch((e) => {
      if (e?.message) messageApi.error(e.message)
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      {contextHolder}
      <Form onFinish={handleSubmit} style={{ width: 300 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          登录
        </Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input
            prefix={<i className="anticon anticon-user" />}
            placeholder="用户名"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input
            prefix={<i className="anticon anticon-lock" />}
            type="password"
            placeholder="密码"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          >
            记住我
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block onClick={registerBtnClick}>
            没有账号，点击注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
