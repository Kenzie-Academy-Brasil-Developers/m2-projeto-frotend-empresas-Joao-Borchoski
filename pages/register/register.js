const baseURL = 'http://localhost:6278/'

const butsRegister = () => {
    const butsLogin = document.querySelectorAll('.butLogin')
    const butsRegister = document.querySelectorAll('.butRegister')

    butsLogin.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('../login/index.html')
        })
    })
    butsRegister.forEach(element => {
        element.addEventListener('click', () => {
            window.location.replace('../../index.html')
        })
    })
}
butsRegister()

function register () {
    const form = document.getElementById('form')
    const elements = [...form.elements]
    //console.log(elements) 

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        try{
            const data = {}

            elements.forEach(element => {
                if(element.tagName == "INPUT" && element.value !== ''){
                    data[element.id] = element.value
                }
                else if(element.tagName == "SELECT" && element.value !== 'Nível profissional'){
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

            const responseJSON = await fetch (baseURL + 'auth/register', options)
            const response = await responseJSON.json()
            //console.log(response)

            if(!response.error){
                window.location.replace('../login/index.html')
            }else{
                console.log('erro')
            }
        }
        catch (err) {
            console.log(err)
        }
    })

}
register()

function butToast () {
    const butModal = document.querySelector('.butModal')
    const divHeader3 = document.querySelector('.divHeader3')

    butModal.addEventListener('click', () => {
        divHeader3.classList.toggle('hide')
    })
}
butToast()