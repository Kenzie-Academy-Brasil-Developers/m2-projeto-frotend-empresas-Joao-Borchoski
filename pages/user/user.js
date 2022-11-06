import { getUserToken } from "../../script/localStorage.js"

const baseURL = 'http://localhost:6278/'

async function criaCardUser () {
    const userCard = document.getElementById('userCard')
    userCard.innerHTML = ''

    try{
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getUserToken()}`
            }
        }
        
        const responseJSON = await fetch (baseURL + 'users/profile', options)
        const response = await responseJSON.json()
        //console.log(response)

        userCard.insertAdjacentHTML('beforeend', `
            <section>
            <h1>${response.username}</h1>
            </section>
            <section class="flex gap96">
                <p>Email: ${response.email}</p>
                <p>${response.professional_level}</p>
                <p id='kindOf'>${response.kind_of_work}</p>
            </section>
        `)
        if(response.kind_of_work == null){
            kindOf.innerHTML = 'Não definido'
        }
    }
    catch (err) {
        console.log(err)
    }
}
criaCardUser()

async function editUser () {
    const butEdit = document.querySelector('.butEdit')
    const modais = document.getElementById('modais')

    butEdit.addEventListener('click', async () => {
        modais.classList.toggle('hide')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let section1 = document.createElement('section')
        let h11 = document.createElement('h1')
        let button1 = document.createElement('button')
        let h12 = document.createElement('h1')
        let form = document.createElement('form')
        let input1 = document.createElement('input')
        let input2 = document.createElement('input')
        let input3 = document.createElement('input')
        let button2 = document.createElement('button')

        h11.innerText = 'Editar Perfil'
        h12.innerText = 'X'
        input1.placeholder = 'Seu nome'
        input2.placeholder = 'Seu e-mail'
        input3.placeholder = 'Sua senha'
        button2.innerText = 'Editar perfil'

        div1.classList = ('modalEx absolute')
        div2.classList = ('modalIn flex column gap32')
        section1.classList = ('flex justifyBet')
        form.classList = ('flex column gap16')

        input1.id = 'username'
        input2.id = 'email'
        input3.id = 'passwod'

        input1.type = 'text'
        input2.type = 'email'
        input3.type = 'password'

        button1.appendChild(h12)
        section1.append(h11, button1)
        form.append(input1, input2, input3, button2)
        div2.append(section1, form)
        div1.appendChild(div2)
        modais.appendChild(div1)

        button1.addEventListener('click', () => {
            modais.innerHTML = ''
            modais.classList.toggle('hide')
        })

        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const elements = [...form.elements]

            try{
                const data = {}

                elements.forEach(element => {
                    if(element.tagName == "INPUT" && element.value !== ''){
                        data[element.id] = element.value
                    }
                })
                //console.log(data)

                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getUserToken()}`
                    },
                    body: JSON.stringify(data)
                }

                const responseJSON = await fetch (baseURL + 'users', options)
                const response = await responseJSON.json()
                //console.log(response)

                if(!response.error){
                    modais.innerHTML = ''
                    modais.classList.toggle('hide')
                    window.location.reload()
                }
            }
            catch (err) {
                console.log(err)
            }
        })
    })

}
editUser()

function butLogout () {
    const butLogout = document.querySelector('.butLogout')

    butLogout.addEventListener('click', () => {
        localStorage.removeItem('userToken')
        window.location.replace('../../index.html')
    })
}
butLogout()

async function workArea () {
    const headerWord = document.querySelector('.headerWord')
    const work = document.querySelector('.work')

    try {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getUserToken()}`
            }
        }
        
        const responseJSON = await fetch (baseURL + 'users/profile', options)
        const response = await responseJSON.json()
        //console.log(response)   

        if(response.department_uuid === null) {
            work.innerHTML = ''
            work.style.height = "400px"
            work.classList = ('work flex justifyCenter align')
            work.insertAdjacentHTML('beforeend', `
                <h1>Você ainda não foi contratado</h1> 
            `)
        }else{
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getUserToken()}`
                }
            }
            
            const responseJSON = await fetch (baseURL + 'departments/coworkers', options)
            const response = await responseJSON.json()
            console.log(response)   
        }
    }
    catch (err) {
        console.log(err)
    }

}
workArea()