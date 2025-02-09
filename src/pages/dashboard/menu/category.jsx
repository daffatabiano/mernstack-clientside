import { Button, Input, Modal, Table } from 'antd';
import { useGetCategoriesQuery } from '../../../redux/reducers/api/fetchReducers';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../../../redux/reducers/api/postReducers';
import { useCategoryDeleteMutation } from '../../../redux/reducers/api/deleteReducers';

export default function Category() {
  const { data, isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: createLoad, isSuccess }] =
    useCreateCategoryMutation();
  const [deleteCategory, { isLoading: deleteLoad }] =
    useCategoryDeleteMutation();
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const [showModalDelete, setShowModalDelete] = useState({
    id: '',
    isShown: false,
  });
  const handleCreate = async () => {
    const body = { label: name, value: value, image: image };
    try {
      await createCategory(body).unwrap();
      if (!createLoad) {
        setName('');
        setValue('');
        setImage('');
        await refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      if (!deleteLoad) {
        setShowModalDelete({ id: '', isShown: false });
        await refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
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
          <Button
            type="primary"
            htmlType="button"
            onClick={() =>
              setShowModalDelete({ isShown: true, id: record._id })
            }>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={showModalDelete.isShown}
        onCancel={() => setShowModalDelete({ isShown: false })}
        footer={null}
        centered>
        <div className="flex flex-col gap-2 bg-white rounded-lg overflow-auto">
          <h1>Are you sure you want to delete this category?</h1>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              disabled={deleteLoad}
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setShowModalDelete({ isShown: false })}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={deleteLoad}
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => handleDelete(showModalDelete.id)}>
              {deleteLoad ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
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
          <Button type="primary" disabled={createLoad} onClick={handleCreate}>
            {createLoad ? 'Creating...' : 'Create'}
          </Button>
        </div>
        <div>
          <Table dataSource={data?.data} columns={columns} />
        </div>
      </div>
    </>
  );
}
