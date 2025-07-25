import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex items-center justify-center bg-gray-500 w-1/2 px-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image3.jpg')" }}
      >
        <div className="max-w-md space-y-6 text-center text-primary-foreground  bg-purple-300/60 p-6 rounded-xl">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Ecommerce shopping
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
