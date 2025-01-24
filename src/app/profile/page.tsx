import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route';

const Profile = async () => {
    const session = await  getServerSession(authOptions);
    // console.log('\n profile page ================= session', session)
  return (
    <pre>
        {JSON.stringify(session, null ,2)}
    </pre>
  )
}

export default Profile
