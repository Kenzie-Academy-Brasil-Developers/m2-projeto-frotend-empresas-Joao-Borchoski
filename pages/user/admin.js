import { getUserToken, getCompanies } from "../../script/localStorage.js"

const baseURL = 'http://localhost:6278/'

function butLogout () {
    const butLogout = document.querySelector('.butLogout')

    butLogout.addEventListener('click', () => {
        localStorage.removeItem('userToken')
        window.location.replace('../../index.html')
    })
}
butLogout()

async function selectCompanies () {
    const selectWork = document.querySelector('.selectWork')
    //console.log(selectWork)

    const responseJSON = await fetch (baseURL + 'companies', {
        method: 'GET'
    })
    const response = await responseJSON.json()
    //console.log(response)

    response.forEach(element => {
        selectWork.insertAdjacentHTML('beforeend', `
            <option id=${element.uuid} value='${element.name}'>${element.name}</option>
        `)
    });

}
selectCompanies()

async function usersRender () {
    const userCard = document.getElementById('userCard')

    try {
        const options = {
            headers: {
                method: 'GET',
                'Authorization': `Bearer ${getUserToken()}`
            }
        }
        const responseJSON = await fetch (baseURL + 'users', options)
        const response = await responseJSON.json()
        //console.log(response)

        response.forEach((element) => {
            if(element.username !== 'ADMIN'){
                let li = document.createElement('li')
                let section1 = document.createElement('section')
                let h3 = document.createElement('h3')
                let span = document.createElement('span')
                let p = document.createElement('p')
                let section2 = document.createElement('section')
                let button1 = document.createElement('button')
                let img1 = document.createElement('img')
                let button2 = document.createElement('button')
                let img2 = document.createElement('img')
    
                h3.innerText = element.username
                span.innerText = element.professional_level
                p.innerText = 'Departament name'
                img1.src = '../../src/img4.svg'
                img2.src = '../../src/img8.svg'

                li.id = element.uuid
    
                li.classList = ('cardUsers flex column gap24')
                section1.classList = ('flex column gap12')
                section2.classList = ('flex align justifyCenter gap24')

                modalEditUserAdmin(button1, li.id)
                modalDeleteUser(button2, element.username, li.id)
    
                section1.append(h3, span, p)
                button1.appendChild(img1)
                button2.appendChild(img2)
                section2.append(button1, button2)
                li.append(section1, section2)
                userCard.appendChild(li)
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}
usersRender()

function modalEditUserAdmin (but, id) {
    const modais = document.getElementById('modais')
    //modais.innerHTML = ''
    
    but.addEventListener('click', () => {
        modais.classList.toggle('hide')

        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let section1 = document.createElement('section')
        let h11 = document.createElement('h1')
        let h12 = document.createElement('h1')
        let form = document.createElement('form')
        let select1 = document.createElement('select')
        let option1 = document.createElement('option')
        let option2 = document.createElement('option')
        let option3 = document.createElement('option')
        let option4 = document.createElement('option')
        let select2 = document.createElement('select')
        let option5 = document.createElement('option')
        let option6 = document.createElement('option')
        let option7 = document.createElement('option')
        let option8 = document.createElement('option')
        let option9 = document.createElement('option')
        let button = document.createElement('button')

        h11.innerText = 'Editar Usuário'
        h12.innerText = 'X'
        option1.innerText = 'Selecionar modalidade de trabalho'
        option2.innerText = 'presencial'
        option3.innerText = 'hibrido'
        option4.innerText = 'home office'
        option5.innerText = 'Nível profissional'
        option6.innerText = 'estágio'
        option7.innerText = 'júnior'
        option8.innerText = 'pleno'
        option9.innerText = 'sênior'
        button.innerText = 'Editar'

        div1.classList = ('modalEx absolute')
        div2.classList = ('modalIn flex column gap32')
        section1.classList = ('flex align justifyBet')
        form.classList = ('flex column gap32')

        form.id = 'formEdit'
        select1.id = 'kind_of_work'
        select1.name = 'kind_of_work'
        select2.id = 'professional_level'
        select2.name = 'professional_level'

        option1.value = 'none'
        option2.value = 'presencial'
        option3.value = 'hibrido'
        option4.value = 'home office'
        option5.value = 'none'
        option6.value = 'estágio'
        option7.value = 'júnior'
        option8.value = 'pleno'
        option9.value = 'sênior'

        h12.addEventListener('click', () => {
            modais.innerHTML = ''
            modais.classList.toggle('hide')
        })

        
        select1.append(option1, option2, option3, option4)
        select2.append(option5, option6, option7, option8, option9)
        section1.append(h11, h12)
        form.append(select1, select2, button)
        div2.append(section1, form)
        div1.appendChild(div2)
        modais.appendChild(div1)

        function updateUser () {
            const elements = [...form.elements]
            //console.log(elements)
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                try {
                    const data = {}

                    elements.forEach(element => {
                        if(element.tagName == "SELECT" && element.value !== ''){
                            if(element.value !== 'Selecionar modalidade de trabalho' && 'Nível profissional'){
                                data[element.id] = element.value
                            }
                        }
                        //console.log(data)
                    })

                    const options = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getUserToken()}` 
                        },
                        body: JSON.stringify(data)
                    }

                    const responseJSON = await fetch (baseURL + 'admin/update_user/' + id, options)
                    const response = await responseJSON.json()
                    console.log(response)
                    
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
        }
        updateUser()
    })

}

function modalDeleteUser (but, username, id) {
    const modais = document.getElementById('modais')
    //modais.innerHTML = ''

    but.addEventListener('click', () => {
        modais.classList.toggle('hide')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let h1 = document.createElement('h1')
        let button = document.createElement('button')
        let button2 = document.createElement('button')

        h1.innerText = `Realmente deseja remover o usuário ${username}?`
        button.innerText = 'Remover'
        button2.innerText = 'Cancelar'

        div1.classList = ('modalRemove1 absolute')
        div2.classList = ('modalRemove2 flex column gap32')
        button.classList = ('butRemove')
        button2.classList = ('cancelRemove')

        div2.append(h1, button, button2)
        div1.appendChild(div2)
        modais.appendChild(div1)

        button2.addEventListener('click', () => {
            modais.innerHTML = ''
            modais.classList.toggle('hide')
        })

        function deleteUser () {
             button.addEventListener('click', async () => {
                try {
                    const option = {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${getUserToken()}` 
                        }
                    }
                    
                    const responseJSON = await fetch (baseURL + 'admin/delete_user/' + id, option)
                    const response = await responseJSON.json()
                    console.log(response)    // ta dando um erro aqui e eu n sei oq pq pois o usuario é deletado so tem que clicar no deletar duas vez

                    if(!response.err){
                        modais.innerHTML = ''
                        modais.classList.toggle('hide')
                        window.location.reload()
                    }
                }
                catch (err) {
                    console.log(err)
                }
             })
        }
        deleteUser()
    })
}

async function renderDepartaments () {
    const ulcardDepartaments = document.getElementById('ulcardDepartaments')
    ulcardDepartaments.innerHTML = ''
    const modais = document.getElementById('modais')

    try{
        const options = {
            headers: {
                method: 'GET',
                'Authorization': `Bearer ${getUserToken()}`
            }
        }
        const responseJSON = await fetch (baseURL + 'departments', options)
        const response = await responseJSON.json()
        //console.log(response)

        response.forEach(element => {
            let li = document.createElement('li')
            let section1 = document.createElement('section')
            let h3 = document.createElement('h3')
            let span = document.createElement('span')
            let p = document.createElement('p')
            let section2 = document.createElement('section')
            let button1 = document.createElement('button')
            let img1 = document.createElement('img')
            let button2 = document.createElement('button')
            let img2 = document.createElement('img')
            let button3 = document.createElement('button')
            let img3 = document.createElement('img')

            h3.innerText = element.name
            span.innerText = element.description
            p.innerText = element.companies.name

            img1.scr = '../../src/img6.svg'
            img2.src = '../../src/img7.svg'
            img3.src = '../../src/img8.svg'

            li.id = element.uuid
            const liID = li.id

            li.classList = ('cardDepartaments flex column gap24')
            section1.classList = ('flex column gap12')
            section2.classList = ('flex align justifyCenter gap24')

            section1.append(h3, span, p)
            button1.appendChild(img1)
            button2.appendChild(img2)
            button3.appendChild(img3)
            section2.append(button1, button2, button3)
            li.append(section1, section2)
            ulcardDepartaments.appendChild(li)

            button2.addEventListener('click', () => {
                modais.classList.toggle('hide')
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                let section = document.createElement('section')
                let h11 = document.createElement('h1')
                let h12 = document.createElement('h1')
                let form = document.createElement('form')
                let textarea = document.createElement('textarea')
                let button = document.createElement('button')

                h11.innerText = 'Editar Departamento'
                h12.innerText = 'X'
                textarea.innerText = element.description
                button.innerText = 'Editar o departamento'

                div1.classList = ('modalEx absolute')
                div2.classList = ('modalIn flex column gap32')
                section.classList = ('flex align justifyBet')
                form.classList = ('flex column gap24')

                section.append(h11, h12)
                form.append(textarea, button)
                div2.append(section, form)
                div1.append(div2)
                modais.append(div1)

                h12.addEventListener('click', () => {
                    modais.innerHTML = ''
                    modais.classList.toggle('hide')
                })

                function editDepartament () {
                    button.addEventListener('click', async (e) => {
                        e.preventDefault()
                        
                        try {
                            const data = {
                                "description": textarea.value
                            }

                            const options = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${getUserToken()}` 
                                },
                                body: JSON.stringify(data)
                            }
    
                            const responseJSON = await fetch (baseURL + 'departments/' + liID, options)
                            const response = await responseJSON.json()
                            console.log(response)


                            if(!response.error) {
                                modais.innerHTML = ''
                                modais.classList.toggle('hide')
                                window.location.reload()
                            }
                        }
                        catch (err) {
                            console.log(err)
                        }

                        
                    })
                }
                editDepartament()

            })
            button3.addEventListener('click', () => {
                modais.classList.toggle('hide')
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                let section = document.createElement('section')
                let h12 = document.createElement('h1')
                let h11 = document.createElement('h1')
                let button = document.createElement('button')

                h11.innerText = `Realmente deseja deletar o Departamento ${element.name} e demitir seus funcionários?`
                h12.innerText = 'X'
                button.innerText = 'Confirmar'

                div1.classList = ('modalEx absolute')
                div2.classList = ('modalIn flex column gap16')
                section.classList = ('flex flexEnd')
                button.classList = ('butRemoveDepartament')

                section.append(h12)
                div2.append(section, h11, button)
                div1.append(div2)
                modais.append(div1)

                h12.addEventListener('click', () => {
                    modais.innerHTML = ''
                    modais.classList.toggle('hide')
                })

                function deleteDepartament () {
                    button.addEventListener('click', async () => {

                        try {
        
                            const responseJSON = await fetch (baseURL + 'departments/' + liID, {
                                method: 'DELETE', 
                                headers: {Authorization: `Bearer ${getUserToken()}` }
                            })
                            const response = await responseJSON.json()

                            console.log(response)

                            modais.innerHTML = ''
                            modais.classList.toggle('hide')
                            window.location.reload()
                            
                        }
                        catch (err) {
                            console.log(err)
                            modais.innerHTML = ''
                            modais.classList.toggle('hide')
                            window.location.reload()
                        }
                    })
                }
                deleteDepartament()
            })
        })

    }
    catch (err) {
        console.log(err)
    }
}
renderDepartaments()

async function renderDepartamentsFiltered () {
    const ulcardDepartaments = document.getElementById('ulcardDepartaments')
    const modais = document.getElementById('modais')
    const select = document.getElementById('empresas')

    try{
        let uuidCompanie = ''
        select.addEventListener('change', async () => {
            getCompanies().forEach(companie => {
                if(companie.name === select.value){
                    uuidCompanie = companie.uuid
                }
            })
            //console.log(uuidCompanie)

            const options = {
                mothod: 'GET',
                headers: {
                    'Authorization': `Bearer ${getUserToken()}` 
                }
            }
            
            const responseJSON = await fetch(baseURL + 'departments/' + uuidCompanie, options)
            const response = await responseJSON.json()
            //console.log(response)

            if(response.length == 0 || select.value == 'Selecionar Empresa'){
                ulcardDepartaments.innerHTML = ''
                ulcardDepartaments.insertAdjacentHTML('beforeend', `
                <div class="flex align justifyCenter widthFull">
                    <h1>Nenhum departamento encontrado.</h1>
                </div>
                `)
            }else{
                ulcardDepartaments.innerHTML = ''

                response.forEach(element => {
                    let li = document.createElement('li')
                    let section1 = document.createElement('section')
                    let h3 = document.createElement('h3')
                    let span = document.createElement('span')
                    let p = document.createElement('p')
                    let section2 = document.createElement('section')
                    let button1 = document.createElement('button')
                    let img1 = document.createElement('img')
                    let button2 = document.createElement('button')
                    let img2 = document.createElement('img')
                    let button3 = document.createElement('button')
                    let img3 = document.createElement('img')
        
                    h3.innerText = element.name
                    span.innerText = element.description
                    p.innerText = element.companies.name
        
                    img1.src = '../../src/img6.svg'
                    img2.src = '../../src/img7.svg'
                    img3.src = '../../src/img8.svg'

                    li.id = element.uuid
                    const liID = li.id
        
                    li.classList = ('cardDepartaments flex column gap24')
                    section1.classList = ('flex column gap12')
                    section2.classList = ('flex align justifyCenter gap24')
        
                    section1.append(h3, span, p)
                    button1.appendChild(img1)
                    button2.appendChild(img2)
                    button3.appendChild(img3)
                    section2.append(button1, button2, button3)
                    li.append(section1, section2)
                    ulcardDepartaments.appendChild(li)

                    button2.addEventListener('click', () => {
                        modais.classList.toggle('hide')
                        let div1 = document.createElement('div')
                        let div2 = document.createElement('div')
                        let section = document.createElement('section')
                        let h11 = document.createElement('h1')
                        let h12 = document.createElement('h1')
                        let form = document.createElement('form')
                        let textarea = document.createElement('textarea')
                        let button = document.createElement('button')
        
                        h11.innerText = 'Editar Departamento'
                        h12.innerText = 'X'
                        textarea.innerText = element.description
                        button.innerText = 'Editar o departamento'
        
                        div1.classList = ('modalEx absolute')
                        div2.classList = ('modalIn flex column gap32')
                        section.classList = ('flex align justifyBet')
                        form.classList = ('flex column gap24')
        
                        section.append(h11, h12)
                        form.append(textarea, button)
                        div2.append(section, form)
                        div1.append(div2)
                        modais.append(div1)
        
                        h12.addEventListener('click', () => {
                            modais.innerHTML = ''
                            modais.classList.toggle('hide')
                        })
                        
                        function editDepartament () {
                            button.addEventListener('click', async (e) => {
                                e.preventDefault()
                                
                                try {
                                    const data = {
                                        "description": textarea.value
                                    }
        
                                    const options = {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${getUserToken()}` 
                                        },
                                        body: JSON.stringify(data)
                                    }
            
                                    const responseJSON = await fetch (baseURL + 'departments/' + liID, options)
                                    const response = await responseJSON.json()
                                    console.log(response)
        
        
                                    if(!response.error) {
                                        modais.innerHTML = ''
                                        modais.classList.toggle('hide')
                                        window.location.reload()
                                    }
                                }
                                catch (err) {
                                    console.log(err)
                                }
        
                                
                            })
                        }
                        editDepartament()
                    })
                    button3.addEventListener('click', () => {
                        modais.classList.toggle('hide')
                        let div1 = document.createElement('div')
                        let div2 = document.createElement('div')
                        let section = document.createElement('section')
                        let h12 = document.createElement('h1')
                        let h11 = document.createElement('h1')
                        let button = document.createElement('button')
        
                        h11.innerText = `Realmente deseja deletar o Departamento ${element.name} e demitir seus funcionários?`
                        h12.innerText = 'X'
                        button.innerText = 'Confirmar'
        
                        div1.classList = ('modalEx absolute')
                        div2.classList = ('modalIn flex column gap16')
                        section.classList = ('flex flexEnd')
                        button.classList = ('butRemoveDepartament')
        
                        section.append(h12)
                        div2.append(section, h11, button)
                        div1.append(div2)
                        modais.append(div1)
        
                        h12.addEventListener('click', () => {
                            modais.innerHTML = ''
                            modais.classList.toggle('hide')
                        })
        
                        function deleteDepartament () {
                            button.addEventListener('click', async () => {
        
                                try {
                
                                    const responseJSON = await fetch (baseURL + 'departments/' + liID, {
                                        method: 'DELETE', 
                                        headers: {Authorization: `Bearer ${getUserToken()}` }
                                    })
                                    const response = await responseJSON.json()
        
                                    console.log(response)
        
                                    modais.innerHTML = ''
                                    modais.classList.toggle('hide')
                                    window.location.reload()
                                    
                                }
                                catch (err) {
                                    console.log(err)
                                    modais.innerHTML = ''
                                    modais.classList.toggle('hide')
                                    window.location.reload()
                                }
                            })
                        }
                        deleteDepartament()
                    })
                })
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}
renderDepartamentsFiltered()

function criaDepartament () {
    const modais = document.getElementById('modais')
    modais.innerHTML = ''
    const butCriaWork = document.querySelector('.butCriaWork')

    //console.log(getCompanies())

    butCriaWork.addEventListener('click', () => {
        modais.classList.toggle('hide')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let section1 = document.createElement('section')
        let h11 = document.createElement('h1')
        let h12 = document.createElement('h1')
        let form = document.createElement('form')
        let input1 = document.createElement('input')
        let input2 = document.createElement('input')
        let select = document.createElement('select')
        let option = document.createElement('option')
        let button = document.createElement('button')

        h11.innerText = 'Criar Departamento'
        h12.innerText = 'X'
        input1.placeholder = 'Nome do departamento'
        input2.placeholder = 'Descrição'
        option.innerText = 'Selecionar empresa'
        button.innerText = 'Criar o departamento'

        div1.classList = ('modalEx absolute')
        div2.classList = ('modalIn flex column gap24')
        section1.classList = ('flex align justifyBet')
        form.classList = ('flex column gap16')

        input1.id = 'name'
        input2.id = 'description'

        select.name = 'selecionarEmpresa'
        select.id = 'selecionarEmpresa'
        option.value = 'none'

        section1.append(h11, h12)
        select.append(option)
        form.append(input1, input2, select, button)
        div2.append(section1, form)
        div1.append(div2)
        modais.append(div1)

        h12.addEventListener('click', () => {
            modais.innerHTML = ''
            modais.classList.toggle('hide')
        })

        async function companiesSelect () {
            const responseJSON = await fetch (baseURL + 'companies', {
                method: 'GET'
            })
            const response = await responseJSON.json()

            response.forEach(element => {
                select.insertAdjacentHTML('beforeend', `
                    <option id=${element.uuid} value='${element.name}'>${element.name}</option>
                `)
            })
        }
        companiesSelect()
        
        

        function criaDepart () {
            const elements = [...form.elements]
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                try{
                    const data = {}
                    
                    elements.forEach(element => {
                        if(element.tagName == "INPUT" && element.value !== ''){
                            data[element.id] = element.value
                        }
                        else if(element.tagName == "SELECT" && element.value !== 'Nível profissional'){
                            getCompanies().forEach(companie => {
                                if(companie.name === element.value){
                                    data['company_uuid'] = companie.uuid

                                }
                            })
                            
                        }
                    })
                    //console.log(data)

                    
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getUserToken()}` 
                        },
                        body: JSON.stringify(data)
                    }
                    
                    const responseJSON = await fetch (baseURL + 'departments', options)
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
        }
        criaDepart()
        
    })

}
criaDepartament()

