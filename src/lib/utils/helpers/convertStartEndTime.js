export const convertStartEndTime = (start,end) =>{
    return `${start.slice(0, start.length - 3)} - ${end.slice(0, end.length - 3)}`

}