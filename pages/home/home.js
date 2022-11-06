const baseURL = 'http://localhost:6278/'
const butsHome = () => {
    const butsLogin = document.querySelectorAll('.butLogin')
    const butsRegister = document.querySelectorAll('.butRegister')

    butsLogin.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('pages/login/index.html')
        })
    })
    butsRegister.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('pages/register/index.html')
        })
    })
}
butsHome()

async function homeCompanies (filter) {
    const cards = document.querySelector('.cards')
    cards.innerHTML = ''

    const responseJSON = await fetch (baseURL + 'companies', {
        method: 'GET'
    })
    const response = await responseJSON.json()
    //console.log(response)

    localStorage.setItem('companies', JSON.stringify(response))

    response.forEach(element => {
        if(!filter){
            cards.insertAdjacentHTML('beforeend', `
            <li class="card flex column justifyBet">
                <h2>${element.name}</h2>
                <section class="flex column gap32">
                    <span>${element.opening_hours} horas</span>
                    <p class="cardSector">${element.sectors.description}</p>
                </section>
            </li>   
            `)
        }else{
            if(element.sectors.description == filter){
                cards.insertAdjacentHTML('beforeend', `
                    <li class="card flex column justifyBet">
                        <h2>${element.name}</h2>
                        <section class="flex column gap32">
                            <span>${element.opening_hours} horas</span>
                            <p class="cardSector">${element.sectors.description}</p>
                        </section>
                    </li>   
                `)
            }
        }
    })
}
homeCompanies()


function filterHome () {
    const selectSector = document.querySelector('.selectSector')

    selectSector.addEventListener('change', () => {
        let filter = selectSector.value
        homeCompanies(filter)
    })
}
filterHome()

function butToast () {
    const butModal = document.querySelector('.butModal')
    const divHeader3 = document.querySelector('.divHeader3')
    const imgModal = document.querySelector('.imgModal')

    butModal.addEventListener('click', () => {
        if(imgModal.src === './src/imgBARRINHA.svg'){
            imgModal.src = 'src/imgCLOSE.svg'
            console.log(imgModal.src)
        }else{
            imgModal.src = 'src/imgBARRINHA.svg'
        }
    })
}
butToast()