import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const Profile = async () => {
    const session = await  getServerSession(authOptions);
  return (
    <pre>
        {JSON.stringify(session, null ,2)}
    </pre>
  )
}

export default Profile
