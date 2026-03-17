"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const customers = [
  { name: "John Doe", email: "john@example.com", amount: "$1,200", status: "Completed", date: "Feb 12, 2024", handle: "@johnd" },
  { name: "Sarah Smith", email: "sarah@example.com", amount: "$850", status: "Pending", date: "Feb 14, 2024", handle: "@sarahs" },
  { name: "Mike Johnson", email: "mike@example.com", amount: "$2,100", status: "Completed", date: "Feb 15, 2024", handle: "@mikej" },
  { name: "Emily Brown", email: "emily@example.com", amount: "$620", status: "Processing", date: "Feb 16, 2024", handle: "@emilyb" },
]

export function CustomerListTable() {
  return (
    <Card className="glass-card border-white/5 bg-[#111111] overflow-hidden">
      <CardHeader className="border-b border-white/5 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-black text-white uppercase tracking-wider">Top Customers</CardTitle>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight mt-1">High value active users</p>
          </div>
          <span className="text-[10px] font-black text-[#B3FF00] px-4 py-2 bg-[#B3FF00]/10 rounded-full border border-[#B3FF00]/20 cursor-pointer hover:bg-[#B3FF00]/20 transition-all uppercase tracking-widest">Generate Report</span>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-[10px] font-black text-zinc-500 uppercase px-8 py-4">Customer</th>
              <th className="text-[10px] font-black text-zinc-500 uppercase py-4">Amount</th>
              <th className="text-[10px] font-black text-zinc-500 uppercase py-4">Status</th>
              <th className="text-[10px] font-black text-zinc-500 uppercase px-8 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((customer) => (
              <tr key={customer.email} className="group border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                       {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-white tracking-tight">{customer.name}</p>
                      <p className="text-[10px] text-zinc-500 font-bold">{customer.handle}</p>
                    </div>
                  </div>
                </td>
                <td className="text-xs font-black text-white">
                  {customer.amount}
                </td>
                <td>
                   <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-white/10 ${
                      customer.status === "Completed" ? "text-primary/70" : "text-zinc-500"
                   }`}>
                      {customer.status}
                   </span>
                </td>
                <td className="text-[10px] font-bold text-zinc-500 px-8">
                  {customer.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
