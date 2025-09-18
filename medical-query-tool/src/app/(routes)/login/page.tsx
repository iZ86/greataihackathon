"use client";

import LoginForm from "@/features/auth/guest-login/components/LoginForm";

export default function Login() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
      <div className="flex flex-col min-h-screen">
        <header className="border-b border-white/10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM13 14V17H11V14H8V12H11V9H13V12H16V14H13Z"
                  fill="currentColor"
                ></path>
              </svg>
              <h1 className="text-xl font-bold">HealthAI</h1>
            </div>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 py-12">
            <div>
              <h2 className="text-center text-3xl font-bold tracking-tight">
                Log in to your account
              </h2>
            </div>
            <LoginForm />
          </div>
        </main>
      </div>
    </div>
  );
}
