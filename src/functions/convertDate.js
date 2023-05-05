export const convertDate = (number) => {
    const mydate = new Date(number);
    return mydate.getDate()+"/"+(mydate.getMonth()+1)
   
}