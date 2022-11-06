const baseURL = 'http://localhost:6278/'


async function getCompanies () {
    const responseJSON = await fetch (baseURL + 'companies', {
        method: 'GET'
    })
    const response = await responseJSON.json()
    console.log(response)

    //return response
}



// export { 
//     getCompanies,
// }