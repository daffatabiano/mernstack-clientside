import { Button, Input, Table } from 'antd';
import { useGetCategoriesQuery } from '../../../redux/reducers/api/fetchReducers';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../../../redux/reducers/api/postReducers';

export default function Category() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="flex gap-2 items-center">
          <Button
            type="primary"
            onClick={() => {
              setName(record.name);
              setValue(record.value);
              setImage(record?.image || '');
            }}>
            Edit
          </Button>
          <Button type="primary">Delete</Button>
        </div>
      ),
    },
  ];
  const { data, isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: createLoad, isSuccess }] =
    useCreateCategoryMutation();
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const handleCreate = async () => {
    const body = { name, value, image };
    await createCategory(body).unwrap();
    if (isSuccess) {
      setName('');
      setValue('');
      setImage('');
      await refetch();
    }
  };

  return (
    <div className="w-full h-full pe-4">
      <div className="p-4 flex gap-4 text-nowrap mx-auto my-8 rounded-lg items-center bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
        <label htmlFor="name">Name :</label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          className="w-64 rounded focus:outline-none border-0 bg-slate-200/50"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="value">Value :</label>
        <Input
          type="text"
          name="value"
          id="value"
          className="w-64 rounded focus:outline-none border-0 bg-slate-200/50"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <label htmlFor="image">Image :</label>
        <Input
          type="file"
          name="image"
          id="image"
          className="w-64 rounded focus:outline-none border-0 bg-slate-200/50"
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="primary" onClick={handleCreate}>
          Submit
        </Button>
      </div>
      <div>
        <Table dataSource={data?.data} columns={columns} />
      </div>
    </div>
  );
}
