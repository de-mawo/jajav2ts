

import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};


const SignInwithProvider = ({ providers }: Props) => {
  return (
    <div>
            {Object.values(providers!).map((provider) => (
           <div key={provider.name}>
            <button className="w-100 secondary_btn" onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
              })
            } >
              Sign in with {provider.name}
            </button>
            </div>
            ))}
             </div>
  )
}

export default SignInwithProvider