import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="h-screen w-screen flex justify-center items-center relative">
      <div className="bg-blue-2 absolute  z-10 w-full h-full top-0 left-0"></div>
      <div className="relative z-20">
        <SignUp />
      </div>
    </div>
}