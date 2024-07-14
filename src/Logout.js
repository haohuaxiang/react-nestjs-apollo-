//引入antd的组件库
import { Form, Input, Checkbox, Button, Typography } from 'antd'

//引入useState勾子函数
import React, { useState } from 'react'

const { Title } = Typography

const Logout = () => {
  //定义useState的state变量
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [email, setEmail] = useState(false)

  const handleSubmit = (values) => {
    values.preventDefault()
    console.log('Username:', username, 'Password:', password, 'Email:', email)
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
      <Form onSubmit={handleSubmit} style={{ width: 300 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          注册
        </Title>
        <Form.Item>
          <Input
            prefix={<i className="anticon anticon-user" />}
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<i className="anticon anticon-lock" />}
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            prefix={<i className="anticon anticon-lock" />}
            type="email"
            placeholder="邮箱"
            value={password}
            onChange={(e) => setEmail(e.target.value)}
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
            注册
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            已有账号，点击登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Logout
