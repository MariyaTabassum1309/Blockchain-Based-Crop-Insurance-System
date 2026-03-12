export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden">

     
      

      {/* Page Content */}
      <main className="min-h-screen">{children}</main>
       
      
    </div>
  );
}