//DENIED, ACCEPTED, PROGRESS, READY

export function deniedFilter(order){
    return(order.status==="DENIED")
}

export function pendingFilter(order){
    return(order.status==="PENDING")
}

export function inProgressFilter(order){
    return(order.status==="PROGRESS")
}

export function readyFilter(order){
    return(order.status==="READY")
}