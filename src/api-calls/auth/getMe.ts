export const getMe = async (token:string)=>{
    try {
        const response = await fetch(`${process.env.BASE_URL}/me`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
}