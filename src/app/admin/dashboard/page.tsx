import React from "react";
import { PackageSearch, Users, TrendingUp, ShoppingBag, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="font-[family-name:var(--font-heading)] text-xl tracking-wide">
            Giftyy<span className="text-blue-400">Admin</span>
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/20 text-blue-400 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">Orders</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
            <PackageSearch className="w-5 h-5" />
            <span className="font-medium">Products</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Customers</span>
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between">
          <h1 className="text-xl font-semibold">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Orders</p>
                <p className="text-2xl font-bold">142</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Revenue</p>
                <p className="text-2xl font-bold">₹ 84,500</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Active Customers</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">#ORD-092</td>
                    <td className="px-6 py-4">Rajat Sharma</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Completed</span>
                    </td>
                    <td className="px-6 py-4 font-medium">₹ 3,499</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">#ORD-091</td>
                    <td className="px-6 py-4">Priya Patel</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Processing</span>
                    </td>
                    <td className="px-6 py-4 font-medium">₹ 1,299</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">#ORD-090</td>
                    <td className="px-6 py-4">Amit Kumar</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">Pending</span>
                    </td>
                    <td className="px-6 py-4 font-medium">₹ 5,999</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
