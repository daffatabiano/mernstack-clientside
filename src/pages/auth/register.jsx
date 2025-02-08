import { useState } from 'react';
import { styles } from '../../helper/styles';
import AuthLayout from './layout';
import { Link } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Select, Spin } from 'antd';
import { useRegisterAdminAccessMutation } from '../../redux/reducers/api/postReducers';

export default function Register() {
  const [form] = Form.useForm();
  const { Item } = Form;
  const [registerAdminAccess, { isLoading }] = useRegisterAdminAccessMutation();
  const [bornDate, setBornDate] = useState('');

  const onChangeDate = (date, dateString) => {
    setBornDate(dateString);
  };

  const [sections, setSections] = useState(1);
  const handleRegister = async () => {
    const values = form.getFieldsValue();
    const body = {
      ...values,
      born_date: bornDate,
    };
    await registerAdminAccess(body);
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-5xl flex-col  font-bold flex justify-center md:justify-start">
        Sign Up
        <span className="font-normal text-gray-400 text-sm md:text-lg mt-2">
          Create a new account for free
        </span>
      </h1>

      <Form
        style={{
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          height: sections !== 1 ? '280px' : 'auto',
        }}
        form={form}>
        <section
          className={`flex flex-col pt-4 transition-all transform duration-300 ${
            sections !== 1
              ? 'translate-x-[103%] opacity-0 w-0'
              : 'translate-x-[0%] w-full'
          }`}>
          <label htmlFor="name">Name</label>
          <Item
            name="name"
            rules={[{ required: true, message: 'Name field is required' }]}>
            <Input allowClear type="text" placeholder="John Doe" />
          </Item>
          <label htmlFor="name">Email</label>
          <Item
            name="email"
            rules={[{ required: true, message: 'Email field is required' }]}>
            <Input allowClear placeholder="8Xs8s@example.com" />
          </Item>
          <label htmlFor="name">Password</label>
          <Item
            name="password"
            rules={[{ required: true, message: 'Password field is required' }]}>
            <Input.Password placeholder="********" />
          </Item>
          <label htmlFor="name">Retype Password</label>
          <Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Confirm Password field is required' },
            ]}>
            <Input.Password placeholder="********" />
          </Item>
          <Button
            htmlType="button"
            className={styles.button}
            onClick={() => setSections(sections + 1)}>
            Next
          </Button>
        </section>
        <section
          className={`flex flex-col mt-2 h-auto gap-2 transition-all transform duration-300 ${
            sections === 1
              ? 'translate-x-[103%] opacity-0 w-0'
              : 'translate-x-[0%] w-full'
          }`}>
          <label htmlFor="NIK">NIK</label>
          <Item
            name="NIK"
            style={{ width: '100%', margin: '0' }}
            rules={[
              {
                required: true,
                message: 'NIK must be 16 characters',
                length: 16,
              },
            ]}>
            <Input allowClear type="text" placeholder="Input you NIK" />
          </Item>
          <label htmlFor="age">Born Date</label>
          <Item
            style={{ width: '100%', margin: '0' }}
            rules={[{ required: true, message: 'Age field is required' }]}>
            <DatePicker style={{ width: '100%' }} onChange={onChangeDate} />
          </Item>
          <label htmlFor="gender">Gender</label>
          <Item
            style={{ width: '100%', margin: '0' }}
            name="gender"
            rules={[{ required: true, message: 'Gender field is required' }]}>
            <Select
              name="gender"
              style={{ width: '100%' }}
              placeholder="Select Gender"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
          </Item>
          <div className="flex justify-between gap-2">
            <Button
              htmlType="button"
              className={`${styles.button} ${
                sections === 1 ? 'translate-x-[100%]' : 'translate-x-[0%] '
              }`}
              disabled={isLoading}
              onClick={() => setSections(1)}>
              Back
            </Button>
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={handleRegister}
              className={`${styles.button}  ${
                sections === 1 ? 'translate-x-[100%]' : 'translate-x-[0%]'
              }`}>
              {isLoading ? <Spin /> : 'Register'}
            </Button>
          </div>
        </section>
      </Form>
      <p className="text-sm text-gray-400 mt-4 text-center">
        Already have an account?{' '}
        {isLoading ? (
          <span className="text-slate-500 cursor-not-allowed">Sign In</span>
        ) : (
          <Link
            to="/login"
            className="text-indigo-500 hover:text-indigo-600 font-semibold">
            Sign In
          </Link>
        )}
      </p>
    </AuthLayout>
  );
}
