import React from 'react';
import useEditUserForm from '../../components/admin/useEditUserForm';
import { useParams } from 'react-router';

const EditUser = () => {
	const {userId} = useParams()
  const { formik, loading, error, roles } = useEditUserForm(userId);

  return (
    <div className="flex flex-col">
      <div style={{ fontWeight: "400" }} className='evaFvq'>Edit User</div>
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        {error && <p>Error: {error}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 p-2 w-full border rounded"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Roles:</label>
            <div>
              {roles.map((role) => (
                <label key={role.id} className="mr-4">
                  <input
                    type="checkbox"
                    name="roleIds"
                    value={role.id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.roleIds.includes(role.id)}
                  />
                  &nbsp;{role.name}
                </label>
              ))}
            </div>
            {formik.touched.roleIds && formik.errors.roleIds && (
              <div className="text-red-500">{formik.errors.roleIds}</div>
            )}
          </div>

          <button type="submit" className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
