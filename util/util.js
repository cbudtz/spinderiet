export const trimEndCharFromString = (str, character)=>{
    if (str?.charAt(str?.length-1) ===character){
        str = str?.slice(0,-1);
    }
    return str;
}