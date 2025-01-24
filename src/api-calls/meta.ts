'use cache';
export const getMeta = async ()=>{
    return fetch(`${process.env.BASE_URL}/meta`).then(res => res.json()).then(data => {
        return data;
    }).catch(error => {
        return null;
    })
}