import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <AdminSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
