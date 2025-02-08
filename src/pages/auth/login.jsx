import { styles } from '../../helper/styles';
import AuthLayout from './layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Spin } from 'antd';
import { useLoginAdminAccessMutation } from '../../redux/reducers/api/postReducers';

export default function Login() {
  const navigate = useNavigate();
  const [loginAdminAccess, { isLoading }] = useLoginAdminAccessMutation();
  const { Item } = Form;
  const [form] = Form.useForm();

  const handleLogin = async () => {
    const values = form.getFieldsValue();
    await loginAdminAccess({
      ...values,
      navigate: navigate,
    });
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-5xl flex-col  font-bold flex justify-center md:justify-start">
        Sign In
        <span className="font-normal text-gray-400 text-sm md:text-lg mt-2">
          Enter your credentials, to access Admin dashboard
        </span>
      </h1>
      <Form form={form}>
        <div className="flex flex-col pt-4">
          <Item name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="example@ex.com" allowClear />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                type: 'string',
                min: 8,
              },
            ]}>
            <Input.Password placeholder="********" allowClear />
          </Item>
        </div>
        <Button
          disabled={isLoading}
          className={styles.button}
          onClick={handleLogin}>
          {isLoading ? <Spin /> : 'Login'}
        </Button>
      </Form>

      <p className="text-center text-sm mt-4 text-slate-400">
        Don&apos;t have an account?{' '}
        {isLoading ? (
          <span className="text-slate-500 cursor-not-allowed ">Register</span>
        ) : (
          <Link to="/register" className="text-indigo-500 font-semibold">
            Register
          </Link>
        )}
      </p>
    </AuthLayout>
  );
}
