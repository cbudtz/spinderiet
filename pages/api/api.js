// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL:"http://localhost:1337/"

export function getStrapiMedia(media) {
    const imageUrl = media?.url.startsWith("/")
        ? BASE_URL + media.url.slice(1)
        : media?.url;
    return imageUrl;
}

export async function apiGet(url) {
    const res = await fetch(BASE_URL + url);
    return await res.json();
  }




export async function apiGetStaticProps(url){
    let json = await apiGet(url);
    return {
        props:{
            ...json
        },
        revalidate:1
    }
}