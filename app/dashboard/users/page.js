"use client"

import { useEffect, useState } from "react"
import EditUserModal from "@/app/components/EditUserModal"

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  async function fetchUsers() {
    const res = await fetch("/api/users")
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Users
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <table className="w-full text-sm text-left">

          {/* HEAD */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">

                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.first_name} {user.last_name}
                </td>

                <td className="px-6 py-4 text-gray-800">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-gray-800">
                  {user.role}
                </td>

                {/* ✅ Employment Status */}
                <td className="px-6 py-4 text-gray-800">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    user.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 text-right text-gray-800">
                  <button
                    onClick={() => {
                      setSelectedUser(user)
                      setOpenModal(true)
                    }}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* MODAL */}
      <EditUserModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        user={selectedUser}
        onSuccess={fetchUsers}
      />
    </div>
  )
}