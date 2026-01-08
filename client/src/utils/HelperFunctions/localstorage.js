export const setlocalstorage = (key,value)=>{
    if(key && value){
        localStorage.setItem(key,JSON.stringify(value));
    }
}

export const getlocalstorage =(key)=>{
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export const removelocalstorage = (key)=>{
    if(key){
        localStorage.removeItem(key);
    }
}