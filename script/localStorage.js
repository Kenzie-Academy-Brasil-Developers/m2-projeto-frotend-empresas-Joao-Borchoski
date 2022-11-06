function getUserToken () {
    const user = JSON.parse(localStorage.getItem("userToken")) || ""

    return user
}

function getCompanies () {
    const companies = JSON.parse(localStorage.getItem("companies")) || ""

    return companies
}



export {
    getUserToken,
    getCompanies, 
    
}