import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
//引入antd的组件库
import { Form, Input, Button, Typography, message } from 'antd'

//引入useState勾子函数
import React, { useState } from 'react'

const { Title } = Typography
const REGISTER_GQL = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
    }
  }
`
const Register = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const history = useHistory();


  const loginBtnClick = () => {
    history.push('/login')
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [register] = useMutation(REGISTER_GQL, {
    variables: {
      username,
      password,
    },
  })
  const onFinish = () => {
    setButtonLoading(true)
    register()
      .then(() => {
        messageApi.success('注册成功')
        setTimeout(() => {
          history.push('/login')
        }, 1000);
      })
      .catch((e) => {
        if (e?.message) messageApi.error(e.message)
      })
      .finally(() => {
        setButtonLoading(false)
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
      <Form style={{ width: 300 }} autoComplete="off" onFinish={onFinish}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          注册
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
            prefix={<i className="anticon anticon-user" />}
            type="password"
            placeholder="密码"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={buttonLoading}
            block
          >
            注册
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>

        <Form.Item>
          <Button type="primary" block onClick={loginBtnClick}>
            已有账号，点击登录
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Register
