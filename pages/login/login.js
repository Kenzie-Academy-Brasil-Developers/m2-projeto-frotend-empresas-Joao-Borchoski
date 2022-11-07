const baseURL = 'http://localhost:6278/'

const butsLogin = () => {
    const butsLogin = document.querySelectorAll('.butLogin')
    const butsRegister = document.querySelectorAll('.butRegister')
    const butFormCad = document.querySelector('.butFormCad')

    butsLogin.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('../register/index.html')
        })
    })
    butsRegister.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('../../index.html')
        })
    })
    butFormCad.addEventListener('click', () => {
        window.location.replace('../register/index.html')
    })
}
butsLogin()

function login () {
    const form = document.getElementById("form")
    const elements = [...form.elements]
    //console.log(elements)

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        try{

            const data = {}
            let email = ''

            elements.forEach(element => {
                if(element.tagName == "INPUT" && element.value !== ''){
                    if(element.id == 'email'){
                        email = element.value
                    }
                    data[element.id] = element.value
                }
            })
            //console.log(data)

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }

            const responseJSON = await fetch (baseURL + 'auth/login', options)
            const response = await responseJSON.json()
            console.log(response)

            if(!response.error){
                localStorage.setItem('userToken', JSON.stringify(response.token))
                if(email !== 'admin@mail.com'){
                    setTimeout(()=>{window.location.replace('../user/index.html')})
                }else{
                    window.location.replace('../user/admin.html')
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    })
}
login()

function butToast () {
    const butModal = document.querySelector('.butModal')
    const divHeader3 = document.querySelector('.divHeader3')
    let img = document.querySelector('.imgModal')

    butModal.addEventListener('click', () => {
        divHeader3.classList.toggle('hide')
    })
}
butToast()