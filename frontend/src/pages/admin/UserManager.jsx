import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import Modal from "../../components/ui/Modal";
import Table from "../../components/ui/Table";

const ROLE_COLORS = {
  super_admin: "bg-red-500/20 text-red-400",
  relief_manager: "bg-orange-500/20 text-orange-400",
  rescue_team: "bg-blue-500/20 text-blue-400",
  volunteer: "bg-green-500/20 text-green-400",
  public: "bg-white/10 text-white/60",
};

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ full_name: "", email: "", role: "public", phone: "", district: "", is_active: true });

  const fetchUsers = async () => {
    try {
      const data = await authService.getUsers();
      setUsers(data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openCreate = () => {
    setEditUser(null);
    setForm({ full_name: "", email: "", role: "public", phone: "", district: "", is_active: true });
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({ full_name: user.full_name, email: user.email, role: user.role, phone: user.phone || "", district: user.district || "", is_active: user.is_active });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await authService.updateUser(editUser.id, form);
      } else {
        await authService.register({ ...form, password: "TempPass@123" });
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const toggleActive = async (user) => {
    try {
      await authService.updateUser(user.id, { is_active: !user.is_active });
      fetchUsers();
    } catch {}
  };

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "district", label: "District" },
    { key: "is_active", label: "Status" },
  ];

  return (
    <main className="page">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          User Manager
        </h2>
        <button onClick={openCreate} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
          + Add User
        </button>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-12">Loading users...</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50 text-left">
              <tr>
                {columns.map((col) => <th key={col.key} className="px-4 py-3">{col.label}</th>)}
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{user.full_name}</td>
                  <td className="px-4 py-3 text-white/60">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[user.role] || ROLE_COLORS.public}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/60">{user.district || "—"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(user)} className={`px-2 py-1 rounded-full text-xs font-medium ${user.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {user.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(user)} className="text-blue-400 hover:text-blue-300 text-xs mr-2">Edit</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-white/30">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} title={editUser ? "Edit User" : "Add User"} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <input name="full_name" value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <input name="email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <select name="role" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
            <option value="public" className="bg-gray-900">Public</option>
            <option value="volunteer" className="bg-gray-900">Volunteer</option>
            <option value="rescue_team" className="bg-gray-900">Rescue Team</option>
            <option value="relief_manager" className="bg-gray-900">Relief Manager</option>
            <option value="super_admin" className="bg-gray-900">Super Admin</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input name="phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input name="district" value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="District" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all">
            {editUser ? "Update User" : "Create User"}
          </button>
        </form>
      </Modal>
    </main>
  );
}
