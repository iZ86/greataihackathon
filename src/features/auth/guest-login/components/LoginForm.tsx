import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

export default function LoginForm() {

  return (
    <div>
      <Authenticator>
      </Authenticator>
    </div>

  );
}



// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [invalidCredentials, setInvalidCredentials] = useState(false);

//   async function login(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     if (!isInputValid()) {
//       return;
//     }
//   }

//   function isInputValid(): boolean {
//     let inputValid = true;

//     if (!username.trim().toLowerCase()) {
//       inputValid = false;
//     }

//     if (!password.trim()) {
//       inputValid = false;
//     }

//     if (inputValid === false) {
//       setInvalidCredentials(true);
//     }

//     return inputValid;
//   }

//   function LoginButton() {
//     return (
//       <div>
//         <button
//           className="mt-8 flex w-full justify-center rounded-lg bg-blue-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 active:bg-blue-700"
//           type="submit"
//         >
//           Log in
//         </button>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={login}>
//       <div>
//         <label
//           className="block text-sm font-medium text-gray-500 dark:text-gray-400"
//           htmlFor="username"
//         >
//           Username
//         </label>
//         <div className="mt-1">
//           <input
//             autoComplete="username"
//             className="block w-full appearance-none rounded-lg border-white/10 bg-white/5 dark:bg-white/5 px-3 py-2 text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
//             id="username"
//             name="username"
//             type="text"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="mt-8">
//         <label
//           className="block text-sm font-medium text-gray-500 dark:text-gray-400"
//           htmlFor="password"
//         >
//           Password
//         </label>
//         <div className="mt-1">
//           <input
//             autoComplete="current-password"
//             className="block w-full appearance-none rounded-lg border-white/10 bg-white/5 dark:bg-white/5 px-3 py-2 text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
//             id="password"
//             name="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//       </div>
//       {invalidCredentials && (
//         <p className="font-medium text-red-500 mt-4 text-sm">
//           Invalid Credentials
//         </p>
//       )}
//       <LoginButton />
//     </form>
//   );
// }
